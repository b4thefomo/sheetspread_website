const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
require('dotenv').config();

class AIChartGenerator {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
    this.chartsDir = path.join(process.cwd(), 'public', 'resources', 'charts');
  }

  async generateChartsWithAI(postSlug) {
    const postPath = path.join(this.contentDir, `${postSlug}.md`);

    if (!fs.existsSync(postPath)) {
      console.log(`❌ Post file not found: ${postPath}`);
      return false;
    }

    try {
      const fileContent = fs.readFileSync(postPath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Check if charts already exist
      if (content.includes('<!-- charts-generated -->')) {
        console.log(`ℹ️ ${postSlug} already has AI-generated charts`);
        return false;
      }

      console.log(`🤖 Using AI to analyze content and generate charts for ${postSlug}...`);

      // Initialize Gemini
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Analyze content for chart opportunities
      const analysisPrompt = `Analyze this blog post content and identify the 2 most impactful data visualizations that would enhance reader understanding.

Content:
${content.substring(0, 3000)}

For each chart, provide a JSON response with:
1. Chart type (donut, bar, timeline, comparison, or process-flow)
2. Title (clear, specific to the content)
3. Data points with meaningful labels from the actual content
4. Placement (early, mid-article, or late)
5. Why this chart adds value

Return ONLY valid JSON in this exact format:
{
  "charts": [
    {
      "type": "donut|bar|timeline|comparison|process-flow",
      "title": "Specific descriptive title",
      "placement": "early|mid-article|late",
      "value": "Why this visualization helps readers",
      "data": [
        {
          "label": "Actual label from content",
          "value": number or "date string",
          "description": "Optional context"
        }
      ]
    }
  ]
}

Focus on:
- Real statistics and data mentioned in the content
- Process steps or workflows described
- Timelines or milestones mentioned
- Before/after comparisons
- Performance metrics or KPIs

Make labels specific to construction/change orders context.`;

      const chartAnalysis = await model.generateContent(analysisPrompt);
      const analysisText = chartAnalysis.response.text();

      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.log('⚠️ Could not parse AI response for charts');
        return false;
      }

      const chartData = JSON.parse(jsonMatch[0]);

      if (!chartData.charts || chartData.charts.length === 0) {
        console.log('⚠️ No suitable chart data found in content');
        return false;
      }

      console.log(`📊 AI identified ${chartData.charts.length} charts to create`);

      let updatedContent = content;
      let chartsAdded = 0;

      // Generate HTML for each chart
      for (const chart of chartData.charts) {
        console.log(`  - Creating ${chart.type} chart: ${chart.title}`);

        const chartHtml = this.generateChartHTML(chart, postSlug);
        const insertPoint = this.findInsertionPoint(updatedContent, chart.placement);

        const beforeChart = updatedContent.substring(0, insertPoint);
        const afterChart = updatedContent.substring(insertPoint);

        updatedContent = beforeChart + '\n\n' + chartHtml + '\n' + afterChart;
        chartsAdded++;
      }

      if (chartsAdded > 0) {
        // Add marker to show charts were generated
        updatedContent = '<!-- charts-generated -->\n' + updatedContent;

        // Add Chart.js CDN if not present
        if (!updatedContent.includes('chart.js')) {
          const chartjsCdn = `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;
          updatedContent = chartjsCdn + '\n\n' + updatedContent;
        }

        // Save updated content
        const updatedFile = matter.stringify(updatedContent, data);
        fs.writeFileSync(postPath, updatedFile);

        console.log(`✅ Added ${chartsAdded} AI-generated chart(s) to ${postSlug}`);

        // Save chart data for reference
        const chartDataPath = path.join(this.chartsDir, postSlug, 'chart-data.json');
        if (!fs.existsSync(path.dirname(chartDataPath))) {
          fs.mkdirSync(path.dirname(chartDataPath), { recursive: true });
        }
        fs.writeFileSync(chartDataPath, JSON.stringify(chartData, null, 2));

        return true;
      }

      return false;

    } catch (error) {
      console.error(`❌ Error generating AI charts for ${postSlug}:`, error.message);
      return false;
    }
  }

  generateChartHTML(chart, postSlug) {
    const chartId = `chart-${postSlug}-${Date.now()}`;

    switch (chart.type) {
      case 'donut':
        return this.generateDonutChart(chart, chartId);
      case 'bar':
        return this.generateBarChart(chart, chartId);
      case 'timeline':
        return this.generateTimelineChart(chart, chartId);
      case 'comparison':
        return this.generateComparisonChart(chart, chartId);
      case 'process-flow':
        return this.generateProcessFlowChart(chart, chartId);
      default:
        return this.generateBarChart(chart, chartId);
    }
  }

  generateDonutChart(chart, chartId) {
    const values = chart.data.map(d => d.value);
    const labels = chart.data.map(d => d.label);

    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0;">📊 ${chart.title}</h4>
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
            backgroundColor: ['#FF6600', '#0891b2', '#64748b', '#f59e0b', '#10b981'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 15,
                font: { size: 12 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.parsed + '%';
                }
              }
            }
          }
        }
      });
    }
  </script>
</div>`;
  }

  generateBarChart(chart, chartId) {
    const values = chart.data.map(d => d.value);
    const labels = chart.data.map(d => d.label);

    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">📈 ${chart.title}</h4>
  <div style="width: 100%; max-width: 600px; margin: 0 auto;">
    <canvas id="${chartId}"></canvas>
  </div>
  <script>
    if (typeof Chart !== 'undefined') {
      const ctx${chartId} = document.getElementById('${chartId}').getContext('2d');
      new Chart(ctx${chartId}, {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(labels)},
          datasets: [{
            label: 'Value',
            data: ${JSON.stringify(values)},
            backgroundColor: '#FF6600',
            borderColor: '#FF6600',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.parsed.y + '%';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          }
        }
      });
    }
  </script>
</div>`;
  }

  generateTimelineChart(chart, chartId) {
    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">📅 ${chart.title}</h4>
  <div style="position: relative; padding: 20px 0;">
    ${chart.data.map((item, index) => `
      <div style="display: flex; align-items: flex-start; margin-bottom: 20px; position: relative;">
        <div style="width: 120px; text-align: right; padding-right: 20px; font-weight: bold; color: #0891b2; font-size: 14px;">
          ${item.label}
        </div>
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #FF6600; margin-right: 20px; margin-top: 2px; box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #FF6600;"></div>
        <div style="flex: 1; padding: 12px; background: #ffffff; border-left: 3px solid #FF6600; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="color: #1e293b; font-size: 14px; line-height: 1.5;">
            ${item.description || item.value}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
  }

  generateComparisonChart(chart, chartId) {
    const maxValue = Math.max(...chart.data.map(d => d.value));

    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">📊 ${chart.title}</h4>
  <div style="display: flex; justify-content: space-around; align-items: end; height: 250px; padding: 20px;">
    ${chart.data.map((item, index) => {
      const barHeight = (item.value / maxValue) * 180;
      const color = index % 2 === 0 ? '#FF6600' : '#0891b2';
      return `
        <div style="text-align: center; flex: 1; max-width: 120px;">
          <div style="width: 80%; margin: 0 auto; height: ${barHeight}px; background: linear-gradient(to top, ${color}, ${color}dd); margin-bottom: 10px; border-radius: 4px 4px 0 0; display: flex; align-items: end; justify-content: center; color: white; font-weight: bold; padding-bottom: 8px; font-size: 16px;">
            ${item.value}${typeof item.value === 'number' ? '%' : ''}
          </div>
          <div style="font-size: 13px; color: #1e293b; font-weight: 600;">
            ${item.label}
          </div>
        </div>
      `;
    }).join('')}
  </div>
</div>`;
  }

  generateProcessFlowChart(chart, chartId) {
    return `
<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 32px 0;">
  <h4 style="color: #0891b2; margin: 0 0 20px 0; text-align: center;">⚙️ ${chart.title}</h4>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
    ${chart.data.map((step, index) => `
      <div style="flex: 1; min-width: 180px; text-align: center;">
        <div style="background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%); color: white; padding: 16px; border-radius: 10px; margin-bottom: 12px; position: relative; box-shadow: 0 4px 8px rgba(255, 102, 0, 0.3);">
          <div style="position: absolute; top: -8px; left: 8px; background: #0891b2; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${index + 1}
          </div>
          <div style="margin-top: 8px; font-weight: bold; font-size: 14px;">
            ${step.label}
          </div>
        </div>
        <div style="color: #1e293b; font-size: 13px; line-height: 1.4; padding: 0 8px;">
          ${step.description || ''}
        </div>
      </div>
      ${index < chart.data.length - 1 ? `
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
      return sections[0].index + sections[0][0].length;
    } else if (placement === 'mid-article' && sections.length >= 2) {
      return sections[1].index + sections[1][0].length;
    } else if (placement === 'late' && sections.length >= 3) {
      return sections[sections.length - 2].index + sections[sections.length - 2][0].length;
    } else if (sections.length >= 1) {
      return sections[0].index + sections[0][0].length;
    }

    // Fallback: before conclusion
    if (content.includes('<p><b>Conclusion</b></p>')) {
      return content.indexOf('<p><b>Conclusion</b></p>');
    }

    return Math.floor(content.length * 0.4);
  }
}

// Main execution
async function main() {
  const command = process.argv[2];
  const postSlug = process.argv[3];

  const generator = new AIChartGenerator();

  if (command === 'generate' && postSlug) {
    console.log(`🚀 Generating AI-powered charts for ${postSlug}...\n`);
    await generator.generateChartsWithAI(postSlug);
  } else {
    console.log('Usage: node scripts/generateAICharts.js generate [post-slug]');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { AIChartGenerator };