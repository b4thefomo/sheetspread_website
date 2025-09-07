const fs = require('fs');
const path = require('path');

// Load content calendar
const contentCalendarPath = path.join(process.cwd(), 'content-calendar.json');
const contentCalendar = JSON.parse(fs.readFileSync(contentCalendarPath, 'utf8'));

// Create mapping of post ID to clean title
const titleMap = {};
contentCalendar.posts.forEach(post => {
  if (post.title) {
    titleMap[post.id] = post.title;
  }
});

// Content directory
const contentDir = path.join(process.cwd(), 'content');

// Process each post
Object.keys(titleMap).forEach(postId => {
  const filePath = path.join(contentDir, `${postId}.md`);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${postId}...`);
    
    // Read current content
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Replace first line with clean title from calendar
    const cleanTitle = titleMap[postId];
    lines[0] = cleanTitle;
    
    // Write back to file
    const updatedContent = lines.join('\n');
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✓ Updated ${postId} title to: "${cleanTitle}"`);
  } else {
    console.log(`⚠ File not found: ${filePath}`);
  }
});

console.log('\n✅ Post title cleanup completed!');