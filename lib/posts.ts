import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  content: string
  excerpt: string
}

function stripHtmlTags(text: string): string {
  // Remove HTML tags
  return text.replace(/<[^>]*>/g, '');
}

function extractExcerpt(content: string): string {
  // Remove HTML tags and get first paragraph
  const textContent = stripHtmlTags(content);
  const firstParagraph = textContent.split('\n\n')[0];
  return firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '');
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Split content to get title and body
      const lines = fileContents.split('\n')
      const rawTitle = lines[0].trim()
      // Strip HTML tags from the title for display
      const title = stripHtmlTags(rawTitle)
      // Skip the first line (title) and any empty lines immediately after it
      let startIndex = 1;
      while (startIndex < lines.length && lines[startIndex].trim() === '') {
        startIndex++;
      }
      // Join remaining lines preserving original spacing
      const content = lines.slice(startIndex).join('\n')
      
      const slug = name.replace(/\.md$/, '')
      const excerpt = extractExcerpt(content)
      
      return {
        slug,
        title,
        content,
        excerpt
      }
    })
  
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
} 