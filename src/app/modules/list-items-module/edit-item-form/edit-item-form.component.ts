import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListItemsService } from '../list-items.service';
import { ItemInterface } from '../item';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.scss'],
})
export class EditItemFormComponent {
  public name = '';
  public previousName = this.data.item.name;

  constructor(
    public dialogRef: MatDialogRef<EditItemFormComponent>,
    private listItemsService: ListItemsService,
    @Inject(MAT_DIALOG_DATA) public data: {item: ItemInterface, currentListId: string },
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onEditItem(): void {
    if (this.name.length !== 0) {
      this.listItemsService.putItem$(this.data.item, { name: this.name }, this.data.currentListId);
      this.closeDialog();
    }
  }
}
