const fs = require('fs');
const path = require('path');

// Define related articles for each post based on content themes
const relatedArticles = {
  'post-8': [
    { title: '7 tips from suppliers about change orders', link: '/posts/post-9' },
    { title: '7 tips from clients about change orders', link: '/posts/post-10' },
    { title: 'Why Change Order Management Can Make or Break Projects', link: '/posts/post-12' }
  ],
  'post-9': [
    { title: '7 tips from project managers about change orders', link: '/posts/post-8' },
    { title: '7 tips from clients about change orders', link: '/posts/post-10' },
    { title: '7 tips from procurements about change orders', link: '/posts/post-11' }
  ],
  'post-10': [
    { title: '7 tips from project managers about change orders', link: '/posts/post-8' },
    { title: '7 tips from suppliers about change orders', link: '/posts/post-9' },
    { title: 'Why Change Order Management Can Make or Break Projects', link: '/posts/post-12' }
  ],
  'post-11': [
    { title: '7 tips from suppliers about change orders', link: '/posts/post-9' },
    { title: '7 tips from clients about change orders', link: '/posts/post-10' },
    { title: 'Why Change Orders Are Inevitable in Projects', link: '/posts/post-13' }
  ],
  'post-12': [
    { title: '7 tips from project managers about change orders', link: '/posts/post-8' },
    { title: 'Why Change Orders Are Inevitable in Projects', link: '/posts/post-13' },
    { title: 'The Most Common Drivers of Change Orders (and How to Anticipate Them)', link: '/posts/post-14' }
  ],
  'post-13': [
    { title: 'Why Change Order Management Can Make or Break Projects', link: '/posts/post-12' },
    { title: 'The Most Common Drivers of Change Orders (and How to Anticipate Them)', link: '/posts/post-14' },
    { title: 'The Hidden Costs of Unmanaged Change Orders', link: '/posts/post-15' }
  ],
  'post-14': [
    { title: 'Why Change Orders Are Inevitable in Projects', link: '/posts/post-13' },
    { title: 'The Hidden Costs of Unmanaged Change Orders', link: '/posts/post-15' },
    { title: '7 tips from project managers about change orders', link: '/posts/post-8' }
  ],
  'post-15': [
    { title: 'The Most Common Drivers of Change Orders (and How to Anticipate Them)', link: '/posts/post-14' },
    { title: 'Why Change Orders Are Inevitable in Projects', link: '/posts/post-13' },
    { title: '7 tips from clients about change orders', link: '/posts/post-10' }
  ]
};

function createRelatedArticlesSection(articles) {
  return `

<p><b>Related Articles</b></p>

<ul>
${articles.map(article => `<li><a href="${article.link}">${article.title}</a></li>`).join('\n')}
</ul>

<p><i>Want more insights on change order management? <a href="/resources">Download our free Change Order Management toolkit</a> with templates, checklists, and best practices from industry experts.</i></p>`;
}

async function addRelatedArticlesToPosts() {
  try {
    console.log('🔗 Adding related articles sections to blog posts...\n');
    
    const contentDir = './content';
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const postId = path.basename(file, '.md');
      const filePath = path.join(contentDir, file);
      
      // Read current content
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if related articles already exists
      if (content.includes('<p><b>Related Articles</b></p>')) {
        console.log(`⏭️  ${postId}: Related articles already exists, skipping`);
        continue;
      }
      
      // Get related articles for this post
      const articles = relatedArticles[postId];
      if (!articles) {
        console.log(`⚠️  ${postId}: No related articles defined, skipping`);
        continue;
      }
      
      // Add related articles section before the last paragraph (usually Conclusion)
      const relatedSection = createRelatedArticlesSection(articles);
      
      // Find the last <p><b>Conclusion</b></p> and insert before it
      if (content.includes('<p><b>Conclusion</b></p>')) {
        content = content.replace('<p><b>Conclusion</b></p>', relatedSection + '\n\n<p><b>Conclusion</b></p>');
      } else {
        // If no conclusion section, add at the end
        content = content.trim() + relatedSection;
      }
      
      // Write updated content
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${postId}: Added related articles section`);
    }
    
    console.log('\n🎉 Related articles sections added to all posts!');
    
  } catch (error) {
    console.error('❌ Error adding related articles:', error.message || error);
  }
}

addRelatedArticlesToPosts();