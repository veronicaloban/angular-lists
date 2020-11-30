import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

@Component({
  selector: 'app-add-item-button',
  templateUrl: './add-item-button.component.html',
  styleUrls: ['./add-item-button.component.scss'],
})
export class AddItemButtonComponent {
  @Input() private listId: string;
  constructor(public dialog: MatDialog) { }

  public openAddListForm(): void {
    this.dialog.open(AddItemFormComponent, {
      data: {
        currentListId: this.listId,
      },
    });
  }
}
