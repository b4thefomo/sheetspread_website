import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  content: string
  excerpt: string
}

// Load content calendar for titles
function getContentCalendar() {
  try {
    const calendarPath = path.join(process.cwd(), 'content-calendar.json')
    const calendarData = fs.readFileSync(calendarPath, 'utf8')
    const calendar = JSON.parse(calendarData)
    
    // Create a mapping of post slug to title
    const titleMap: { [key: string]: string } = {}
    calendar.posts.forEach((post: any) => {
      if (post.id && post.title) {
        titleMap[post.id] = post.title
      }
    })
    return titleMap
  } catch (error) {
    console.warn('Could not load content calendar, falling back to markdown titles')
    return {}
  }
}

function stripHtmlTags(text: string): string {
  // Remove HTML tags
  return text.replace(/<[^>]*>/g, '');
}

function extractExcerpt(content: string): string {
  // Remove HTML tags and get first paragraph
  const textContent = stripHtmlTags(content);
  const firstParagraph = textContent.split('\n\n')[0];
  // Set character limit to 150 characters
  return firstParagraph.substring(0, 150) + (firstParagraph.length > 150 ? '...' : '');
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content')

  // Check if content directory exists, if not return empty array
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)
  const titleMap = getContentCalendar()
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const slug = name.replace(/\.md$/, '')
      
      // Get title from content calendar, fallback to first line if not found
      let title: string
      if (titleMap[slug]) {
        title = titleMap[slug]
      } else {
        // Fallback to parsing first line
        const lines = fileContents.split('\n')
        const rawTitle = lines[0].trim()
        title = stripHtmlTags(rawTitle)
      }
      
      // Skip the first line (title) and any empty lines immediately after it
      const lines = fileContents.split('\n')
      let startIndex = 1;
      while (startIndex < lines.length && lines[startIndex].trim() === '') {
        startIndex++;
      }
      // Join remaining lines preserving original spacing
      const content = lines.slice(startIndex).join('\n')
      
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