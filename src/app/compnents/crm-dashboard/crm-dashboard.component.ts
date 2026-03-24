import { Component } from '@angular/core';

interface SummaryCard {
  label: string;
  value: string;
  meta: string;
}

interface Task {
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  status: string;
  owner: string;
}

interface Branch {
  name: string;
  location: string;
  uptime: string;
}

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.css']
})
export class CrmDashboardComponent {
  summaryCards: SummaryCard[] = [
    { label: 'Visits', value: '15,487', meta: 'Up 12% vs last week' },
    { label: 'Orders', value: '4,689', meta: 'Avg 48 per hour' },
    { label: 'Advertisers', value: '546', meta: '8 new this week' },
    { label: 'Daily Sales', value: 'R 800k', meta: 'On track' }
  ];

  trafficSources = [
    { label: 'Direct', percent: '43%', color: '#3a7df8' },
    { label: 'Referrals', percent: '27%', color: '#f27474' },
    { label: 'Search', percent: '19%', color: '#f2ac3a' },
    { label: 'Social', percent: '11%', color: '#5fdcca' }
  ];

  tasks: Task[] = [
    { name: 'Update loyalty flow', priority: 'High', due: 'Apr 11', status: 'In Progress', owner: 'Joshua' },
    { name: 'Automate CRM sync', priority: 'Medium', due: 'Apr 12', status: 'Ready', owner: 'Andile' },
    { name: 'Review call queue', priority: 'Low', due: 'Apr 15', status: 'Planned', owner: 'Lineo' },
    { name: 'Set promo alert', priority: 'High', due: 'Apr 13', status: 'Escalated', owner: 'Nala' }
  ];

  branches: Branch[] = [
    { name: 'Morningside', location: 'Durban', uptime: '98%' },
    { name: 'Braamfontein', location: 'Johannesburg', uptime: '96%' },
    { name: 'Belville', location: 'Cape Town', uptime: '99%' },
    { name: 'George', location: 'Garden Route', uptime: '95%' },
    { name: 'Rustenburg', location: 'North West', uptime: '97%' }
  ];

  trafficTimeline = ['2018', '2019', '2020', '2021', '2022', '2023'];
}
