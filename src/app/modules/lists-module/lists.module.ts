import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { CreateNewListFormComponent } from './create-new-list-form/create-new-list-form.component';
import { CreateNewListButtonComponent } from './create-new-list-button/create-new-list-button.component';
import { ListsServiceService } from './lists-service.service';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsMaterialModule } from './lists-material.module';

@NgModule({
  declarations: [ListsComponent, ListComponent, CreateNewListButtonComponent, CreateNewListFormComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ListsMaterialModule,
    FormsModule,
  ],
  exports: [ListsComponent],
  providers: [ListsServiceService],
})
export class ListsModule { }
