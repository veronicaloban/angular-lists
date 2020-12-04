import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListInterface } from '../list';

@Component({
  selector: 'app-edit-list-form',
  templateUrl: './edit-list-form.component.html',
  styleUrls: ['./edit-list-form.component.scss'],
})
export class EditListFormComponent {
  public previousName = this.data.listRef.name;
  public newName = '';

  constructor(
    private editDialogRef: MatDialogRef<EditListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { listRef: ListInterface, newName: string },
  ) { }

  public onCancel(): void {
    this.editDialogRef.close();
  }
}
