import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-list-form',
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.scss'],
})
export class CreateListFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<CreateListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
  ) { }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
