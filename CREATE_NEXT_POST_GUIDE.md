# Create Next Post Function - Complete Guide

## Overview
The `createNextPost` function is the core automation system for the SailsMaps blog application. It handles the complete lifecycle of blog post creation, from content generation to image creation, processing, and publication.

## Command Usage
```bash
npm run create-post
```

## Prerequisites

### 1. Environment Setup
- **Gemini API Key**: Required in `.env` file
  ```
  GEMINI_API_KEY=your_actual_api_key_here
  ```
- **Get API Key**: https://aistudio.google.com/app/apikey

### 2. Content Calendar
- File: `./content-calendar.json`
- Must contain posts with `status` field
- Posts without `"status": "Done"` will be processed first

## Function Workflow

### Phase 1: Initialization & Validation
```javascript
// 1. Check API key exists and is valid
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  // Exits with error message
}

// 2. Read content calendar
const contentData = fs.readFileSync('./content-calendar.json', 'utf-8');
const calendar = JSON.parse(contentData);

// 3. Find next post to create
const nextPost = calendar.posts.find(post => !post.status || post.status !== 'Done');
```

### Phase 2: Content Generation
```javascript
// Uses Gemini 1.5 Flash model for blog content
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Content prompt with strict formatting requirements
const contentPrompt = `As an copywriting expert in the style of david ogilvy, write a comprehensive blog post...`;
```

**Content Requirements:**
- Start with title as plain text (no markdown heading)
- ⚠️ **NEVER include image tags** - handled automatically
- Italicized intro in `<p><i>...</i></p>` tags
- Section headings: `<p><b>Section Headings</b></p>`
- HTML tags only (no markdown): `<p>`, `<ul>`, `<li>`, `<b>`, `<i>`
- Include resource placeholders: `{{RESOURCE_PLACEHOLDER_1}}`, `{{RESOURCE_PLACEHOLDER_2}}`
- Include internal link placeholders: `{{INTERNAL_LINK_1}}`, `{{INTERNAL_LINK_2}}`
- 2000+ words, professional tone

### Phase 3: Image Generation
```javascript
// Uses Imagen-4.0 model
const ai = new GoogleGenAI({ apiKey: apiKey });
const imageResponse = await ai.models.generateImages({
  model: 'imagen-4.0-generate-001',
  prompt: cartoonStylePrompt,
  config: { numberOfImages: 1 }
});
```

**Image Style:**
- Cartoon illustration with thick black outlines
- Flat vibrant colors (yellow, orange, pink, purple, blue)
- Simple character with exaggerated features
- Solid bright background (green/blue)
- Construction/business floating elements
- **Absolutely NO TEXT in image**

**Image Processing:**
1. Receives base64 encoded image
2. Converts to Buffer
3. Processes with Sharp library
4. Converts to JPEG (85% quality)
5. Saves as `{post-id}.jpeg` in `/public`

### Phase 4: Post-Processing Pipeline

#### 4.1 Content Calendar Update
```javascript
// Mark post as completed
const updatedCalendar = {
  ...calendar,
  posts: calendar.posts.map(post =>
    post.id === nextPost.id
      ? { ...post, status: 'Done' }
      : post
  )
};
```

#### 4.2 Post-Processing (`postProcessBlog.js`)
- Replaces `{{RESOURCE_PLACEHOLDER_X}}` with actual resource links
- Replaces `{{INTERNAL_LINK_X}}` with links to other blog posts
- Adds related articles section
- Integrates downloadable resources

#### 4.3 Content Sanitization (`sanitizeContent.js`)
- Removes double dashes (`--`) and replaces with single dashes
- Removes any accidentally generated image tags
- Cleans up extra whitespace
- Fixes punctuation spacing

#### 4.4 Infographic Generation
- Creates downloadable infographic based on post content
- Saves to `/public/resources/infographics/{post-id}/`
- Generates HTML version with key takeaways

## File Structure Created

For each post (e.g., `post-42`):
```
content/
  └── post-42.md                    # Blog post content

public/
  ├── post-42.jpeg                  # Thumbnail image
  └── resources/
      └── infographics/
          └── post-42/
              └── infographic.html  # Downloadable infographic
```

## Content Calendar Structure

```json
{
  "posts": [
    {
      "id": "post-42",
      "post": "Brief description",
      "prompt": "Generation prompt",
      "title": "Blog Post Title",
      "url": "Future URL",
      "metaTitle": "SEO title",
      "metaDescription": "SEO description",
      "perspective": "project manager|supplier|general",
      "status": "Done|Next|pending"
    }
  ]
}
```

## Error Handling

### Common Issues & Solutions

1. **API Key Issues**
   ```
   ⚠️ Please set your GEMINI_API_KEY in .env file
   ```
   - Verify API key in `.env`
   - Check key has Imagen access

2. **No Posts to Generate**
   ```
   ✅ All posts in the content calendar are complete!
   ```
   - All posts marked as "Done"
   - Add new posts to calendar or reset status

3. **Image Generation Failures**
   ```
   ⚠️ No image was generated for post-X
   ```
   - Check API quotas
   - Verify network connectivity
   - Review prompt for policy violations

4. **File System Errors**
   - Ensure write permissions to `/content` and `/public`
   - Check disk space availability

## Usage Examples

### Standard Usage
```bash
# Generate next post in sequence
npm run create-post
```

### Testing Image Generation Only
```bash
# Generate single test image
npm run generate-image
```

### Manual Post-Processing
```bash
# Run post-processing on specific post
npm run post-process -- post-42

# Sanitize specific post content
npm run sanitize -- post-42
```

## Quality Control

### Automated Checks
- ✅ Content sanitization removes AI detection patterns
- ✅ Image format conversion ensures compatibility
- ✅ Resource integration maintains content quality
- ✅ Status tracking prevents duplicate generation

### Manual Review Points
1. **Content Quality**: Review generated blog post for accuracy
2. **Image Relevance**: Ensure thumbnail matches post topic
3. **Resource Links**: Verify placeholder replacements worked
4. **SEO Elements**: Check meta titles and descriptions

## Advanced Configuration

### Customizing Content Prompts
Edit the `contentPrompt` in `createNextPost.js` to adjust:
- Writing style and tone
- Content structure requirements
- Specific formatting needs
- Industry terminology

### Modifying Image Style
Update the image `prompt` variable to change:
- Visual style and colors
- Character appearance
- Background elements
- Overall aesthetic

### Adding Processing Steps
Extend the post-processing pipeline by:
1. Adding new script calls after line 148
2. Following the established pattern:
   ```javascript
   console.log('\n📊 Running new process...');
   const { newProcess } = require('./newScript');
   await newProcess(nextPost.id);
   ```

## Integration with Blog System

The generated files integrate seamlessly with the Next.js blog:

1. **Content**: `content/{post-id}.md` → Dynamic routes `/posts/{post-id}`
2. **Images**: `public/{post-id}.jpeg` → Automatic thumbnail display
3. **Resources**: Referenced via post-processing integration
4. **SEO**: Meta fields from content calendar

## Performance Considerations

- **Rate Limiting**: 2-second delays between batch operations
- **Image Quality**: 85% JPEG compression balances quality/size
- **API Usage**: Single request per post minimizes quota usage
- **File Sizes**: Sharp optimization keeps images lightweight

## Monitoring & Logs

The function provides detailed logging for each phase:
```
🚀 Starting automated post creation...
📝 Creating next post: [Title]
✍️ Generating blog content...
✅ Blog post saved to content/post-X.md
🎨 Generating image...
✅ Image saved to public/post-X.jpeg
📅 Updating content calendar...
🔄 Running post-processing...
🧹 Running content sanitization...
📊 Generating infographic...
🎉 Post creation complete!
```

## Best Practices

1. **Run during off-peak hours** to avoid API rate limits
2. **Backup content calendar** before bulk operations
3. **Review generated content** before publishing
4. **Monitor API quotas** for Gemini services
5. **Test image generation** with single posts first
6. **Maintain consistent content calendar** structure

This automation system ensures consistent, high-quality blog post creation while maintaining the SailsMaps brand identity and content standards.