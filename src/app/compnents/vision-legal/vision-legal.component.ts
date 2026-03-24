import { Component } from '@angular/core';

@Component({
  selector: 'app-vision-legal',
  templateUrl: './vision-legal.component.html',
  styleUrls: ['./vision-legal.component.css']
})
export class VisionLegalComponent {
  mission = [
    'To serve fresh, high-quality fast food at affordable prices',
    'To create a fast and reliable ordering experience both in-store and online',
    'To build a brand that represents local culture and taste',
    'To empower growth by expanding Lolly’s into a trusted national franchise',
    'To ensure every customer leaves satisfied with irresistible flavour in every bite'
  ];

  vision =
    'To become one of South Africa’s leading fast food franchises, known for irresistible flavour, affordability, and consistent quality, while expanding across cities and communities.';
}
