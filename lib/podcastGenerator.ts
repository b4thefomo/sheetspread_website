import { GoogleGenerativeAI } from '@google/generative-ai';
import wav from 'wav';
import fs from 'fs';
import path from 'path';

interface PodcastConfig {
  voices: {
    host1: string;
    host2: string;
  };
  outputDir: string;
  audioFormat: {
    channels: number;
    sampleRate: number;
    bitDepth: number;
  };
}

interface ConversationScript {
  intro: string;
  mainDiscussion: string;
  practicalTips: string;
  wrapUp: string;
  fullScript: string;
}

interface PodcastOutput {
  audioPath: string;
  transcriptPath: string;
  duration: number;
}

export class PodcastGenerator {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;
  private config: PodcastConfig;

  constructor(apiKey: string, config?: Partial<PodcastConfig>) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.apiKey = apiKey;
    
    this.config = {
      voices: {
        host1: 'Kore',  // Sarah - Tech-savvy PM voice
        host2: 'Puck'   // Alex - Business analyst voice
      },
      outputDir: path.join(process.cwd(), 'public', 'podcasts'),
      audioFormat: {
        channels: 1,
        sampleRate: 24000,
        bitDepth: 16
      },
      ...config
    };

    // Ensure output directory exists
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }
  }

  /**
   * Generate a conversation script from blog post content
   */
  async generateConversationScript(title: string, content: string): Promise<ConversationScript> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Transform the following blog post into an engaging 4-5 minute podcast conversation between two hosts:

Host 1 (Sarah): Tech-savvy project manager with practical experience
Host 2 (Alex): Business analyst who focuses on strategic insights

Blog Post Title: ${title}
Blog Content: ${content}

Create a natural, conversational dialogue that:
1. Opens with a brief, engaging introduction to the topic
2. Discusses the main points in an accessible, conversational way
3. Includes practical tips and real-world examples
4. Ends with a summary and actionable takeaway

Format as a script with:
- Speaker labels (Sarah: / Alex:)
- Natural conversation flow with interruptions and agreements
- Professional but conversational tone
- 4-5 minute target length (approximately 800-1000 words)

Make it sound like two experts having a genuine discussion about the topic, not reading from a script.`;

    try {
      const result = await model.generateContent(prompt);
      const fullScript = result.response.text();

      // Extract sections for structured output
      const sections = this.parseScriptSections(fullScript);
      
      return {
        ...sections,
        fullScript
      };
    } catch (error) {
      console.error('Error generating conversation script:', error);
      throw new Error(`Failed to generate conversation script: ${error}`);
    }
  }

  /**
   * Generate TTS audio from conversation script
   */
  async generateTTSAudio(script: ConversationScript, outputSlug: string): Promise<PodcastOutput> {
    const audioPath = path.join(this.config.outputDir, `${outputSlug}.wav`);
    const transcriptPath = path.join(this.config.outputDir, `${outputSlug}-transcript.txt`);

    try {
      // Use the @google/genai library for TTS (following the tts-generation-doc.md pattern)
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: this.apiKey
      });

      const prompt = `TTS the following conversation between Sarah and Alex, they should both have British accents:
${script.fullScript}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: [
                {
                  speaker: 'Sarah',
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: this.config.voices.host1 }
                  }
                },
                {
                  speaker: 'Alex',
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: this.config.voices.host2 }
                  }
                }
              ]
            }
          }
        }
      });

      // Extract audio data
      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!audioData) {
        throw new Error('No audio data received from TTS API');
      }

      // Save audio file
      const audioBuffer = Buffer.from(audioData, 'base64');
      await this.saveWaveFile(audioPath, audioBuffer);

      // Save transcript
      await this.saveTranscript(transcriptPath, script.fullScript);

      // Estimate duration (rough calculation based on script length)
      const estimatedDuration = this.estimateAudioDuration(script.fullScript);

      return {
        audioPath,
        transcriptPath,
        duration: estimatedDuration
      };

    } catch (error) {
      console.error('Error generating TTS audio:', error);
      throw new Error(`Failed to generate TTS audio: ${error}`);
    }
  }

  /**
   * Generate complete podcast from blog post
   */
  async generatePodcastFromPost(title: string, content: string, slug: string): Promise<PodcastOutput> {
    console.log(`🎙️  Generating podcast for: ${title}`);
    
    // Step 1: Generate conversation script
    console.log('📝 Creating conversation script...');
    const script = await this.generateConversationScript(title, content);
    
    // Step 2: Generate TTS audio
    console.log('🔊 Generating TTS audio...');
    const output = await this.generateTTSAudio(script, slug);
    
    console.log(`✅ Podcast generated successfully:`);
    console.log(`   Audio: ${path.basename(output.audioPath)}`);
    console.log(`   Transcript: ${path.basename(output.transcriptPath)}`);
    console.log(`   Estimated duration: ${Math.round(output.duration / 60)} minutes`);
    
    return output;
  }

  /**
   * Save WAV audio file
   */
  private async saveWaveFile(filename: string, pcmData: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const writer = new wav.FileWriter(filename, {
          channels: this.config.audioFormat.channels,
          sampleRate: this.config.audioFormat.sampleRate,
          bitDepth: this.config.audioFormat.bitDepth,
        });

        writer.on('finish', resolve);
        writer.on('error', reject);

        writer.write(pcmData);
        writer.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Save transcript file
   */
  private async saveTranscript(filename: string, transcript: string): Promise<void> {
    const formattedTranscript = `Podcast Transcript\n==================\n\n${transcript}\n\nGenerated on: ${new Date().toISOString()}`;
    fs.writeFileSync(filename, formattedTranscript, 'utf8');
  }

  /**
   * Parse script into sections (basic implementation)
   */
  private parseScriptSections(script: string): Omit<ConversationScript, 'fullScript'> {
    // Basic parsing - could be enhanced with more sophisticated logic
    const lines = script.split('\n');
    const totalLines = lines.length;
    
    return {
      intro: lines.slice(0, Math.floor(totalLines * 0.15)).join('\n'),
      mainDiscussion: lines.slice(Math.floor(totalLines * 0.15), Math.floor(totalLines * 0.75)).join('\n'),
      practicalTips: lines.slice(Math.floor(totalLines * 0.75), Math.floor(totalLines * 0.9)).join('\n'),
      wrapUp: lines.slice(Math.floor(totalLines * 0.9)).join('\n')
    };
  }

  /**
   * Estimate audio duration based on script length
   */
  private estimateAudioDuration(script: string): number {
    // Rough estimate: 150-180 words per minute for natural speech
    const wordCount = script.split(/\s+/).length;
    const wordsPerMinute = 165; // Average speaking rate
    return (wordCount / wordsPerMinute) * 60; // Return seconds
  }
}

export default PodcastGenerator;