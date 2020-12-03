import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../../../store.service';

@Component({
  selector: 'app-create-list-form',
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.scss'],
})
export class CreateListFormComponent {
  public name = '';

  constructor(
    public dialogRef: MatDialogRef<CreateListFormComponent>,
    private storeService: StoreService,
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onCreateList(): void {
    if (this.name.length !== 0) {
      this.storeService.createList$({ name: this.name });
      this.closeDialog();
    }
  }
}
