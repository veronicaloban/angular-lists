import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ListsReducer } from './store/lists/lists.reducer';
import { ItemsReducer } from './store/list-items/list-items.reducer';

import { ListsEffects } from './store/lists/lists.effects';
import { ItemsEffects} from './store/list-items/list-items.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({lists: ListsReducer, items: ItemsReducer}, {}),
    EffectsModule.forRoot([ListsEffects, ItemsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
