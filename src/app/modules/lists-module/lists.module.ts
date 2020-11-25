import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { CreateListFormComponent } from './create-list-form/create-list-form.component';
import { CreateListButtonComponent } from './create-list-button/create-list-button.component';
import { ListsService } from './lists.service';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsMaterialModule } from './lists-material.module';

@NgModule({
  declarations: [ListsComponent, ListComponent, CreateListButtonComponent, CreateListFormComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ListsMaterialModule,
    FormsModule,
  ],
  exports: [ListsComponent],
  providers: [ListsService],
})
export class ListsModule { }
