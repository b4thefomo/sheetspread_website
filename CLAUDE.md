# SailsMaps Blog Application

## Overview
This is a Next.js 14 blog application for SailsMaps, focused on AI-powered location intelligence and geospatial analysis content. The application is built with TypeScript, React 18, and Tailwind CSS for styling.

## What This Application Does

### Core Functionality
1. **Blog System**: Displays and manages blog posts about location intelligence, geospatial analysis, and AI-powered mapping solutions
2. **Content Management**: Reads markdown files from the `/content` directory and renders them as blog posts
3. **Resources Section**: Provides a resources page for additional materials and documentation

### Key Features
- **Dynamic Post Rendering**: Automatically generates blog post pages from markdown files
- **Image Support**: Each blog post has an associated thumbnail image (JPEG format)
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Clean UI**: Modern, minimalist design with hover effects and smooth transitions

### Technical Architecture
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Typography plugin
- **Content Format**: Markdown files processed with gray-matter
- **Image Handling**: Next.js Image component for optimized loading

### Project Structure
```
/app                    - Next.js app directory
  /page.tsx            - Homepage with blog post grid
  /posts/[slug]        - Dynamic blog post pages
  /resources           - Resources section
  /layout.tsx          - Root layout component
/content               - Markdown blog posts
/lib                   - Utility functions
  /posts.ts           - Post fetching and processing logic
  /resources.ts       - Resource management functions
/public               - Static assets (images, etc.)
```

### Content Topics
The blog covers AI-powered location intelligence topics including:
- Geospatial analysis and mapping
- Business decision-making with location data
- Supply chain optimization
- Real estate analytics
- Environmental monitoring
- Urban planning applications

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Key Dependencies
- Next.js 14.0.0
- React 18
- Tailwind CSS 3.3.0
- gray-matter (for parsing markdown frontmatter)
- TypeScript 5

## Notes for Development
- Blog posts are stored as markdown files in `/content` directory
- Post slugs are derived from the markdown filename
- Images for posts should be placed in `/public` with matching slug names (e.g., `post-1.jpeg`)
- The application extracts the first 200 characters of content as post excerpts

## Content Generation & Sanitization Guide

### Automated Content Creation
The application includes scripts for automated blog post generation:
- `npm run create-post` - Creates the next post from content-calendar.json
- Automatically generates blog content, images, and updates post status
- Runs post-processing for internal linking and resource integration

### Content Sanitization Rules
**IMPORTANT**: All generated content must be sanitized to avoid AI detection patterns:

1. **Double Dashes**: Replace all `--` with single dash `-`
   - DO NOT use em dashes (—) as they signal AI-generated content
   - Use single dashes for all dash purposes

2. **Automatic Sanitization**: The `sanitizeContent.js` script:
   - Runs automatically after each post generation
   - Removes double dashes and replaces with single dashes
   - Cleans up extra whitespace
   - Fixes punctuation spacing
   - Can be run manually: `node scripts/sanitizeContent.js`

3. **Manual Sanitization**: 
   - Run on all content: `node scripts/sanitizeContent.js`
   - Run on specific post: `node scripts/sanitizeContent.js post-id`

### Content Quality Guidelines
- Avoid overly perfect grammar that signals AI generation
- Use varied sentence structures
- Include industry-specific terminology naturally
- Break up long paragraphs for better readability
- Use HTML tags for formatting, not markdown



