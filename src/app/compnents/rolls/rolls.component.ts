import { Component } from '@angular/core';
import { ROLLS_MENU } from '../../data/menu-categories';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.css']
})
export class RollsComponent {
  rolls = ROLLS_MENU;
}
