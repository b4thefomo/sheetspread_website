const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

class ChartEmbedder {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
    this.chartsDir = path.join(process.cwd(), 'public', 'resources', 'charts');
  }

  extractChartableData(content) {
    const chartableData = [];

    // Extract percentages and statistics
    const percentagePattern = /(\d+(?:\.\d+)?%)/g;
    const percentages = [...content.matchAll(percentagePattern)];

    if (percentages.length >= 2) {
      const stats = percentages.slice(0, 3).map(match => ({
        value: parseFloat(match[1].replace('%', '')),
        label: this.extractContextLabel(content, match.index)
      }));

      chartableData.push({
        type: 'donut',
        title: 'Key Performance Metrics',
        data: stats,
        placement: 'mid-article'
      });
    }

    // Extract comparison data (before/after, vs scenarios)
    const comparisonPattern = /(increased|decreased|improved|reduced|from)\s+(\d+(?:\.\d+)?%?)\s+(?:to|by)\s+(\d+(?:\.\d+)?%?)/gi;
    const comparisons = [...content.matchAll(comparisonPattern)];

    if (comparisons.length >= 1) {
      const compData = comparisons.slice(0, 2).map(match => [
        { label: 'Before', value: parseFloat(match[2].replace('%', '')) },
        { label: 'After', value: parseFloat(match[3].replace('%', '')) }
      ]).flat();

      chartableData.push({
        type: 'comparison',
        title: 'Performance Improvement',
        data: compData,
        placement: 'early'
      });
    }

    // Extract timeline data (months, dates)
    const timelinePattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/g;
    const dates = [...content.matchAll(timelinePattern)];

    if (dates.length >= 2) {
      const timeline = dates.slice(0, 4).map(match => ({
        date: `${match[1]} ${match[2]}`,
        event: this.extractTimelineEvent(content, match.index)
      }));

      chartableData.push({
        type: 'timeline',
        title: 'Implementation Timeline',
        data: timeline,
        placement: 'early'
      });
    }

    // Extract process steps
    const stepPattern = /(?:^|\n)\s*\d+[\.\)]\s+([^\n]+)/g;
    const steps = [...content.matchAll(stepPattern)];

    if (steps.length >= 3) {
      const processSteps = steps.slice(0, 5).map((match, index) => ({
        title: `Step ${index + 1}`,
        description: match[1].substring(0, 60) + (match[1].length > 60 ? '...' : '')
      }));

      chartableData.push({
        type: 'process-flow',
        title: 'Implementation Process',
        data: processSteps,
        placement: 'mid-article'
      });
    }

    return chartableData;
  }

  extractContextLabel(content, index) {
    // Extract surrounding text to create meaningful labels
    const before = content.substring(Math.max(0, index - 100), index);
    const words = before.split(' ').slice(-5);
    return words.join(' ').replace(/[^\w\s]/g, '').trim() || 'Metric';
  }

  extractTimelineEvent(content, index) {
    // Extract event description around the date
    const after = content.substring(index, index + 150);
    const sentence = after.split('.')[0];
    return sentence.replace(/^[^a-zA-Z]+/, '').substring(0, 80) + '...';
  }

  generateChartHtml(chartData, postSlug) {
    const chartId = `chart-${postSlug}-${Date.now()}`;

    switch (chartData.type) {
      case 'donut':
        return this.generateDonutChart(chartData, chartId);
      case 'comparison':
        return this.generateComparisonChart(chartData, chartId);
      case 'timeline':
        return this.generateTimelineChart(chartData, chartId);
      case 'process-flow':
        return this.generateProcessFlowChart(chartData, chartId);
      default:
        return this.generateBarChart(chartData, chartId);
    }
  }

  generateDonutChart(data, chartId) {
    const values = data.data.map(d => d.value);
    const labels = data.data.map(d => d.label);

    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0;">📊 ${data.title}</h4>
  <div style="width: 300px; height: 300px; margin: 0 auto; position: relative;">
    <canvas id="${chartId}" width="300" height="300"></canvas>
  </div>
  <script>
    if (typeof Chart !== 'undefined') {
      const ctx${chartId} = document.getElementById('${chartId}').getContext('2d');
      new Chart(ctx${chartId}, {
        type: 'doughnut',
        data: {
          labels: ${JSON.stringify(labels)},
          datasets: [{
            data: ${JSON.stringify(values)},
            backgroundColor: ['#FF6600', '#0891b2', '#64748b', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { boxWidth: 12, padding: 15 }
            }
          }
        }
      });
    }
  </script>
</div>`;
  }

  generateComparisonChart(data, chartId) {
    const maxValue = Math.max(...data.data.map(d => d.value));

    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">📈 ${data.title}</h4>
  <div style="display: flex; justify-content: space-around; align-items: end; height: 250px; padding: 20px;">
    ${data.data.map(item => {
      const barHeight = (item.value / maxValue) * 180;
      return `
        <div style="text-align: center;">
          <div style="width: 80px; height: ${barHeight}px; background: linear-gradient(to top, #FF6600, #0891b2); margin-bottom: 10px; border-radius: 4px 4px 0 0; display: flex; align-items: end; justify-content: center; color: white; font-weight: bold; padding-bottom: 8px; font-size: 14px;">
            ${item.value}%
          </div>
          <div style="font-size: 14px; color: #1e293b; font-weight: 500;">
            ${item.label}
          </div>
        </div>
      `;
    }).join('')}
  </div>
</div>`;
  }

  generateTimelineChart(data, chartId) {
    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">📅 ${data.title}</h4>
  <div style="position: relative; padding: 20px 0;">
    ${data.data.map((item, index) => `
      <div style="display: flex; align-items: flex-start; margin-bottom: 20px; position: relative;">
        <div style="width: 100px; text-align: right; padding-right: 20px; font-weight: bold; color: #0891b2; font-size: 14px;">
          ${item.date}
        </div>
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #FF6600; margin-right: 20px; margin-top: 2px; box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #FF6600;"></div>
        <div style="flex: 1; padding: 12px; background: #ffffff; border-left: 3px solid #FF6600; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="color: #1e293b; font-size: 14px; line-height: 1.5;">
            ${item.event}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
  }

  generateProcessFlowChart(data, chartId) {
    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">⚙️ ${data.title}</h4>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
    ${data.data.map((step, index) => `
      <div style="flex: 1; min-width: 160px; text-align: center;">
        <div style="background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%); color: white; padding: 16px; border-radius: 10px; margin-bottom: 12px; position: relative; box-shadow: 0 4px 8px rgba(255, 102, 0, 0.3);">
          <div style="position: absolute; top: -8px; left: 8px; background: #0891b2; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${index + 1}
          </div>
          <div style="margin-top: 8px; font-weight: bold; font-size: 14px;">
            ${step.title}
          </div>
        </div>
        <div style="color: #1e293b; font-size: 13px; line-height: 1.4; padding: 0 8px;">
          ${step.description}
        </div>
      </div>
      ${index < data.data.length - 1 ? `
        <div style="color: #0891b2; font-size: 20px; font-weight: bold; margin: 0 5px;">
          →
        </div>
      ` : ''}
    `).join('')}
  </div>
</div>`;
  }

  findInsertionPoint(content, placement) {
    const sectionPattern = /<p><b>[^<]+<\/b><\/p>/g;
    const sections = [...content.matchAll(sectionPattern)];

    if (placement === 'early' && sections.length >= 1) {
      // Insert after first section
      return sections[0].index + sections[0][0].length;
    } else if (placement === 'mid-article' && sections.length >= 2) {
      // Insert after second section
      return sections[1].index + sections[1][0].length;
    } else if (sections.length >= 1) {
      // Default to after first section
      return sections[0].index + sections[0][0].length;
    }

    // Fallback: insert before conclusion or related articles
    if (content.includes('<p><b>Conclusion</b></p>')) {
      return content.indexOf('<p><b>Conclusion</b></p>');
    } else if (content.includes('<p><b>Related Articles</b></p>')) {
      return content.indexOf('<p><b>Related Articles</b></p>');
    }

    // Last resort: insert at 40% through content
    return Math.floor(content.length * 0.4);
  }

  addChartsToPost(postSlug) {
    const postPath = path.join(this.contentDir, `${postSlug}.md`);

    if (!fs.existsSync(postPath)) {
      console.log(`❌ Post file not found: ${postPath}`);
      return false;
    }

    try {
      const fileContent = fs.readFileSync(postPath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Check if charts already exist
      if (content.includes('📊') || content.includes('📈') || content.includes('📅') || content.includes('⚙️')) {
        console.log(`ℹ️ ${postSlug} already has charts`);
        return false;
      }

      // Extract chartable data from content
      const chartableData = this.extractChartableData(content);

      if (chartableData.length === 0) {
        console.log(`⚠️ No chartable data found in ${postSlug}`);
        return false;
      }

      let updatedContent = content;
      let chartsAdded = 0;

      // Sort by placement priority (early first, then mid-article)
      chartableData.sort((a, b) => {
        const order = { 'early': 1, 'mid-article': 2, 'late': 3 };
        return order[a.placement] - order[b.placement];
      });

      // Add up to 2 charts maximum to avoid overwhelming the post
      const chartsToAdd = chartableData.slice(0, 2);

      for (const chartData of chartsToAdd) {
        const chartHtml = this.generateChartHtml(chartData, postSlug);
        const insertPoint = this.findInsertionPoint(updatedContent, chartData.placement);

        const beforeChart = updatedContent.substring(0, insertPoint);
        const afterChart = updatedContent.substring(insertPoint);

        updatedContent = beforeChart + '\n\n' + chartHtml + '\n' + afterChart;
        chartsAdded++;

        console.log(`  ✅ Added ${chartData.type} chart: ${chartData.title}`);
      }

      if (chartsAdded > 0) {
        // Add Chart.js CDN if not already present
        if (!updatedContent.includes('chart.js')) {
          const chartjsCdn = `
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;
          updatedContent = chartjsCdn + '\n\n' + updatedContent;
        }

        // Save the updated file
        const updatedFile = matter.stringify(updatedContent, data);
        fs.writeFileSync(postPath, updatedFile);
        console.log(`✅ Added ${chartsAdded} chart(s) to ${postSlug}`);
        return true;
      } else {
        console.log(`ℹ️ No charts added to ${postSlug}`);
        return false;
      }

    } catch (error) {
      console.error(`❌ Error processing ${postSlug}:`, error.message);
      return false;
    }
  }

  processAllPosts() {
    if (!fs.existsSync(this.contentDir)) {
      console.log('❌ Content directory not found');
      return;
    }

    const posts = fs.readdirSync(this.contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.basename(file, '.md'))
      .sort();

    console.log(`📊 Found ${posts.length} posts to process for chart integration`);
    console.log('🔄 Adding charts to blog posts...\n');

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    posts.forEach(postSlug => {
      console.log(`📄 Processing ${postSlug}...`);

      const result = this.addChartsToPost(postSlug);
      if (result === true) {
        updated++;
      } else if (result === false) {
        skipped++;
      } else {
        errors++;
      }

      console.log('');
    });

    console.log('🎉 Chart integration complete!');
    console.log(`📊 Summary:`);
    console.log(`  - Total posts: ${posts.length}`);
    console.log(`  - Updated: ${updated}`);
    console.log(`  - Skipped: ${skipped}`);
    console.log(`  - Errors: ${errors}`);
  }

  processSpecificPost(postSlug) {
    console.log(`🎯 Adding charts to specific post: ${postSlug}\n`);

    const result = this.addChartsToPost(postSlug);
    if (result === true) {
      console.log('\n✅ Successfully added charts to post');
    } else {
      console.log('\n⚠️ Post was not updated');
    }
  }
}

// Main execution
async function main() {
  const command = process.argv[2] || 'add-all';
  const embedder = new ChartEmbedder();

  switch (command) {
    case 'add-all':
      embedder.processAllPosts();
      break;

    case 'add-post':
      const postSlug = process.argv[3];
      if (!postSlug) {
        console.log('❌ Please provide a post slug');
        console.log('Usage: node scripts/addChartEmbeds.js add-post post-15');
        return;
      }
      embedder.processSpecificPost(postSlug);
      break;

    default:
      console.log('Usage:');
      console.log('  node scripts/addChartEmbeds.js add-all         # Add charts to all posts');
      console.log('  node scripts/addChartEmbeds.js add-post [slug] # Add charts to specific post');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ChartEmbedder };