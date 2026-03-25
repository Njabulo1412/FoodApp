import { Component } from '@angular/core';

@Component({
  selector: 'app-vision-data',
  templateUrl: './vision-data.component.html',
  styleUrls: ['./vision-data.component.css']
})
export class VisionDataComponent {
  dataJourneySteps = [
    'User visits the website',
    'System tracks behaviour (cookies, session data)',
    'User signs up or interacts',
    'Data stored in the database',
    'CRM processes the captured data',
    'Dashboard surfaces the insights'
  ];

  databaseStructure = [
    { name: 'Customers Table', fields: ['ID', 'Name', 'Email', 'Phone'] },
    { name: 'Behaviour Table', fields: ['Customer ID', 'Page visited', 'Time spent'] },
    { name: 'Transactions Table', fields: ['Customer ID', 'Product', 'Price', 'Date'] },
    { name: 'Feedback Table', fields: ['Customer ID', 'Rating', 'Comment'] }
  ];

  behaviouralDataPoints = [
    'Pages visited',
    'Time spent on site',
    'Clicks (what users interact with)',
    'Search queries',
    'What customers are interested in',
    'What is NOT working'
  ];

  transactionDataPoints = [
    'Purchases',
    'Order value',
    'Products bought',
    'Purchase frequency',
    'Returns or refunds'
  ];

  dashboardHighlights = [
    'Visit, orders, advertiser, and daily sales summary cards',
    'Traffic-source trends (direct, referrals, search, social)',
    'Branch performance list and task manager priorities',
    'Custom widgets for KPIs and urgent follow-ups'
  ];

  sidebarLinks = [
    { icon: '🏠', label: 'Behaviour' },
    { icon: '📊', label: 'Transactional behaviour' },
    { icon: '🗃️', label: 'Database Structure' },
    { icon: '📝', label: 'Surveys' },
    { icon: '🧭', label: 'Data Journal' },
  ];

  insights = [
    { title: 'Top 5 Countries', value: 'R789,915.00', meta: 'Total Revenue', type: 'world' },
    { title: 'Renewal Bookings', value: 'R520.0K', meta: 'Opportunity Value', type: 'gauge' },
    { title: 'Forecasted Trend', value: 'R1,171,633', meta: 'Expected Revenue', type: 'line' },
    { title: 'Opportunities by Region', value: '78', meta: 'Sum of Record ID', type: 'tiles' },
    { title: 'This Quarter Top Reps', value: 'R1.63M', meta: 'Opportunity Value', type: 'bars' },
    { title: 'Bookings vs ASP', value: 'R2.02M', meta: 'Opportunity Value', type: 'bubbles' },
    { title: 'Pipeline Change', value: 'R2,021,461.49', meta: 'Opportunity Value', type: 'steps' },
    { title: 'New Business Funnel', value: 'R1.04M', meta: 'Opportunity Value', type: 'funnel' }
  ];

  lineChartSpecs = {
    revenue: {
      values: [45000, 72000, 128450],
      labels: ['Jan', 'Feb', 'Mar'],
      stroke: '#0f172a'
    },
    satisfaction: {
      values: [4.1, 4.2, 4.3, 4.4],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      stroke: '#047857'
    },
    peak: {
      values: [40, 65, 80, 140, 180, 90],
      labels: ['12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stroke: '#3a7df8'
    },
    frequency: {
      values: [35, 40, 20, 5],
      labels: ['1', '2-3', '4-6', '7+'],
      stroke: '#be123c'
    }
  };

  private readonly chartWidth = 120;
  private readonly chartHeight = 60;
  private readonly chartPadding = 8;

  activeLink = this.sidebarLinks[0];
  activeInsight: string | null = null;
  actionsExpanded = false;

  selectSidebar(link: { icon: string; label: string }): void {
    this.activeLink = link;
  }

  selectInsight(insight: { title: string; type: string }): void {
    this.activeInsight = insight.title;
  }

  toggleActions(): void {
    this.actionsExpanded = !this.actionsExpanded;
  }

  getLineChartPoints(values: number[]): { x: number; y: number; value: number }[] {
    const plotWidth = this.chartWidth - this.chartPadding * 2;
    const plotHeight = this.chartHeight - this.chartPadding * 2;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const step = values.length > 1 ? plotWidth / (values.length - 1) : plotWidth;

    return values.map((value, index) => {
      const x = this.chartPadding + index * step;
      const normalized = (value - min) / range;
      const y = this.chartPadding + plotHeight - normalized * plotHeight;
      return { x, y, value };
    });
  }

  buildPolyline(points: { x: number; y: number }[]): string {
    return points.map(point => `${point.x},${point.y}`).join(' ');
  }

  formatChartValue(chartKey: keyof VisionDataComponent['lineChartSpecs'], value: number): string {
    if (chartKey === 'revenue') {
      return `R ${value.toLocaleString('en-ZA')}`;
    }
    if (chartKey === 'satisfaction') {
      return value.toFixed(1);
    }
    if (chartKey === 'peak') {
      return `${value}`;
    }
    if (chartKey === 'frequency') {
      return `${value}%`;
    }
    return value.toString();
  }
}
