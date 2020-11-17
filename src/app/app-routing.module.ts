import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsModule } from './modules/lists-module/lists.module';

const routes: Routes = [
  { path: 'lists', loadChildren: (): Promise<ListsModule> => import('./modules/lists-module/lists.module').then((m) => m.ListsModule) },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
