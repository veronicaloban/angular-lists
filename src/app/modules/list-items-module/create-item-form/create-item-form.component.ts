import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.scss'],
})
export class CreateItemFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<CreateItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
  ) { }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
