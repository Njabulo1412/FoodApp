import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

interface KPI {
  label: string;
  value: string;
  change: string;
}

interface CrmOrder {
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
export class CrmDashboardComponent implements OnInit, OnDestroy {
  kpis: KPI[] = [
    { label: 'Revenue (today)', value: 'R 12,480', change: '+8%' },
    { label: 'Orders (24h)', value: '182', change: '+12%' },
    { label: 'New Customers', value: '41', change: '+5%' },
    { label: 'Active Drivers', value: '23', change: 'stable' }
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

  private readonly baselineOrders: CrmOrder[] = [
    { id: '#4217', customer: 'Lutho S.', total: 'R 198', delivery: 'Express', status: 'In progress' },
    { id: '#4216', customer: 'Zinhle M.', total: 'R 342', delivery: 'Dine-in', status: 'Ready' },
    { id: '#4215', customer: 'Ayanda K.', total: 'R 157', delivery: 'Pickup', status: 'Completed' },
    { id: '#4214', customer: 'Sipho N.', total: 'R 295', delivery: 'Express', status: 'Cancelled' }
  ];

  crmOrders: CrmOrder[] = [...this.baselineOrders];
  filteredOrders: CrmOrder[] = [...this.baselineOrders];
  filteredCustomers: { name: string; orders: number; status: string; }[] = [...this.customers];
  filteredReports: { title: string; description: string; }[] = [...this.reports];

  crmSearchTerm = '';
  selectedSection: 'orders' | 'customers' | 'reports' = 'orders';

  private readonly subscriptions = new Subscription();

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.resetFilters();
    this.subscriptions.add(this.orderService.getOrders().subscribe({
      next: (orders) => {
        const liveOrders = orders.map(order => this.mapOrderToCrm(order));
        this.crmOrders = [...liveOrders, ...this.baselineOrders];
        this.resetFilters();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setSection(section: 'orders' | 'customers' | 'reports'): void {
    this.selectedSection = section;
  }

  applyCrmSearch(): void {
    const term = this.crmSearchTerm.trim().toLowerCase();
    if (!term) {
      this.resetFilters();
      return;
    }

    this.filteredOrders = this.crmOrders.filter(order =>
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
    this.filteredOrders = [...this.crmOrders];
    this.filteredCustomers = [...this.customers];
    this.filteredReports = [...this.reports];
  }

  private mapOrderToCrm(order: Order): CrmOrder {
    const customerName = this.getCustomerName(order.userId);
    const totalAmount = order.totalAmount || 0;
    return {
      id: order.id ?? 'N/A',
      customer: customerName,
      total: `R ${totalAmount.toFixed(2)}`,
      delivery: this.formatDelivery(order.deliveryType),
      status: this.formatStatus(order.status)
    };
  }

  private getCustomerName(userId?: string): string {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && userId && currentUser.id === userId) {
      return `${currentUser.firstName ?? ''} ${currentUser.lastName ?? ''}`.trim() || 'Guest';
    }
    return 'Guest';
  }

  private formatDelivery(type: 'home-delivery' | 'click-collect'): string {
    return type === 'home-delivery' ? 'Home delivery' : 'Click & Collect';
  }

  private formatStatus(status: OrderStatus): string {
    switch (status) {
      case 'pending':
      case 'preparing':
        return 'In progress';
      case 'confirmed':
      case 'ready':
        return 'Ready';
      case 'delivered':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  }
}
