import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  terms = [
    {
      title: 'General',
      description: 'Using Lolly’s platforms means you agree to these terms.'
    },
    {
      title: 'Orders',
      description: 'All orders depend on availability; verify details before checkout.'
    },
    {
      title: 'Pricing',
      description: 'Prices listed in ZAR may change and special offers are limited.'
    },
    {
      title: 'Payments',
      description: 'Approved methods only; orders process after confirmation.'
    },
    {
      title: 'Delivery & Collection',
      description: 'Times are estimates and depend on demand.'
    },
    {
      title: 'Refunds & Cancellations',
      description: 'Requests must be timely; refunds follow the original payment method.'
    },
    {
      title: 'User Accounts',
      description: 'Keep login details confidential; Lolly’s is not liable for breaches.'
    },
    {
      title: 'Limitation of Liability',
      description: 'Lolly’s is not liable for indirect damages, delays or interruptions.'
    },
    {
      title: 'Privacy',
      description: 'Data is used to process orders and improve service; we do not share it without consent.'
    },
    {
      title: 'Changes to Terms',
      description: 'Continued use implies acceptance of updates.'
    }
  ];
}
