import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ListInterface } from '../list';
import { EditListFormComponent } from '../edit-list-form/edit-list-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() public list: ListInterface;
  @Output() public deleteList = new EventEmitter<ListInterface>();
  @Output() public editList = new EventEmitter<{ listId: number, name: string }>();
  public newName: string;

  constructor(
    private editDialog: MatDialog,
    private router: Router,
  ) {}

  public get listProgress(): number {
    return (this.list.completed * 100) / this.list.total;
  }

  public get isEverythingDone(): boolean {
    return this.listProgress === 100;
  }

  public openEditDialog(): void {
    const dialogRef = this.editDialog.open(EditListFormComponent, {
      data: {
        listRef: this.list,
        newName: this.newName,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.newName = result;
      if (this.newName !== undefined) this.editList.emit({ listId: this.list.id, name: this.newName });
    });
  }

  public onDeleteList(): void {
    this.deleteList.emit(this.list);
  }

  public onEditList(): void {
    this.editList.emit({ listId: this.list.id, name: this.newName });
  }

  public openListItems(): void {
    this.router.navigate([`list/${this.list.id}`], { state: { name: this.list.name } });
  }
}
