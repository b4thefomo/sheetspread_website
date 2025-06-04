# SailsMaps Blog

A simple blog interface built with Next.js and Tailwind CSS, featuring posts about AI-powered location intelligence.

## Features

- **Responsive Design**: Clean, modern interface that works on all devices
- **Grid Layout**: Blog posts displayed in a responsive grid with thumbnails
- **Individual Post Pages**: Dedicated pages for each blog post with full content
- **Image Support**: Images displayed both in thumbnails and full post view
- **Tailwind CSS**: Beautiful styling with hover effects and transitions

## Project Structure

```
sailsmaps-blog/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page with blog grid
│   └── posts/
│       └── [slug]/
│           └── page.tsx     # Individual post pages
├── content/                 # Markdown blog posts
│   ├── post-1.md
│   ├── post-2.md
│   ├── post-3.md
│   └── post-4.md
├── lib/
│   └── posts.ts             # Utility functions for reading posts
├── public/                  # Static assets
│   ├── post-1.jpeg
│   ├── post-2.jpeg
│   ├── post-3.jpeg
│   └── post-4.jpeg
└── package.json
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Post Format

The blog posts are written in a simple HTML format with the following structure:

```
Post Title

<img src="/public/post-image.jpeg" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." />

<h2>Section Title</h2>
<p>Content goes here...</p>
```

## Customization

- **Styling**: Modify `app/globals.css` and Tailwind classes in components
- **Layout**: Update components in `app/` directory
- **Content**: Add new `.md` files to the `content/` directory
- **Images**: Add corresponding images to the `public/` directory

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library for building components

## License

This project is open source and available under the MIT License. 