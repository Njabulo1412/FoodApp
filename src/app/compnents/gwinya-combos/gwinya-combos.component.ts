import { Component } from '@angular/core';
import { GWINYA_COMBOS } from '../../data/menu-categories';

@Component({
  selector: 'app-gwinya-combos',
  templateUrl: './gwinya-combos.component.html',
  styleUrls: ['./gwinya-combos.component.css']
})
export class GwinyaCombosComponent {
  combos = GWINYA_COMBOS;
}
