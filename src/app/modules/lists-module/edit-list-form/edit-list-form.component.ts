import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListsService } from '../lists.service';
import { ListInterface } from '../list';

@Component({
  selector: 'app-edit-list-form',
  templateUrl: './edit-list-form.component.html',
  styleUrls: ['./edit-list-form.component.scss'],
})
export class EditListFormComponent {
  public name = '';
  public previousName = this.data.listRef.name;

  constructor(
    private editDialogRef: MatDialogRef<EditListFormComponent>,
    private listsService: ListsService,
    @Inject(MAT_DIALOG_DATA) public data: { listRef: ListInterface },
  ) { }

  public closeDialog(): void {
    this.editDialogRef.close();
  }

  public onEditList(): void {
    if (this.name.length !== 0) {
      this.listsService.putList$(this.data.listRef.id, { name: this.name });
      this.closeDialog();
    }
  }

  public onCancel(): void {
    this.closeDialog();
  }
}
