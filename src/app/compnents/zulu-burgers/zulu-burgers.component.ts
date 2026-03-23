import { Component } from '@angular/core';
import { ZULU_BURGERS } from '../../data/menu-categories';

@Component({
  selector: 'app-zulu-burgers',
  templateUrl: './zulu-burgers.component.html',
  styleUrls: ['./zulu-burgers.component.css']
})
export class ZuluBurgersComponent {
  combos = ZULU_BURGERS;
}
