import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemFormComponent } from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-create-item-button',
  templateUrl: './create-item-button.component.html',
  styleUrls: ['./create-item-button.component.scss'],
})
export class CreateItemButtonComponent {
  @Output() public createItem = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  public openAddListForm(): void {
    const dialogRef = this.dialog.open(CreateItemFormComponent, {
      data: {
        name: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) this.createItem.emit(result);
    });
  }
}
