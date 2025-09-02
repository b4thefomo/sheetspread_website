# Automated Blog Post Generation

## Overview
This application uses GitHub Actions to automatically generate and publish blog posts every 12 hours. The automation reads from a content calendar, generates content using AI, and commits the results back to the repository.

## How It Works

### Schedule
The automation runs:
- **Twice daily**: 00:00 UTC and 12:00 UTC (midnight and noon)
- **On demand**: Can be manually triggered from GitHub Actions tab

### Workflow Process
1. **Check Calendar**: Reads `content-calendar.json` to find the next unpublished post
2. **Generate Content**: Uses Gemini AI to create blog post content
3. **Generate Image**: Creates a matching image using Imagen API
4. **Sanitize Content**: Removes AI detection patterns (double dashes, em dashes)
5. **Add Links**: Inserts internal links and resource references
6. **Commit Changes**: Pushes new content to the repository
7. **Auto Deploy**: Vercel automatically deploys the new content

### Files Generated
For each post, the automation creates:
- `/content/post-{id}.md` - The blog post content
- `/public/post-{id}.jpeg` - The featured image
- Updates to `content-calendar.json` - Marks post as "Done"

## Setup Requirements

### 1. GitHub Secrets
Add these secrets to your repository (Settings → Secrets → Actions):

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey

### 2. Permissions
Ensure GitHub Actions has write permissions:
- Go to Settings → Actions → General
- Under "Workflow permissions", select "Read and write permissions"

### 3. Content Calendar
The `content-calendar.json` file must contain posts with this structure:
```json
{
  "posts": [
    {
      "id": "post-16",
      "prompt": "Blog post prompt here",
      "title": "Blog Post Title",
      "status": ""  // Empty or not "Done" to be generated
    }
  ]
}
```

## Manual Triggers

### Via GitHub UI
1. Go to Actions tab in your repository
2. Select "Auto Generate Blog Post" workflow
3. Click "Run workflow"
4. Optionally enable debug mode
5. Click "Run workflow" button

### Via GitHub CLI
```bash
gh workflow run auto-generate-post.yml
```

## Monitoring

### Success Indicators
- ✅ New commit appears with "🤖 Auto-generated blog post" message
- ✅ Vercel deploys the changes automatically
- ✅ New post appears on the website

### Failure Handling
If generation fails:
- ❌ An issue is automatically created with error details
- ❌ Check the Actions tab for detailed logs
- ❌ Manually run `npm run create-post` locally if needed

## Troubleshooting

### Common Issues

#### 1. API Key Invalid
**Error**: "API key not valid"
**Solution**: Check that `GEMINI_API_KEY` secret is correctly set

#### 2. Rate Limiting
**Error**: "Rate limit exceeded"
**Solution**: Wait for rate limit reset or reduce generation frequency

#### 3. Image Generation Timeout
**Error**: "Image generation failed"
**Solution**: The post will still be created without image; manually add image later

#### 4. No Posts to Generate
**Message**: "All posts are already generated"
**Solution**: Add new posts to `content-calendar.json`

### Debug Mode
Enable debug mode when manually triggering to see detailed logs:
1. Check "Enable debug logging" when running workflow
2. View detailed output in Actions logs

## Customization

### Change Schedule
Edit `.github/workflows/auto-generate-post.yml`:
```yaml
on:
  schedule:
    - cron: '0 0,12 * * *'  # Modify this cron expression
```

Cron examples:
- `0 */6 * * *` - Every 6 hours
- `0 0 * * *` - Once daily at midnight
- `0 0 * * 1` - Weekly on Mondays

### Disable Automation
To temporarily disable:
1. Go to Actions tab
2. Select the workflow
3. Click "..." menu → "Disable workflow"

## Local Development

### Test Generation Locally
```bash
# Set environment variable
export GEMINI_API_KEY=your_key_here

# Run generation script
npm run create-post

# Or run individual steps
node scripts/createNextPost.js
node scripts/sanitizeContent.js
node scripts/postProcessBlog.js post-16
```

### Test Workflow Locally
Use [act](https://github.com/nektos/act) to test GitHub Actions locally:
```bash
# Install act
brew install act

# Test workflow
act -s GEMINI_API_KEY=your_key_here
```

## Best Practices

1. **Monitor API Usage**: Check your Gemini API dashboard for usage limits
2. **Review Generated Content**: Periodically review auto-generated posts for quality
3. **Backup Content**: Regular backups ensure content isn't lost
4. **Update Calendar**: Keep content-calendar.json populated with upcoming posts
5. **Test Changes**: Test workflow changes in a branch first

## Support

For issues or questions:
1. Check the GitHub Actions logs
2. Review automatically created issues for failures
3. Open a new issue with the `automation` label
4. Check workflow status: [Actions Tab](../../actions)