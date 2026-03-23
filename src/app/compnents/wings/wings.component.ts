import { Component } from '@angular/core';
import { WINGS_MENU } from '../../data/menu-categories';

@Component({
  selector: 'app-wings',
  templateUrl: './wings.component.html',
  styleUrls: ['./wings.component.css']
})
export class WingsComponent {
  wings = WINGS_MENU;
}
