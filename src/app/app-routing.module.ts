import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from 'app/detail/detail.component';
import { MessagesComponent } from 'app/messages/messages.component';
import { SearchComponent } from 'app/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'detail/:mode', component: DetailComponent },
  { path: 'detail/:mode/:id', component: DetailComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'search', component: SearchComponent, data: {shouldDetach: true} }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
