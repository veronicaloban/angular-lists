import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListItemsRoutingModule } from './list-items-routing.module';
import { ListItemsMaterialModule } from './list-items-material.module';

import { ItemComponent } from './item/item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AddItemButtonComponent } from './add-item-button/add-item-button.component';

import { ListItemsService } from './list-items.service';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';

@NgModule({
  declarations: [
    ListItemsComponent,
    ItemComponent,
    AddItemButtonComponent,
    AddItemFormComponent,
    EditItemFormComponent,
  ],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
    ListItemsMaterialModule,
    FormsModule,
  ],
  providers: [ListItemsService],
})
export class ListItemsModule { }
