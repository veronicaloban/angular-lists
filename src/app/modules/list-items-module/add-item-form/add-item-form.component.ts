import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListItemsService } from '../list-items.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<AddItemFormComponent>,
    private listItemsService: ListItemsService,
    @Inject(MAT_DIALOG_DATA) public data: { currentListId: string },
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onAddItem(): void {
    if (this.name.length !== 0) {
      this.listItemsService.createItem$(this.data.currentListId, { name: this.name });
      this.closeDialog();
    }
  }
}
