import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { ItemInterface } from '../item';
import { ListItemsService } from '../list-items.service';
import { EditItemFormComponent } from '../edit-item-form/edit-item-form.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public item: ItemInterface;
  @Input() public listId: string;

  constructor(private listItemsService: ListItemsService, private dialog: MatDialog) {}

  public onDeleteItem(): void {
    this.listItemsService.deleteItem$(this.item);
  }

  public changeState($event: MatCheckboxChange): void {
    this.listItemsService.patchItem$(this.item, { isDone: $event.checked });
  }

  public openEditForm(): void {
    this.dialog.open(EditItemFormComponent, {
      data: {
        item: this.item,
        currentListId: this.listId,
      },
    });
  }
}
