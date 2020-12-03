import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ListInterface } from '../list';
import { StoreService } from '../../../store.service';
import { EditListFormComponent } from '../edit-list-form/edit-list-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() public list: ListInterface;

  constructor(
    private storeService: StoreService,
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
    this.editDialog.open(EditListFormComponent, {
      data: {
        listRef: this.list,
      },
    });
  }

  public deleteList(): void {
    this.storeService.deleteList$(this.list);
  }

  public openListItems(): void {
    this.router.navigate([`list/${this.list.id}`], { state: { name: this.list.name } });
  }
}
