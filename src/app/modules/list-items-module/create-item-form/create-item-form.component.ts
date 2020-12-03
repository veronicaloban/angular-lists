import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from '../../../store.service';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.scss'],
})
export class CreateItemFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<CreateItemFormComponent>,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: { currentListId: string },
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onCreateItem(): void {
    if (this.name.length !== 0) {
      this.storeService.createItem$(this.data.currentListId, { name: this.name });
      this.closeDialog();
    }
  }
}
