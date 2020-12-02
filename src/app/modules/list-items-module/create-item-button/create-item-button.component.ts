import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemFormComponent } from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-create-item-button',
  templateUrl: './create-item-button.component.html',
  styleUrls: ['./create-item-button.component.scss'],
})
export class CreateItemButtonComponent {
  @Input() private listId: string;

  constructor(public dialog: MatDialog) { }

  public openAddListForm(): void {
    this.dialog.open(CreateItemFormComponent, {
      data: {
        currentListId: this.listId,
      },
    });
  }
}
