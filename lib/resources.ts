import fs from 'fs'
import path from 'path'

export interface Resource {
  slug: string
  title: string
  description: string
  content: string
  downloadUrl?: string
  fileType?: string
  fileSize?: string
}

function extractMetadata(content: string): { description: string; downloadUrl?: string; fileType?: string; fileSize?: string; cleanContent: string } {
  const lines = content.split('\n')
  let description = ''
  let downloadUrl = ''
  let fileType = ''
  let fileSize = ''
  let contentStartIndex = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('Description:')) {
      description = line.replace('Description:', '').trim()
      contentStartIndex = i + 1
    } else if (line.startsWith('Download:')) {
      downloadUrl = line.replace('Download:', '').trim()
      contentStartIndex = i + 1
    } else if (line.startsWith('Type:')) {
      fileType = line.replace('Type:', '').trim()
      contentStartIndex = i + 1
    } else if (line.startsWith('Size:')) {
      fileSize = line.replace('Size:', '').trim()
      contentStartIndex = i + 1
    } else if (line && !line.startsWith('Description:') && !line.startsWith('Download:') && !line.startsWith('Type:') && !line.startsWith('Size:')) {
      break
    }
  }
  
  const cleanContent = lines.slice(contentStartIndex).join('\n').trim()
  
  if (!description) {
    const firstParagraph = cleanContent.split('\n\n')[0]
    description = firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '')
  }
  
  return { description, downloadUrl, fileType, fileSize, cleanContent }
}

export function getAllResources(): Resource[] {
  const resourcesDirectory = path.join(process.cwd(), 'resources')
  
  if (!fs.existsSync(resourcesDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(resourcesDirectory)
  
  const resources = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(resourcesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const lines = fileContents.split('\n')
      const title = lines[0].replace(/^#\s*/, '').trim()
      
      let startIndex = 1
      while (startIndex < lines.length && lines[startIndex].trim() === '') {
        startIndex++
      }
      
      const remainingContent = lines.slice(startIndex).join('\n')
      const { description, downloadUrl, fileType, fileSize, cleanContent } = extractMetadata(remainingContent)
      
      const slug = name.replace(/\.md$/, '')
      
      return {
        slug,
        title,
        description,
        content: cleanContent,
        downloadUrl,
        fileType,
        fileSize
      }
    })
  
  return resources
}

export function getResourceBySlug(slug: string): Resource | null {
  const resources = getAllResources()
  return resources.find(resource => resource.slug === slug) || null
}