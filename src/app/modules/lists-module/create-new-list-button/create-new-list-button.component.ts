import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewListFormComponent } from '../create-new-list-form/create-new-list-form.component';

@Component({
  selector: 'app-create-new-list-button',
  templateUrl: './create-new-list-button.component.html',
  styleUrls: ['./create-new-list-button.component.scss'],
})
export class CreateNewListButtonComponent {
  constructor(public dialog: MatDialog) { }

  public openCreateListForm(): void {
    this.dialog.open(CreateNewListFormComponent);
  }
}
