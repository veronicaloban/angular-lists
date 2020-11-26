import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsModule } from './modules/lists-module/lists.module';
import { ListItemsModule } from './modules/list-items-module/list-items.module';

export const routes: Routes = [
  {
    path: 'lists',
    loadChildren: (): Promise<ListsModule> => import('./modules/lists-module/lists.module').then((m) => m.ListsModule),
  },
  {
    path: 'list/:id',
    loadChildren: (): Promise<ListItemsModule> => import('./modules/list-items-module/list-items.module')
      .then((m) => m.ListItemsModule),
  },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
