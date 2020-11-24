import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListsServiceService } from '../lists-service.service';

@Component({
  selector: 'app-create-new-list-form',
  templateUrl: './create-new-list-form.component.html',
  styleUrls: ['./create-new-list-form.component.scss'],
})
export class CreateNewListFormComponent implements OnInit {
  public name = '';

  constructor(public dialogRef: MatDialogRef<CreateNewListFormComponent>, public listsService: ListsServiceService) { }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.closeDialog();
  }

  public onCreateNewList(name: string): void {
    this.listsService.postNewList({ name });
    this.closeDialog()
  }
}
