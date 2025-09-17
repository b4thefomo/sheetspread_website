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

### Chart Integration Commands
- `node scripts/addChartEmbeds.js add-all` - Add charts to all posts
- `node scripts/addChartEmbeds.js add-post [slug]` - Add charts to specific post
- Charts are automatically added during post generation via `postProcessBlog.js`

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

### Image Handling Rules
**CRITICAL**: Post content must NEVER include inline image tags:

1. **NO Image Tags in Post Bodies**:
   - ❌ NEVER include `<img>` tags in post markdown content
   - ❌ DO NOT add image references in post body
   - ✅ Images are handled automatically by Next.js routing

2. **Automatic Image Display**:
   - Post thumbnails are displayed automatically by the blog layout
   - Images are served from `/public/post-{id}.jpeg`
   - Next.js Image component handles optimization

3. **Post Generation Rules**:
   - Content generation prompts explicitly forbid image tags
   - Post-processing no longer adds image references
   - This prevents duplicate images and layout issues

### Content Hook Guidelines
**Use these strategies for creating engaging blog post titles:**

1. **Ask a provocative question**: Start with a compelling question that makes the reader curious or addresses a problem they have
   - Example: "Why Do 73% of Change Requests Get Rejected?"

2. **Use startling statistics**: Share a surprising data point that highlights the importance or impact of your topic
   - Example: "90% of Change Orders Never Get Verified. Here's What You're Missing"

3. **Make a bold statement**: Use a confident, declarative statement that challenges assumptions or makes a strong claim
   - Example: "Your Scope Creep Starts Here: The Work Package Mapping Method"

4. **Promise a solution or benefit**: Directly state how your content will solve a problem or provide a valuable result
   - Example: "The Complete Change Order System Used by Fortune 500 PMs"

5. **Create curiosity or urgency**: Use phrases like "the secret no one tells you" or "don't miss out" to spark immediate interest
   - Example: "The Legal Clause That Saved a Contractor $800K (Is It in Your Contract?)"

6. **Tell a short anecdote**: Begin with a brief, intriguing story that sets the stage for your content
   - Example: "How One Missing Update Cost a PM Their Biggest Client (And How to Prevent It)"

## Chart Asset Integration System

### Overview
The application includes an automated chart generation and embedding system that adds visual elements to blog posts to break up text walls and improve engagement. Charts are automatically generated from post content during the creation process.

### Chart Types Supported
- **Donut Charts**: For percentage and statistical breakdowns
- **Comparison Charts**: For before/after or performance improvements
- **Timeline Charts**: For implementation schedules and deadlines
- **Process Flow Charts**: For step-by-step workflows

### Automatic Integration
Charts are automatically added to posts during creation through the post-processing workflow:
1. Content is analyzed for chartable data (percentages, dates, process steps)
2. Appropriate chart types are selected based on data patterns
3. Charts are embedded at strategic points in the post (after major sections)
4. Chart.js CDN is included for interactive functionality

### Chart Placement Strategy
- **Early placement**: Timeline and comparison charts after introduction
- **Mid-article placement**: Statistical and process flow charts after 2nd section
- **Maximum 2 charts per post**: To avoid overwhelming readers

### Manual Chart Commands
- Add charts to all posts: `node scripts/addChartEmbeds.js add-all`
- Add charts to specific post: `node scripts/addChartEmbeds.js add-post [slug]`
- Charts are automatically included when creating new posts

### Chart Styling
Charts use the construction industry color palette:
- Primary: #FF6600 (Orange)
- Secondary: #0891b2 (Blue)
- Accent: #64748b (Gray)
- Background: #f8fafc (Light Gray)


