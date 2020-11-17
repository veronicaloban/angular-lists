import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'lists', loadChildren: () => import('./modules/lists-module/lists.module').then((m) => m.ListsModule) },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
