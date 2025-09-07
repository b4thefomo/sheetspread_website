const fs = require('fs');
const path = require('path');

// Load content calendar for titles
function getContentCalendar() {
  try {
    const calendarPath = path.join(process.cwd(), 'content-calendar.json')
    const calendarData = fs.readFileSync(calendarPath, 'utf8')
    const calendar = JSON.parse(calendarData)
    
    // Create a mapping of post slug to title
    const titleMap = {}
    calendar.posts.forEach((post) => {
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

function stripHtmlTags(text) {
  // Remove HTML tags
  return text.replace(/<[^>]*>/g, '');
}

function extractExcerpt(content) {
  // Remove HTML tags and get first paragraph
  const textContent = stripHtmlTags(content);
  const firstParagraph = textContent.split('\n\n')[0];
  // Set character limit to 150 characters
  return firstParagraph.substring(0, 150) + (firstParagraph.length > 150 ? '...' : '');
}

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = fs.readdirSync(postsDirectory)
  const titleMap = getContentCalendar()
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const slug = name.replace(/\.md$/, '')
      
      // Get title from content calendar, fallback to first line if not found
      let title
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

function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

module.exports = {
  getAllPosts,
  getPostBySlug
};