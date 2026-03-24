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
}
