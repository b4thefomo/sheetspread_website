# AI-Powered Image Library System Guide

**📋 Implementation Tasks**: See detailed task breakdown in [IMAGE_LIBRARY_TASKS.md](./IMAGE_LIBRARY_TASKS.md)

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagrams](#architecture-diagrams)
3. [File Structure](#file-structure)
4. [Data Schema](#data-schema)
5. [Implementation Phases](#implementation-phases)
6. [Code Templates](#code-templates)
7. [Gemini Prompts](#gemini-prompts)
8. [Usage Workflow](#usage-workflow)
9. [npm Commands](#npm-commands)
10. [Benefits](#benefits)

---

## System Overview

This system creates a reusable image library where AI generates rich metadata for each image, then intelligently selects the most relevant images during article generation.

```
┌─────────────────────────────────────────────────────────────────┐
│                    IMAGE LIBRARY SYSTEM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Upload     │ →  │   Metadata   │ →  │   Article    │      │
│  │   Images     │    │  Generation  │    │  Generation  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                   │
│  One-time setup      Auto-generated       Uses library          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Key Concept**: Upload images once → AI analyzes them → Reuse across many articles with smart matching

---

## Architecture Diagrams

### Flow 1: Image Upload & Metadata Generation

```
┌─────────────────────────────────────────────────────────────────┐
│                     UPLOAD & METADATA FLOW                       │
└─────────────────────────────────────────────────────────────────┘

    User uploads images
    to folder
        │
        ▼
┌──────────────────────┐
│  /public/images/     │
│  library/            │
│  ├─ chart1.png       │
│  ├─ team.jpg         │
│  └─ dashboard.png    │
└──────────┬───────────┘
           │
           │ Run: npm run generate-image-metadata
           ▼
┌────────────────────────────────────────┐
│  scripts/generateImageMetadata.js      │
│                                        │
│  1. Scan library folder                │
│  2. Find images without metadata       │
│  3. For each new image:                │
│     • Read image file                  │
│     • Send to Gemini Vision API        │
│     • Parse AI response                │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  Gemini Vision API                     │
│                                        │
│  Analyzes each image and returns:      │
│  • Detailed description                │
│  • Searchable keywords (5-10)          │
│  • Use cases (when to use)             │
│  • Themes (topics it represents)       │
│  • Style (photo/illustration/etc)      │
│  • Dominant colors                     │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  /data/image-metadata.json             │
│                                        │
│  {                                     │
│    "chart1.png": {                     │
│      "description": "Analytics...",    │
│      "keywords": ["data", "chart"],    │
│      "useCases": ["data posts"],       │
│      "themes": ["analytics"],          │
│      "style": "illustration"           │
│    },                                  │
│    "team.jpg": { ... },                │
│    "dashboard.png": { ... }            │
│  }                                     │
└────────────┬───────────────────────────┘
             │
             ▼
    ✅ Image library ready
    with searchable metadata
```

### Flow 2: Smart Image Selection During Article Generation

```
┌─────────────────────────────────────────────────────────────────┐
│              ARTICLE GENERATION WITH IMAGE SELECTION             │
└─────────────────────────────────────────────────────────────────┘

    User triggers post creation
        │
        │ Run: npm run create-post
        ▼
┌──────────────────────────────────┐
│  scripts/createNextPost.js       │
│                                  │
│  1. Get next topic from          │
│     content-calendar.json        │
│  2. Load image-metadata.json     │
│  3. Prepare prompts              │
└──────────┬───────────────────────┘
           │
           │ PHASE 1: Generate Article
           ▼
┌──────────────────────────────────────────┐
│  Gemini API - Content Generation         │
│                                           │
│  Prompt: "Write article about [topic]"   │
│                                           │
│  Returns: Full article HTML              │
└──────────┬───────────────────────────────┘
           │
           │ PHASE 2: Select Images
           ▼
┌────────────────────────────────────────────────────────┐
│  Gemini API - Image Selection                          │
│                                                         │
│  Prompt: "Based on this article content:               │
│           [article HTML]                               │
│                                                         │
│           And these available images:                  │
│           [full image-metadata.json]                   │
│                                                         │
│           Select 1-2 most relevant images."            │
│                                                         │
│  Returns: {                                            │
│    "selectedImages": [                                 │
│      {                                                 │
│        "filename": "chart1.png",                       │
│        "placement": "mid-article",                     │
│        "reasoning": "fits data analysis theme"         │
│      }                                                 │
│    ]                                                   │
│  }                                                     │
└────────────┬───────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Script embeds selected images       │
│                                      │
│  • Inserts <img> tags at placement   │
│  • Uses metadata description as alt  │
│  • Adds responsive styling           │
│  • Links to /images/library/[file]   │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Save to content/post-X.md           │
│                                      │
│  Article now includes:               │
│  • Original content                  │
│  • Perfectly matched images          │
│  • SEO-friendly alt text             │
└──────────────────────────────────────┘
           │
           ▼
    ✅ Article with relevant
       images published
```

### System Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA FLOW                                │
└─────────────────────────────────────────────────────────────────┘

┌───────────────────┐
│  Image Files      │
│  (PNG, JPG, etc)  │
└────────┬──────────┘
         │
         │ Gemini Vision API
         ▼
┌───────────────────┐      ┌──────────────────┐
│  Image Metadata   │  →   │  Article Topic   │
│  (JSON)           │      │  from Calendar   │
└────────┬──────────┘      └────────┬─────────┘
         │                          │
         └──────────┬───────────────┘
                    │
                    │ Gemini combines both
                    ▼
         ┌──────────────────┐
         │  Smart Matching   │
         │  Algorithm        │
         └──────────┬─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  Selected Images  │
         │  + Article        │
         └──────────────────┘
```

---

## File Structure

```
sailsmaps_application/
│
├── public/
│   └── images/
│       └── library/                    # 📁 USER UPLOADS HERE
│           ├── chart-analytics.png
│           ├── team-collaboration.jpg
│           ├── salesforce-dashboard.png
│           ├── automation-workflow.png
│           ├── data-visualization.jpg
│           └── ...
│
├── data/
│   └── image-metadata.json            # 📄 AI-GENERATED METADATA
│
├── scripts/
│   ├── generateImageMetadata.js       # 🆕 NEW: Metadata generation
│   ├── createNextPost.js              # ✏️ UPDATED: Image integration
│   └── uploadImages.js                # 🆕 NEW: Optional bulk upload helper
│
├── content/
│   └── post-X.md                      # Generated articles with images
│
└── IMAGE_LIBRARY_GUIDE.md             # This guide
```

### Directory Setup Commands

```bash
# Create the image library folder
mkdir -p public/images/library

# Create data directory if it doesn't exist
mkdir -p data

# Create empty metadata file
echo '{}' > data/image-metadata.json
```

---

## Data Schema

### image-metadata.json Structure

```json
{
  "filename.extension": {
    "filename": "string",
    "path": "string",
    "description": "string (2-3 sentences)",
    "keywords": ["array", "of", "strings"],
    "useCases": ["array", "of", "use", "cases"],
    "themes": ["array", "of", "themes"],
    "style": "string (photo|illustration|diagram|screenshot)",
    "colors": ["array", "of", "colors"],
    "dimensions": {
      "width": number,
      "height": number
    },
    "fileSize": "string",
    "generatedAt": "ISO date string",
    "lastUpdated": "ISO date string"
  }
}
```

### Complete Example

```json
{
  "chart-analytics-dashboard.png": {
    "filename": "chart-analytics-dashboard.png",
    "path": "/images/library/chart-analytics-dashboard.png",
    "description": "A modern analytics dashboard showing colorful data visualizations including bar charts, line graphs, and pie charts. The interface displays business metrics, KPIs, and performance indicators in a clean, professional layout with blue and orange color scheme.",
    "keywords": [
      "analytics",
      "dashboard",
      "data visualization",
      "charts",
      "graphs",
      "metrics",
      "KPIs",
      "business intelligence",
      "reporting",
      "performance"
    ],
    "useCases": [
      "Articles about data analysis and business intelligence",
      "Posts explaining dashboard creation and reporting",
      "Content about KPI tracking and metrics",
      "Tutorials on data visualization techniques"
    ],
    "themes": [
      "business intelligence",
      "data analysis",
      "reporting",
      "automation",
      "visualization"
    ],
    "style": "illustration",
    "colors": ["blue", "orange", "white", "gray"],
    "dimensions": {
      "width": 1200,
      "height": 800
    },
    "fileSize": "145KB",
    "generatedAt": "2025-01-09T10:30:00Z",
    "lastUpdated": "2025-01-09T10:30:00Z"
  },

  "team-collaboration-office.jpg": {
    "filename": "team-collaboration-office.jpg",
    "path": "/images/library/team-collaboration-office.jpg",
    "description": "A diverse business team collaborating around a laptop in a modern office environment. Team members are reviewing data on a screen together, demonstrating teamwork and shared decision-making in a professional workplace setting.",
    "keywords": [
      "teamwork",
      "collaboration",
      "office",
      "meeting",
      "business team",
      "workplace",
      "productivity",
      "professional",
      "discussion",
      "data sharing"
    ],
    "useCases": [
      "Posts about team collaboration features and shared workspaces",
      "Articles on workplace productivity and team dynamics",
      "Content about collaborative reporting and shared dashboards",
      "Use case stories about team-based automation"
    ],
    "themes": [
      "collaboration",
      "teamwork",
      "business",
      "productivity",
      "workplace"
    ],
    "style": "photo",
    "colors": ["blue", "gray", "white", "natural"],
    "dimensions": {
      "width": 1600,
      "height": 1200
    },
    "fileSize": "320KB",
    "generatedAt": "2025-01-09T10:35:00Z",
    "lastUpdated": "2025-01-09T10:35:00Z"
  },

  "salesforce-google-sheets-integration.png": {
    "filename": "salesforce-google-sheets-integration.png",
    "path": "/images/library/salesforce-google-sheets-integration.png",
    "description": "A diagram showing the connection between Salesforce and Google Sheets with arrows indicating data flow. Features both brand logos connected by sync arrows, representing automated data integration and bidirectional synchronization.",
    "keywords": [
      "Salesforce",
      "Google Sheets",
      "integration",
      "connection",
      "sync",
      "automation",
      "data flow",
      "API",
      "cloud integration"
    ],
    "useCases": [
      "Tutorial articles about connecting Salesforce to Google Sheets",
      "Posts explaining integration setup and configuration",
      "Content about data synchronization and automation",
      "Technical guides on API connections"
    ],
    "themes": [
      "integration",
      "automation",
      "connectivity",
      "data sync",
      "SheetSpread core feature"
    ],
    "style": "diagram",
    "colors": ["blue", "green", "orange", "white"],
    "dimensions": {
      "width": 1000,
      "height": 600
    },
    "fileSize": "85KB",
    "generatedAt": "2025-01-09T11:00:00Z",
    "lastUpdated": "2025-01-09T11:00:00Z"
  }
}
```

---

## Implementation Phases

### Phase 1: Infrastructure Setup (15 minutes)

**Goal**: Create the folder structure and initial files

**Tasks**:
1. Create image library folder
   ```bash
   mkdir -p public/images/library
   ```

2. Create data folder and metadata file
   ```bash
   mkdir -p data
   echo '{}' > data/image-metadata.json
   ```

3. Upload 3-5 test images to `public/images/library/`

**Verification**: Folder exists with test images

---

### Phase 2: Build Metadata Generation Script (1-2 hours)

**Goal**: Create script that analyzes images and generates metadata

**Tasks**:
1. Create `scripts/generateImageMetadata.js`
2. Implement Gemini Vision API integration
3. Design metadata extraction logic
4. Add file system operations (read images, write JSON)
5. Test with sample images

**Key Functions**:
- `scanImageLibrary()` - Find all images in library folder
- `loadExistingMetadata()` - Read current metadata.json
- `analyzeImageWithGemini(imagePath)` - Send to Gemini Vision
- `saveMetadata(metadata)` - Write to JSON file

**npm Command**:
```bash
npm run generate-image-metadata
```

**Expected Output**:
```
Scanning /public/images/library/...
Found 5 images, 3 need metadata generation.

Analyzing chart-analytics.png... ✓
Analyzing team-collab.jpg... ✓
Analyzing salesforce-dashboard.png... ✓

Metadata saved to data/image-metadata.json
```

---

### Phase 3: Update Article Generation (1 hour)

**Goal**: Integrate image selection into existing post generation

**Tasks**:
1. Update `scripts/createNextPost.js`
2. Add image metadata loading
3. Implement two-phase Gemini approach:
   - Phase 1: Generate article content
   - Phase 2: Select relevant images
4. Add image embedding logic
5. Test with existing post topics

**Changes to createNextPost.js**:
- Add `loadImageMetadata()` function
- Add `selectImagesForArticle(articleContent, imageMetadata)` function
- Add `embedImagesInArticle(articleHTML, selectedImages)` function
- Update main flow to include image selection

**Expected Output**:
```
Generating post-3...
✓ Article content generated
✓ Loaded 15 images from library
✓ Selected 2 relevant images
✓ Embedded images in article
✓ Saved to content/post-3.md
```

---

### Phase 4: Testing & Refinement (30 minutes)

**Goal**: Test the complete workflow and optimize prompts

**Tasks**:
1. Generate 2-3 test articles with different topics
2. Verify image relevance and placement
3. Check alt text quality
4. Optimize Gemini prompts if needed
5. Add error handling

**Test Cases**:
- Tutorial post (should get instructional/diagram images)
- Use case post (should get business/team images)
- Technical post (should get technical/dashboard images)

---

## Code Templates

### Template 1: generateImageMetadata.js

```javascript
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = 'gemini-2.0-flash-exp';

const LIBRARY_PATH = path.join(process.cwd(), 'public', 'images', 'library');
const METADATA_PATH = path.join(process.cwd(), 'data', 'image-metadata.json');

/**
 * Scan the image library folder and return all image files
 */
function scanImageLibrary() {
  if (!fs.existsSync(LIBRARY_PATH)) {
    console.log('Creating library folder...');
    fs.mkdirSync(LIBRARY_PATH, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(LIBRARY_PATH);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images in library`);
  return imageFiles;
}

/**
 * Load existing metadata or return empty object
 */
function loadExistingMetadata() {
  if (!fs.existsSync(METADATA_PATH)) {
    return {};
  }
  const data = fs.readFileSync(METADATA_PATH, 'utf-8');
  return JSON.parse(data);
}

/**
 * Analyze image with Gemini Vision API
 */
async function analyzeImageWithGemini(filename) {
  const imagePath = path.join(LIBRARY_PATH, filename);
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  // Get image dimensions and file size
  const stats = fs.statSync(imagePath);
  const fileSize = `${Math.round(stats.size / 1024)}KB`;

  const prompt = `You are an image metadata generator for a blog about Google Sheets automation, Salesforce integration, and business data tools.

Analyze this image and provide comprehensive metadata in JSON format:

{
  "description": "2-3 sentence detailed description of the image",
  "keywords": ["keyword1", "keyword2", ...], // 8-12 searchable terms
  "useCases": ["specific use case 1", "use case 2", ...], // 3-4 scenarios where this image would be perfect
  "themes": ["theme1", "theme2", ...], // 3-5 main topics this image represents
  "style": "photo|illustration|diagram|screenshot|graphic",
  "colors": ["color1", "color2", ...] // 3-4 dominant colors
}

Consider:
- What topics would this image enhance?
- When would a writer want to use it?
- What message does it communicate visually?
- Is it suitable for business/professional content?

Return ONLY the JSON object, no additional text.`;

  try {
    const result = await genAI.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: `image/${path.extname(filename).slice(1)}`,
                data: base64Image
              }
            },
            { text: prompt }
          ]
        }
      ]
    });

    const responseText = result.response.text();

    // Extract JSON from response (handles code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0].trim();
    }

    const metadata = JSON.parse(jsonText);

    // Add additional metadata
    return {
      filename,
      path: `/images/library/${filename}`,
      ...metadata,
      fileSize,
      generatedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Error analyzing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Save metadata to JSON file
 */
function saveMetadata(metadata) {
  const dataDir = path.dirname(METADATA_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
  console.log(`\nMetadata saved to ${METADATA_PATH}`);
}

/**
 * Main execution
 */
async function generateImageMetadata() {
  console.log('🖼️  Image Metadata Generator\n');

  // Scan library
  const imageFiles = scanImageLibrary();
  if (imageFiles.length === 0) {
    console.log('No images found. Add images to public/images/library/ first.');
    return;
  }

  // Load existing metadata
  const existingMetadata = loadExistingMetadata();

  // Find images that need metadata
  const imagesToProcess = imageFiles.filter(file => !existingMetadata[file]);

  if (imagesToProcess.length === 0) {
    console.log('All images already have metadata. ✓');
    return;
  }

  console.log(`\nProcessing ${imagesToProcess.length} new images...\n`);

  // Process each image
  for (const filename of imagesToProcess) {
    process.stdout.write(`Analyzing ${filename}... `);

    const metadata = await analyzeImageWithGemini(filename);

    if (metadata) {
      existingMetadata[filename] = metadata;
      console.log('✓');
    } else {
      console.log('✗ (failed)');
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save updated metadata
  saveMetadata(existingMetadata);

  console.log(`\n✅ Complete! ${Object.keys(existingMetadata).length} images in library.`);
}

// Run the script
generateImageMetadata().catch(console.error);
```

---

### Template 2: Updated createNextPost.js (Key Functions to Add)

```javascript
// Add these functions to existing createNextPost.js

const METADATA_PATH = path.join(process.cwd(), 'data', 'image-metadata.json');

/**
 * Load image metadata from JSON file
 */
function loadImageMetadata() {
  if (!fs.existsSync(METADATA_PATH)) {
    console.log('⚠️  No image metadata found. Run: npm run generate-image-metadata');
    return null;
  }

  const data = fs.readFileSync(METADATA_PATH, 'utf-8');
  const metadata = JSON.parse(data);

  const imageCount = Object.keys(metadata).length;
  console.log(`📚 Loaded ${imageCount} images from library`);

  return metadata;
}

/**
 * Select relevant images for article using Gemini
 */
async function selectImagesForArticle(articleContent, imageMetadata) {
  if (!imageMetadata || Object.keys(imageMetadata).length === 0) {
    console.log('⚠️  No images available in library');
    return [];
  }

  const prompt = `You are selecting the best images for a blog article about Google Sheets automation and Salesforce integration.

ARTICLE CONTENT:
${articleContent}

AVAILABLE IMAGES:
${JSON.stringify(imageMetadata, null, 2)}

TASK:
Analyze the article's main themes, topics, and content. Review the available images and their metadata. Select 1-2 images that would best enhance this article.

Consider:
- Relevance to article themes
- Visual appeal and professional quality
- Placement opportunities in the article
- Diversity (avoid similar images)

RESPONSE FORMAT (JSON only):
{
  "selectedImages": [
    {
      "filename": "exact-filename.png",
      "placement": "after-introduction|mid-article|before-conclusion",
      "reasoning": "brief explanation why this image fits"
    }
  ]
}

Return ONLY the JSON object.`;

  try {
    const result = await genAI.models.generateContent({
      model: model,
      contents: prompt
    });

    const responseText = result.response.text();

    // Extract JSON
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0].trim();
    }

    const selection = JSON.parse(jsonText);
    console.log(`🎯 Selected ${selection.selectedImages.length} images`);

    return selection.selectedImages;

  } catch (error) {
    console.error('Error selecting images:', error.message);
    return [];
  }
}

/**
 * Embed images in article HTML
 */
function embedImagesInArticle(articleHTML, selectedImages, imageMetadata) {
  if (!selectedImages || selectedImages.length === 0) {
    return articleHTML;
  }

  let updatedHTML = articleHTML;

  for (const selection of selectedImages) {
    const { filename, placement } = selection;
    const metadata = imageMetadata[filename];

    if (!metadata) {
      console.log(`⚠️  Image not found in metadata: ${filename}`);
      continue;
    }

    // Create image HTML
    const imageHTML = `
<div style="margin: 32px 0; text-align: center;">
  <img
    src="${metadata.path}"
    alt="${metadata.description}"
    style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
  />
</div>`;

    // Determine insertion point based on placement
    let insertionPoint;
    if (placement === 'after-introduction') {
      // After first </p> tag
      insertionPoint = updatedHTML.indexOf('</p>') + 4;
    } else if (placement === 'mid-article') {
      // Roughly middle of content
      const pTags = updatedHTML.match(/<\/p>/g);
      const midPoint = Math.floor(pTags.length / 2);
      let count = 0;
      insertionPoint = updatedHTML.split('</p>').reduce((pos, part, i) => {
        if (count === midPoint) return pos;
        count++;
        return pos + part.length + 4;
      }, 0);
    } else { // before-conclusion
      // Before last <p><b> heading
      const lastHeading = updatedHTML.lastIndexOf('<p><b>');
      insertionPoint = lastHeading > 0 ? lastHeading : updatedHTML.length - 100;
    }

    // Insert image
    updatedHTML = updatedHTML.slice(0, insertionPoint) + imageHTML + updatedHTML.slice(insertionPoint);

    console.log(`  ✓ Embedded ${filename} at ${placement}`);
  }

  return updatedHTML;
}

// MODIFY MAIN FUNCTION TO INCLUDE IMAGE SELECTION:

async function createNextPost() {
  // ... existing code to generate article content ...

  console.log('\n📸 Processing images...');

  // Load image library
  const imageMetadata = loadImageMetadata();

  let finalContent = blogContent;

  if (imageMetadata) {
    // Select relevant images
    const selectedImages = await selectImagesForArticle(blogContent, imageMetadata);

    // Embed selected images
    if (selectedImages.length > 0) {
      finalContent = embedImagesInArticle(blogContent, selectedImages, imageMetadata);
    }
  }

  // Save post with embedded images
  const postPath = path.join(process.cwd(), 'content', `${postSlug}.md`);
  fs.writeFileSync(postPath, `${postTitle}\n\n${finalContent}`);

  // ... rest of existing code ...
}
```

---

## Gemini Prompts

### Prompt 1: Image Metadata Generation

```
You are an image metadata generator for a blog about Google Sheets automation, Salesforce integration, and business data tools.

Analyze this image and provide comprehensive metadata in JSON format:

{
  "description": "2-3 sentence detailed description of the image",
  "keywords": ["keyword1", "keyword2", ...], // 8-12 searchable terms
  "useCases": ["specific use case 1", "use case 2", ...], // 3-4 scenarios where this image would be perfect
  "themes": ["theme1", "theme2", ...], // 3-5 main topics this image represents
  "style": "photo|illustration|diagram|screenshot|graphic",
  "colors": ["color1", "color2", ...] // 3-4 dominant colors
}

Consider:
- What topics would this image enhance?
- When would a writer want to use it?
- What message does it communicate visually?
- Is it suitable for business/professional content?

Return ONLY the JSON object, no additional text.
```

### Prompt 2: Image Selection for Article

```
You are selecting the best images for a blog article about Google Sheets automation and Salesforce integration.

ARTICLE CONTENT:
[Full article HTML here]

AVAILABLE IMAGES:
[Complete image-metadata.json here]

TASK:
Analyze the article's main themes, topics, and content. Review the available images and their metadata. Select 1-2 images that would best enhance this article.

Consider:
- Relevance to article themes
- Visual appeal and professional quality
- Placement opportunities in the article
- Diversity (avoid selecting very similar images)

RESPONSE FORMAT (JSON only):
{
  "selectedImages": [
    {
      "filename": "exact-filename-from-library.png",
      "placement": "after-introduction|mid-article|before-conclusion",
      "reasoning": "brief explanation why this image fits the article content"
    }
  ]
}

Return ONLY the JSON object, no additional text.
```

---

## Usage Workflow

### Initial Setup (One-time)

```bash
# 1. Create folders
mkdir -p public/images/library
mkdir -p data
echo '{}' > data/image-metadata.json

# 2. Upload your images
# Copy 10-20 images to public/images/library/

# 3. Generate metadata for all images
npm run generate-image-metadata

# Result: All images now have AI-generated metadata
```

### Adding New Images (As Needed)

```bash
# 1. Add new images to public/images/library/

# 2. Generate metadata for new images only
npm run generate-image-metadata

# Result: Only new images are analyzed, existing metadata preserved
```

### Generating Articles with Images

```bash
# Just run your normal post generation
npm run create-post

# The script will automatically:
# 1. Generate article content
# 2. Load image library
# 3. Select relevant images
# 4. Embed images in article
# 5. Save complete post

# Result: Article with perfectly matched images
```

### Example Day-to-Day Workflow

```
Monday:
- Upload 5 new product screenshots to library
- Run: npm run generate-image-metadata
- Takes 2 minutes, all images now cataloged

Tuesday:
- Run: npm run create-post (post-5 about "Automated Reporting")
- Gemini selects: "dashboard-analytics.png" and "team-collab.jpg"
- Article generated with both images embedded

Wednesday:
- Run: npm run create-post (post-6 about "SOQL Queries")
- Gemini selects: "salesforce-query-diagram.png"
- Different images for different topic

Result: Same library, smart selection per article
```

---

## npm Commands

Add these to your `package.json`:

```json
{
  "scripts": {
    "generate-image-metadata": "node scripts/generateImageMetadata.js",
    "create-post": "node scripts/createNextPost.js",
    "regenerate-metadata": "rm data/image-metadata.json && npm run generate-image-metadata"
  }
}
```

### Command Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run generate-image-metadata` | Generate metadata for new images | After uploading new images to library |
| `npm run create-post` | Generate article with smart image selection | Regular post creation |
| `npm run regenerate-metadata` | Regenerate all metadata from scratch | If you want fresh analysis or changed prompts |

---

## Benefits

### ✅ Reusable Image Library
- Upload images once, use in many articles
- No need to generate/find images for every post
- Build a curated library over time

### ✅ Smart AI Matching
- AI understands BOTH article content AND image context
- Better relevance than random selection
- Learns from rich metadata

### ✅ Consistent Quality
- All images pre-approved and curated
- No off-brand or low-quality images
- Professional appearance maintained

### ✅ SEO Optimization
- Rich alt text from AI-generated descriptions
- Relevant image-content alignment
- Better accessibility

### ✅ Time Savings
- No manual image search per article
- Automated intelligent selection
- Scales as library grows

### ✅ Flexibility
- Easy to add new images anytime
- Metadata updates independently
- Can manually override selections if needed

---

## Example Scenarios

### Scenario 1: Tutorial Post
```
Topic: "How to Connect Salesforce to Google Sheets"

Image Selection:
✓ "salesforce-google-sheets-integration.png" (diagram)
  Reasoning: Shows the connection visually, perfect for tutorial

✓ "oauth-authentication-flow.png" (diagram)
  Reasoning: Explains security, matches technical content

Result: Tutorial has clear visual aids at key explanation points
```

### Scenario 2: Use Case Post
```
Topic: "5 Ways Sales Teams Use SheetSpread"

Image Selection:
✓ "sales-team-dashboard.png" (screenshot)
  Reasoning: Shows real dashboard, relevant to sales context

✓ "team-collaboration-office.jpg" (photo)
  Reasoning: Represents team usage, adds human element

Result: Use case has both technical and human interest visuals
```

### Scenario 3: Technical Post
```
Topic: "Working with Large Datasets in Google Sheets"

Image Selection:
✓ "data-processing-visualization.png" (illustration)
  Reasoning: Abstract representation of data processing

✓ "performance-optimization-chart.png" (chart)
  Reasoning: Shows before/after performance metrics

Result: Technical post has data-focused, relevant imagery
```

---

## Troubleshooting

### Issue: "No images found"
**Solution**: Check that images are in `public/images/library/` and have valid extensions (.png, .jpg, .jpeg, .gif, .webp)

### Issue: "Gemini API error"
**Solution**: Verify `GEMINI_API_KEY` is set in `.env` file

### Issue: "Images not embedding in article"
**Solution**:
1. Check that image filenames match exactly in metadata
2. Verify image paths start with `/images/library/`
3. Check that selectedImages array has valid placement values

### Issue: "Metadata generation too slow"
**Solution**:
1. Process images in smaller batches
2. Add delay between API calls (already in script)
3. Consider using gemini-1.5-flash for faster processing

### Issue: "Wrong images selected"
**Solution**:
1. Improve image metadata descriptions
2. Add more specific keywords and use cases
3. Upload more diverse images to library
4. Refine selection prompt for better matching

---

## Future Enhancements

### Possible Additions:
1. **Admin UI**: Web interface to browse and manage image library
2. **Manual Override**: Allow specifying images in content calendar
3. **Image Tags**: Category system for images (icons, screenshots, photos, etc)
4. **Usage Tracking**: Track which images are used most often
5. **Bulk Upload Tool**: Script to upload and tag many images at once
6. **Image Recommendations**: Suggest missing image types based on common topics

---

## Quick Start Checklist

- [ ] Create `public/images/library/` folder
- [ ] Create `data/image-metadata.json` file
- [ ] Add `generateImageMetadata.js` script
- [ ] Update `createNextPost.js` with image functions
- [ ] Add npm commands to package.json
- [ ] Upload 5-10 test images
- [ ] Run metadata generation
- [ ] Test article creation with images
- [ ] Review image selections and refine prompts
- [ ] Scale up library with more images

---

**Ready to implement?** Start with Phase 1 and work through each phase. The system is designed to be modular - each phase works independently and adds value.

Good luck! 🚀
