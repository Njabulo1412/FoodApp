import { Component } from '@angular/core';
import { KOTAS } from '../../data/menu-categories';

@Component({
  selector: 'app-kota-menu',
  templateUrl: './kota-menu.component.html',
  styleUrls: ['./kota-menu.component.css']
})
export class KotaMenuComponent {
  kotas = KOTAS;
}
