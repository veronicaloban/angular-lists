import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { ListItemsRoutingModule } from './list-items-routing.module';
import { ListItemsMaterialModule } from './list-items-material.module';

import { ItemComponent } from './item/item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { CreateItemButtonComponent } from './create-item-button/create-item-button.component';

import { CreateItemFormComponent } from './create-item-form/create-item-form.component';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';

@NgModule({
  declarations: [
    ListItemsComponent,
    ItemComponent,
    CreateItemButtonComponent,
    CreateItemFormComponent,
    EditItemFormComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
    ListItemsMaterialModule,
    FormsModule,
  ],
})
export class ListItemsModule { }
