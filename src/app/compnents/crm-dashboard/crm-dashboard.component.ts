import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

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

interface LiveOrderStatus {
  label: string;
  statusKeys: OrderStatus[];
  description: string;
  count: number;
}

type ActiveTab = 'dashboard' | 'orders-in' | 'processing' | 'ready' | 'authentication';

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.css']
})
export class CrmDashboardComponent implements OnInit, OnDestroy {
  summaryCards: SummaryCard[] = [
    { label: 'Visits', value: '15,487', meta: 'Up 12% vs last week' },
    { label: 'Orders', value: '0', meta: 'Awaiting new activity' },
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
  orders: Order[] = [];
  liveOrderStatuses: LiveOrderStatus[] = [
    {
      label: 'Order In',
      statusKeys: ['pending'],
      description: 'New order just entered the queue.',
      count: 0
    },
    {
      label: 'Processing',
      statusKeys: ['confirmed', 'preparing'],
      description: 'Kitchen is prepping and plating.',
      count: 0
    },
    {
      label: 'Ready',
      statusKeys: ['ready'],
      description: 'Awaiting pickup or out for delivery.',
      count: 0
    }
  ];

  private orderSub: Subscription | null = null;
  activeTab: ActiveTab = 'dashboard';
  currentFilteredOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderSub = this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.refreshLiveStatuses();
      this.updateOrderSummaryCard();
      this.updateFilteredOrders();
    });
  }

  ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

  get latestOrders(): Order[] {
    return [...this.orders]
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 4);
  }

  orderStatusClass(status: OrderStatus): string {
    if (status === 'ready') {
      return 'status-pill ready';
    }
    if (status === 'preparing' || status === 'confirmed') {
      return 'status-pill processing';
    }
    return 'status-pill order-in';
  }

  getDisplayLabel(status: OrderStatus): string {
    const mapping: Record<OrderStatus, string> = {
      pending: 'Order In',
      confirmed: 'Confirmed',
      preparing: 'Processing',
      ready: 'Ready',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return mapping[status] || status;
  }

  private refreshLiveStatuses(): void {
    const statusCounts = this.orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] ?? 0) + 1;
      return acc;
    }, {} as Record<OrderStatus, number>);

    this.liveOrderStatuses = this.liveOrderStatuses.map(status => ({
      ...status,
      count: status.statusKeys.reduce((sum, key) => sum + (statusCounts[key] ?? 0), 0)
    }));
  }

  private updateOrderSummaryCard(): void {
    const ordersCard = this.summaryCards.find(card => card.label === 'Orders');
    if (!ordersCard) {
      return;
    }

    ordersCard.value = this.orders.length.toLocaleString();
    const latest = this.latestOrders[0];
    ordersCard.meta = latest
      ? `Latest: ${this.getDisplayLabel(latest.status)}`
      : 'Awaiting new activity';
  }

  setActiveTab(tab: ActiveTab): void {
    this.activeTab = tab;
    this.updateFilteredOrders();
    if (tab !== 'dashboard') {
      setTimeout(() => {
        document.getElementById('order-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  private getStatusFilters(tab: ActiveTab): OrderStatus[] {
    const statusFilters: Record<ActiveTab, OrderStatus[]> = {
      dashboard: [],
      'orders-in': ['pending'],
      processing: ['confirmed', 'preparing'],
      ready: ['ready'],
      authentication: []
    };
    return statusFilters[tab] ?? [];
  }

  private updateFilteredOrders(): void {
    if (this.activeTab === 'dashboard') {
      this.currentFilteredOrders = this.latestOrders;
      return;
    }
    if (this.activeTab === 'authentication') {
      this.currentFilteredOrders = [];
      return;
    }

    const filters = this.getStatusFilters(this.activeTab);
    this.currentFilteredOrders = this.latestOrders.filter(order => filters.includes(order.status));
  }

  getTabTitle(): string {
    const titles: Record<ActiveTab, string> = {
      dashboard: 'Recent orders',
      'orders-in': 'Orders In',
      processing: 'Processing orders',
      ready: 'Ready for pickup/delivery',
      authentication: 'Authentication support'
    };
    return titles[this.activeTab];
  }

  getTabSubtitle(): string {
    const subtitles: Record<ActiveTab, string> = {
      dashboard: 'Newest four orders with their current state.',
      'orders-in': 'Fresh orders awaiting confirmation.',
      processing: 'Kitchen is preparing these meals.',
      ready: 'Ready orders waiting for collection or delivery.',
      authentication: 'Authentication controls live in the access area.'
    };
    return subtitles[this.activeTab];
  }

}
