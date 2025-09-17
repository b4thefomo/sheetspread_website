interface ChartData {
  type: 'bar' | 'donut' | 'timeline' | 'comparison' | 'process-flow';
  title: string;
  data: any[];
  labels?: string[];
  colors?: string[];
}

interface ChartOptions {
  width?: number;
  height?: number;
  responsive?: boolean;
  theme?: 'construction' | 'default';
}

export class ChartGenerator {
  private constructionColors = {
    primary: '#FF6600',
    secondary: '#0891b2',
    accent: '#64748b',
    background: '#f8fafc',
    text: '#1e293b'
  };

  generateBarChart(data: ChartData, options: ChartOptions = {}): string {
    const { width = 600, height = 400, theme = 'construction' } = options;
    const colors = theme === 'construction' ? this.constructionColors : {};

    return `
      <div class="chart-container" style="width: 100%; max-width: ${width}px; margin: 0 auto;">
        <canvas id="chart-${Date.now()}" width="${width}" height="${height}"></canvas>
        <script>
          const ctx = document.getElementById('chart-${Date.now()}').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ${JSON.stringify(data.labels)},
              datasets: [{
                label: '${data.title}',
                data: ${JSON.stringify(data.data)},
                backgroundColor: '${colors.primary || '#3b82f6'}',
                borderColor: '${colors.secondary || '#1d4ed8'}',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: '${data.title}',
                  color: '${colors.text || '#1f2937'}'
                }
              }
            }
          });
        </script>
      </div>`;
  }

  generateDonutChart(data: ChartData, options: ChartOptions = {}): string {
    const { width = 400, height = 400, theme = 'construction' } = options;
    const colors = theme === 'construction' ? this.constructionColors : {};

    return `
      <div class="chart-container" style="width: 100%; max-width: ${width}px; margin: 0 auto;">
        <canvas id="chart-${Date.now()}" width="${width}" height="${height}"></canvas>
        <script>
          const ctx = document.getElementById('chart-${Date.now()}').getContext('2d');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ${JSON.stringify(data.labels)},
              datasets: [{
                data: ${JSON.stringify(data.data)},
                backgroundColor: ['${colors.primary}', '${colors.secondary}', '${colors.accent}'],
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: '${data.title}',
                  color: '${colors.text || '#1f2937'}'
                },
                legend: {
                  position: 'bottom'
                }
              }
            }
          });
        </script>
      </div>`;
  }

  generateTimelineChart(data: ChartData, options: ChartOptions = {}): string {
    const { width = 800, height = 300, theme = 'construction' } = options;
    const colors = theme === 'construction' ? this.constructionColors : {};

    return `
      <div class="timeline-chart" style="width: 100%; max-width: ${width}px; margin: 0 auto; padding: 20px;">
        <h3 style="text-align: center; color: ${colors.text}; margin-bottom: 20px;">${data.title}</h3>
        <div style="position: relative; padding: 20px 0;">
          ${data.data.map((item: any, index: number) => `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="width: 120px; text-align: right; padding-right: 20px; font-weight: bold; color: ${colors.secondary};">
                ${item.date}
              </div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${colors.primary}; margin-right: 20px;"></div>
              <div style="flex: 1; padding: 10px; background: ${colors.background}; border-left: 3px solid ${colors.primary}; border-radius: 4px;">
                ${item.event}
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  generateComparisonChart(data: ChartData, options: ChartOptions = {}): string {
    const { width = 600, height = 400, theme = 'construction' } = options;
    const colors = theme === 'construction' ? this.constructionColors : {};

    return `
      <div class="comparison-chart" style="width: 100%; max-width: ${width}px; margin: 0 auto; padding: 20px;">
        <h3 style="text-align: center; color: ${colors.text}; margin-bottom: 30px;">${data.title}</h3>
        <div style="display: flex; justify-content: space-around; align-items: end; height: ${height}px; border-bottom: 2px solid ${colors.accent}; padding: 20px;">
          ${data.data.map((item: any, index: number) => {
            const barHeight = (item.value / Math.max(...data.data.map((d: any) => d.value))) * (height - 100);
            return `
              <div style="text-align: center;">
                <div style="width: 80px; height: ${barHeight}px; background: linear-gradient(to top, ${colors.primary}, ${colors.secondary}); margin-bottom: 10px; border-radius: 4px 4px 0 0; display: flex; align-items: end; justify-content: center; color: white; font-weight: bold; padding-bottom: 10px;">
                  ${item.value}${item.unit || ''}
                </div>
                <div style="font-size: 14px; color: ${colors.text}; max-width: 80px; word-wrap: break-word;">
                  ${item.label}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>`;
  }

  generateProcessFlow(data: ChartData, options: ChartOptions = {}): string {
    const { width = 800, theme = 'construction' } = options;
    const colors = theme === 'construction' ? this.constructionColors : {};

    return `
      <div class="process-flow" style="width: 100%; max-width: ${width}px; margin: 0 auto; padding: 20px;">
        <h3 style="text-align: center; color: ${colors.text}; margin-bottom: 30px;">${data.title}</h3>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          ${data.data.map((step: any, index: number) => `
            <div style="flex: 1; min-width: 150px; text-align: center;">
              <div style="background: ${colors.primary}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; position: relative;">
                <div style="position: absolute; top: 5px; left: 5px; background: white; color: ${colors.primary}; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">
                  ${index + 1}
                </div>
                <div style="margin-top: 15px; font-weight: bold;">
                  ${step.title}
                </div>
              </div>
              <div style="color: ${colors.text}; font-size: 14px;">
                ${step.description}
              </div>
            </div>
            ${index < data.data.length - 1 ? `
              <div style="color: ${colors.secondary}; font-size: 24px; margin: 0 10px;">
                →
              </div>
            ` : ''}
          `).join('')}
        </div>
      </div>`;
  }

  extractChartableData(content: string): ChartData[] {
    const chartableData: ChartData[] = [];

    // Extract statistics and percentages
    const percentageMatches = content.match(/(\d+(?:\.\d+)?%)/g);
    if (percentageMatches && percentageMatches.length >= 2) {
      chartableData.push({
        type: 'donut',
        title: 'Key Statistics',
        data: percentageMatches.slice(0, 3).map(p => parseFloat(p.replace('%', ''))),
        labels: ['Metric 1', 'Metric 2', 'Metric 3']
      });
    }

    // Extract process steps
    const stepMatches = content.match(/\d+\.\s+([^.]+)/g);
    if (stepMatches && stepMatches.length >= 3) {
      chartableData.push({
        type: 'process-flow',
        title: 'Process Steps',
        data: stepMatches.slice(0, 5).map((step, index) => ({
          title: `Step ${index + 1}`,
          description: step.replace(/^\d+\.\s+/, '').substring(0, 50) + '...'
        }))
      });
    }

    // Extract timeline information (dates)
    const dateMatches = content.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/g);
    if (dateMatches && dateMatches.length >= 2) {
      chartableData.push({
        type: 'timeline',
        title: 'Timeline',
        data: dateMatches.map(date => ({
          date: date,
          event: 'Key milestone or deadline'
        }))
      });
    }

    return chartableData;
  }

  generateChart(data: ChartData, options: ChartOptions = {}): string {
    switch (data.type) {
      case 'bar':
        return this.generateBarChart(data, options);
      case 'donut':
        return this.generateDonutChart(data, options);
      case 'timeline':
        return this.generateTimelineChart(data, options);
      case 'comparison':
        return this.generateComparisonChart(data, options);
      case 'process-flow':
        return this.generateProcessFlow(data, options);
      default:
        return this.generateBarChart(data, options);
    }
  }
}

export default ChartGenerator;