import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent }      from './search-results/search-results.component';
import { DetailComponent }      from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'heroes', component: SearchResultsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
