import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListFormComponent } from '../create-list-form/create-list-form.component';

@Component({
  selector: 'app-create-list-button',
  templateUrl: './create-list-button.component.html',
  styleUrls: ['./create-list-button.component.scss'],
})
export class CreateListButtonComponent {
  constructor(public dialog: MatDialog) { }

  public openCreateListForm(): void {
    this.dialog.open(CreateListFormComponent);
  }
}
