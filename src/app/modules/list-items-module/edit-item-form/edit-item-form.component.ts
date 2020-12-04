import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.scss'],
})
export class EditItemFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<EditItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newName: string, previousName: string },
  ) { }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
