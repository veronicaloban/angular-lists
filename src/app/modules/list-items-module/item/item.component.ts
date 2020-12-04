import {
  Component, Input, EventEmitter, Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { ItemInterface } from '../item';
import { EditItemFormComponent } from '../edit-item-form/edit-item-form.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public item: ItemInterface;
  @Input() public listId: string;
  @Output() public deleteItem = new EventEmitter<ItemInterface>();
  @Output() public changeItem = new EventEmitter<{ item: ItemInterface, isDone: boolean }>();
  @Output() public changeName = new EventEmitter<{ name: string, item: ItemInterface}>();
  public name: string;

  constructor(private dialog: MatDialog) {}

  public onDeleteItem(): void {
    this.deleteItem.emit(this.item);
  }

  public changeState($event: MatCheckboxChange): void {
    this.changeItem.emit({ item: this.item, isDone: $event.checked });
  }

  public openEditForm(): void {
    const dialogRef = this.dialog.open(EditItemFormComponent, {
      data: {
        newName: this.name,
        previousName: this.item.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.name = result;
      if (this.name !== undefined) this.changeName.emit({ name: this.name, item: this.item });
    });
  }
}
