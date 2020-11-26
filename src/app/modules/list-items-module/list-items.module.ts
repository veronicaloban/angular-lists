import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListItemsRoutingModule } from './list-items-routing.module';

@NgModule({
  declarations: [ListItemsComponent],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
  ],
})
export class ListItemsModule { }
