import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { ListsRoutingModule } from './lists-routing.module';

@NgModule({
  declarations: [ListsComponent, ListComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
  ],
  exports: [ListsComponent],
})
export class ListsModule { }
