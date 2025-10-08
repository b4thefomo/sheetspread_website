# SheetSpread Blog Application

## Overview
This is a Next.js 14 blog application for SheetSpread, focused on Google Sheets automation, Salesforce integration, and AI-powered data reporting. The application is built with TypeScript, React 18, and Tailwind CSS for styling.

## What SheetSpread Does

SheetSpread is an advanced Google Apps Script add-on that transforms Google Sheets into a powerful data integration and reporting platform. Originally designed for scheduled email snapshots, it has evolved into a comprehensive solution for:

- **Automated Email Reporting**: Capture and email sheet data on flexible schedules (hourly, daily, weekly, monthly)
- **Salesforce Integration**: Bidirectional sync with Salesforce via OAuth2, supporting SOQL queries and Analytics API reports
- **AI-Powered Insights**: Transform raw data into engaging narratives with executive summaries using Google Gemini AI
- **Command Center Dashboard**: Centralized web application for tracking all data operations, query history, and execution statistics across all user sheets
- **User Analytics**: Track user behavior and feature adoption for product insights

### Core Value Propositions

1. **Data Accessibility**: Pull Salesforce data into Google Sheets without code
2. **Automated Reporting**: Schedule intelligent email reports with AI-generated insights
3. **Operational Visibility**: Track all data operations across your organization via Command Center
4. **Developer-Friendly**: Modular architecture with clean separation of concerns

## Blog Application Features

### Core Functionality
1. **Blog System**: Displays and manages blog posts about SheetSpread features, tutorials, and use cases
2. **Content Management**: Reads markdown files from the `/content` directory and renders them as blog posts
3. **Resources Section**: Provides a resources page for additional materials and documentation (currently hidden)

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
  /resources           - Resources section (currently hidden)
  /layout.tsx          - Root layout component
/content               - Markdown blog posts
/lib                   - Utility functions
  /posts.ts           - Post fetching and processing logic
  /resources.ts       - Resource management functions
/public               - Static assets (images, etc.)
```

### Content Topics
The blog covers SheetSpread features and data automation topics including:
- Google Sheets automation and productivity
- Salesforce integration tutorials
- SOQL queries for non-developers
- Email reporting and scheduling
- AI-powered data insights with Gemini
- Command Center dashboard guides
- Data security and OAuth best practices
- Real-world use cases and success stories

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run create-post` - Creates the next post from content-calendar.json
- `npm run sanitize` - Sanitize content to remove AI detection patterns
- `npm run post-process` - Run post-processing for internal linking

### Key Dependencies
- Next.js 14.0.0
- React 18
- Tailwind CSS 3.3.0
- gray-matter (for parsing markdown frontmatter)
- TypeScript 5
- Google Generative AI (for content and image generation)

## SheetSpread Feature List

### Email & Reporting
- ✅ **Scheduled Email Snapshots**: Hourly, daily, weekly, and monthly email scheduling
- ✅ **Smart Email Templates**: HTML templates with customizable layouts
- ✅ **AI-Powered Report Narratives**: Gemini AI generates executive summaries, key takeaways, and trend analysis
- ✅ **Email Preview**: Before-send preview dialog with data validation
- ✅ **Trigger Management**: CRUD operations for scheduled emails via sidebar UI
- ✅ **Flexible Scheduling**: Time-based triggers with customizable frequency and recipients

### Salesforce Integration
- ✅ **OAuth2 Authentication**: Secure user authorization with token refresh
- ✅ **SOQL Query Sync**: Execute custom SOQL queries and sync results to sheets
- ✅ **Salesforce Reports Sync**: Execute Analytics API reports and sync to sheets
- ✅ **Report Scheduling**: Schedule Salesforce reports to run on cadence
- ✅ **Saved Queries**: Save frequently used SOQL queries for quick access
- ✅ **Sandbox Support**: Toggle between production and sandbox environments
- ✅ **Two-Column Dialogs**: Modern UI with query templates, field references, and live previews
- ✅ **Auto-Formatted Sheets**: Headers with Salesforce branding, frozen rows, auto-resized columns
- ✅ **Pagination Support**: Handle large datasets (>2000 records) automatically
- ✅ **Instance URL Auto-Detection**: Automatic instance URL retrieval from userinfo endpoint

### Command Center Dashboard
- ✅ **Web Application**: Standalone dashboard accessible via web URL
- ✅ **Query History Tracking**: Auto-logs all SOQL queries and report executions
- ✅ **Dashboard Analytics**: Stats cards showing total queries, reports synced, rows processed, active sheets
- ✅ **Recent Activity Timeline**: Last 10 operations with status indicators
- ✅ **Re-run Queries**: One-click re-execution of previous queries
- ✅ **Multiple Views**: Dashboard, SOQL Queries, Reports, Saved Queries, Settings
- ✅ **Data Retention**: Auto-prunes to keep last 100 queries per user
- ✅ **Modern UI**: Two-column layout with sidebar navigation, DaisyUI/Tailwind styling

### AI & Analytics
- ✅ **Gemini AI Integration**: Google Gemini 1.5 Flash for data analysis
- ✅ **Smart Data Detection**: Auto-detects column types (dates, currency, percentages, categories)
- ✅ **Intelligent Insights**: Generates hooks, summaries, key takeaways, and trend analysis
- ✅ **Fallback Analysis**: Basic statistical analysis when AI unavailable
- ✅ **User Event Tracking**: Stores user actions in Script Properties for analytics
- ✅ **Performance Optimization**: <5 second AI analysis target

### Developer Experience
- ✅ **Modular Architecture**: Domain-driven folder structure with clear separation of concerns
- ✅ **Clasp Workflow**: Local development with organized folders, deployed flat to Apps Script
- ✅ **OAuth2 Library Integration**: Reusable OAuth2 patterns for third-party integrations
- ✅ **Property Management**: Script, User, and Document Properties for appropriate data scoping
- ✅ **Error Handling**: Try-catch blocks with user-friendly messages and detailed logging
- ✅ **Security Best Practices**: No hardcoded credentials, .gitignore protection, credential rotation guides

### Authentication & Billing
- ✅ **Stripe Integration**: Customer validation via Stripe API
- ✅ **Per-User Authorization**: OAuth tokens stored in User Properties for data isolation
- ✅ **Credential Management**: Centralized setup helpers and status checking functions

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

1. **Ask a provocative question**: Start with a compelling question that makes the reader curious
   - Example: "Why Do 90% of Teams Struggle with Salesforce Reporting?"

2. **Use startling statistics**: Share a surprising data point
   - Example: "How SheetSpread Saves Teams 15 Hours Per Week on Data Reports"

3. **Make a bold statement**: Use a confident, declarative statement
   - Example: "Your Salesforce Data Deserves Better: The Modern Reporting Revolution"

4. **Promise a solution or benefit**: Directly state the value
   - Example: "The Complete Guide to Automated Salesforce Reporting in Google Sheets"

5. **Create curiosity or urgency**: Use hooks that spark interest
   - Example: "The Secret to Real-Time Salesforce Insights (Without Learning SOQL)"

6. **Tell a short anecdote**: Begin with an intriguing story
   - Example: "How One Sales Team Replaced 10 Tools with SheetSpread"

## Notes for Development
- Blog posts are stored as markdown files in `/content` directory
- Post slugs are derived from the markdown filename
- Images for posts should be placed in `/public` with matching slug names (e.g., `post-1.jpeg`)
- The application extracts the first 200 characters of content as post excerpts
- Resources section is currently hidden but can be re-enabled by updating ResourcesDropdown.tsx

## SheetSpread Roadmap

### In Progress
- Pulling data on a cadence (partially implemented via Salesforce Reports Scheduler)
- Dashboard config (Command Center implemented)
- User behaviour analytics (tracking implemented, analytics dashboard pending)

### Planned Features
- 🔜 Pushing data into Salesforce (reverse sync)
- 🔜 Daisy chaining uploads (ID mapping between uploads)
- 🔜 Org-wide upload dashboard with statuses
- 🔜 Approvals and permissions system
- 🔜 Trigger-based upload for Google Forms
- 🔜 Google Slides document generation
- 🔜 Scheduled document delivery
- 🔜 Data merging capabilities
- 🔜 Duplicate identification and labeling
