import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-create-list-form',
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.scss'],
})
export class CreateListFormComponent {
  public data = { name: '' };

  constructor(public dialogRef: MatDialogRef<CreateListFormComponent>, public listsService: ListsService) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onCreateList(data: {name: string}): void {
    if (data.name.length !== 0) {
      this.listsService.createList$(data);
      this.closeDialog();
    }
  }
}
