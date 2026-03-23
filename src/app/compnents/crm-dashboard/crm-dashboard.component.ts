import { Component, OnInit } from '@angular/core';

interface KPI {
  label: string;
  value: string;
  change: string;
}

interface Order {
  id: string;
  customer: string;
  total: string;
  delivery: string;
  status: string;
}

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.css']
})
export class CrmDashboardComponent implements OnInit {
  kpis: KPI[] = [
    { label: 'Revenue (today)', value: 'R 12,480', change: '+8%' },
    { label: 'Orders (24h)', value: '182', change: '+12%' },
    { label: 'New Customers', value: '41', change: '+5%' },
    { label: 'Active Drivers', value: '23', change: 'stable' }
  ];

  orders: Order[] = [
    { id: '#4217', customer: 'Lutho S.', total: 'R 198', delivery: 'Express', status: 'In progress' },
    { id: '#4216', customer: 'Zinhle M.', total: 'R 342', delivery: 'Dine-in', status: 'Ready' },
    { id: '#4215', customer: 'Ayanda K.', total: 'R 157', delivery: 'Pickup', status: 'Completed' },
    { id: '#4214', customer: 'Sipho N.', total: 'R 295', delivery: 'Express', status: 'Cancelled' }
  ];

  customers = [
    { name: 'Lutho S.', orders: 8, status: 'Loyal' },
    { name: 'Zinhle M.', orders: 3, status: 'New' },
    { name: 'Ayanda K.', orders: 11, status: 'VIP' },
    { name: 'Sipho N.', orders: 2, status: 'Returning' }
  ];

  reports = [
    { title: 'Revenue Pulse', description: 'Daily sales vs target with 12% uplift.' },
    { title: 'Driver Status', description: 'All 23 drivers are on shift with 4 on express lanes.' },
    { title: 'Stock Alert', description: 'Sauce stocks low; reorder by 15:00.' }
  ];

  filteredOrders: Order[] = [];
  filteredCustomers: { name: string; orders: number; status: string; }[] = [];
  filteredReports: { title: string; description: string; }[] = [];
  crmSearchTerm = '';
  selectedSection: 'orders' | 'customers' | 'reports' = 'orders';

  ngOnInit(): void {
    this.resetFilters();
  }

  setSection(section: 'orders' | 'customers' | 'reports') {
    this.selectedSection = section;
  }

  applyCrmSearch(): void {
    const term = this.crmSearchTerm.trim().toLowerCase();
    if (!term) {
      this.resetFilters();
      return;
    }

    this.filteredOrders = this.orders.filter(order =>
      `${order.id} ${order.customer} ${order.delivery} ${order.status} ${order.total}`.toLowerCase().includes(term)
    );

    this.filteredCustomers = this.customers.filter(customer =>
      `${customer.name} ${customer.orders} ${customer.status}`.toLowerCase().includes(term)
    );

    this.filteredReports = this.reports.filter(report =>
      `${report.title} ${report.description}`.toLowerCase().includes(term)
    );
  }

  private resetFilters(): void {
    this.filteredOrders = [...this.orders];
    this.filteredCustomers = [...this.customers];
    this.filteredReports = [...this.reports];
  }
}
