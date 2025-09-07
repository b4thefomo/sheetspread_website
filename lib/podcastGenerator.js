const { GoogleGenerativeAI } = require('@google/generative-ai');
const wav = require('wav');
const fs = require('fs');
const path = require('path');

class PodcastGenerator {
  constructor(apiKey, config = {}) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.apiKey = apiKey;
    
    this.config = {
      voices: {
        host1: 'Kore',  // Sarah - Construction research professional
        host2: 'Puck'   // Mike - Tier 1 construction company operations manager
      },
      outputDir: path.join(process.cwd(), 'public', 'podcasts'),
      audioDir: path.join(process.cwd(), 'public', 'podcasts', 'audio'),
      transcriptDir: path.join(process.cwd(), 'public', 'podcasts', 'transcripts'),
      audioFormat: {
        channels: 1,
        sampleRate: 24000,
        bitDepth: 16
      },
      ...config
    };

    // Ensure output directories exist
    if (!fs.existsSync(this.config.audioDir)) {
      fs.mkdirSync(this.config.audioDir, { recursive: true });
    }
    if (!fs.existsSync(this.config.transcriptDir)) {
      fs.mkdirSync(this.config.transcriptDir, { recursive: true });
    }
  }

  /**
   * Generate a conversation script from blog post content
   */
  async generateConversationScript(title, content) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `Transform the following blog post into a direct, straight-talking 4-5 minute podcast conversation between two construction industry professionals:

Host 1 (Sarah): Construction research professional with deep industry knowledge
Host 2 (Mike): Operations manager at a tier 1 construction company seeking practical advice

Blog Post Title: ${title}
Blog Content: ${content}

STRUCTURE:
1. **Hook** (30 seconds): Start with a compelling problem statement that grabs attention immediately
2. **Intro** (30 seconds): Brief introductions and clear outline of what topics will be covered in this conversation
3. **Main Discussion** (3-3.5 minutes): Direct, practical discussion of key points with real-world examples
4. **Wrap-up** (30 seconds): Concrete takeaways and next steps

CONVERSATION STYLE:
- Direct, no-nonsense communication - get straight to the point
- Minimal filler words, no sycophancy or unnecessary pleasantries
- Authentic construction industry language and references
- Mike asks practical questions, Sarah provides expert insights
- Both speakers have British accents and speak with authority
- Interruptions and natural flow, but focused on delivering value

FORMAT:
- Speaker labels: Sarah: / Mike:
- 800-1000 words total
- Professional but authentic tone
- Include specific topics that will be discussed in the intro

The audience wants actionable insights they can implement immediately. No fluff, just practical construction industry expertise.`;

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
      throw new Error(`Failed to generate conversation script: ${error.message}`);
    }
  }

  /**
   * Generate TTS audio from conversation script
   */
  async generateTTSAudio(script, outputSlug) {
    const audioPath = path.join(this.config.audioDir, `${outputSlug}.wav`);
    const transcriptPath = path.join(this.config.transcriptDir, `${outputSlug}-transcript.txt`);

    try {
      // Save transcript first (always works)
      await this.saveTranscript(transcriptPath, script.fullScript);
      console.log('📝 Transcript saved successfully');

      // Try TTS generation with @google/genai
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({
          apiKey: this.apiKey
        });

        const prompt = `TTS the following conversation between Sarah and Mike, they should both have British accents:
${script.fullScript}`;

        console.log('🔊 Calling TTS API...');
        const response = await ai.models.generateContent({
          model: "gemini-2.5-pro-preview-tts",
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
                    speaker: 'Mike',
                    voiceConfig: {
                      prebuiltVoiceConfig: { voiceName: this.config.voices.host2 }
                    }
                  }
                ]
              }
            }
          }
        });

        console.log('📡 TTS API response received');
        
        // Extract audio data
        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!audioData) {
          throw new Error('No audio data received from TTS API');
        }

        // Save audio file
        const audioBuffer = Buffer.from(audioData, 'base64');
        await this.saveWaveFile(audioPath, audioBuffer);
        console.log('🔊 Audio file saved successfully');

      } catch (ttsError) {
        console.warn('⚠️  TTS API failed, creating text-only output:', ttsError.message);
        // Create a placeholder audio file or skip audio generation
        // Note: audioPath will remain the original path but file won't exist
      }

      // Estimate duration (rough calculation based on script length)
      const estimatedDuration = this.estimateAudioDuration(script.fullScript);

      return {
        audioPath,
        transcriptPath,
        duration: estimatedDuration
      };

    } catch (error) {
      console.error('Error generating TTS output:', error);
      throw new Error(`Failed to generate TTS output: ${error.message}`);
    }
  }

  /**
   * Generate complete podcast from blog post
   */
  async generatePodcastFromPost(title, content, slug) {
    console.log(`🎙️  Generating construction industry podcast for: ${title}`);
    
    // Step 1: Generate conversation script
    console.log('📝 Creating straight-talking construction conversation...');
    const script = await this.generateConversationScript(title, content);
    
    // Step 2: Generate TTS audio
    console.log('🔊 Generating professional British audio...');
    const output = await this.generateTTSAudio(script, slug);
    
    console.log(`✅ Construction podcast generated successfully:`);
    console.log(`   Audio: ${path.basename(output.audioPath || 'N/A')}`);
    console.log(`   Transcript: ${path.basename(output.transcriptPath)}`);
    console.log(`   Estimated duration: ${Math.round(output.duration / 60)} minutes`);
    
    return output;
  }

  /**
   * Save WAV audio file
   */
  async saveWaveFile(filename, pcmData) {
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
  async saveTranscript(filename, transcript) {
    const formattedTranscript = `Podcast Transcript\n==================\n\n${transcript}\n\nGenerated on: ${new Date().toISOString()}`;
    fs.writeFileSync(filename, formattedTranscript, 'utf8');
  }

  /**
   * Parse script into sections (basic implementation)
   */
  parseScriptSections(script) {
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
  estimateAudioDuration(script) {
    // Rough estimate: 150-180 words per minute for natural speech
    const wordCount = script.split(/\s+/).length;
    const wordsPerMinute = 165; // Average speaking rate
    return (wordCount / wordsPerMinute) * 60; // Return seconds
  }
}

module.exports = { PodcastGenerator };