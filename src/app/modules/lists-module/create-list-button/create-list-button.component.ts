import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListFormComponent } from '../create-list-form/create-list-form.component';

@Component({
  selector: 'app-create-list-button',
  templateUrl: './create-list-button.component.html',
  styleUrls: ['./create-list-button.component.scss'],
})
export class CreateListButtonComponent {
  @Output() public createList = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  public openCreateListForm(): void {
    const dialogRef = this.dialog.open(CreateListFormComponent, {
      data: {
        name: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) this.createList.emit(result);
    });
  }
}
