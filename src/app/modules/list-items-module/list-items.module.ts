import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListItemsRoutingModule } from './list-items-routing.module';
import { ItemComponent } from './item/item.component';
import { ListItemsMaterialModule } from './list-items-material.module';

import { ListItemsService } from './list-items.service';

@NgModule({
  declarations: [ListItemsComponent, ItemComponent],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
    ListItemsMaterialModule,
  ],
  providers: [ListItemsService],
})
export class ListItemsModule { }
