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
}
