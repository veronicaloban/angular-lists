import { Component, Input } from '@angular/core';
import { ItemInterface } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public item: ItemInterface;
}
