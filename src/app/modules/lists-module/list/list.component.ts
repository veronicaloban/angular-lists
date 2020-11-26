import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListInterface } from '../list';
import { ListsService } from '../lists.service';
import { EditListFormComponent } from '../edit-list-form/edit-list-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() public list: ListInterface;

  constructor(private listsService: ListsService, private editDialog: MatDialog) {}

  public get listProgress(): number {
    return (this.list.completed * 100) / this.list.total;
  }

  public get isEverythingDone(): boolean {
    return this.listProgress === 100;
  }

  public openEditDialog(): void {
    this.editDialog.open(EditListFormComponent, {
      data: {
        listRef: this.list,
      },
    });
  }

  public deleteList(): void {
    this.listsService.deleteList$(this.list);
  }
}
