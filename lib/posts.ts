import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  content: string
  excerpt: string
}

function extractExcerpt(content: string): string {
  // Remove HTML tags and get first paragraph
  const textContent = content.replace(/<[^>]*>/g, '');
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
      const title = lines[0].trim()
      const content = lines.slice(1).join('\n').trim()
      
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