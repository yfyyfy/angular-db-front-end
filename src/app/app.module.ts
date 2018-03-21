import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { MultiselectDropdownModule } from 'ng2-multiselect';

import { SharedModule }              from 'app/shared/shared.module';

import { AppComponent }              from 'app/app.component';
import { DetailComponent }           from 'app/detail/detail.component';
import { SearchResultsComponent }    from 'app/search-results/search-results.component';
import { SearchFormComponent }       from 'app/search-form/search-form.component';
import { MessagesComponent }         from 'app/messages/messages.component';
import { SearchComponent }           from 'app/search/search.component';

import { HeroService }               from 'app/services/hero.service';
import { MessageService }            from 'app/services/message.service';
import { QueryService }              from 'app/services/query.service';

import { AppRoutingModule }          from 'app/app-routing.module';

import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from 'app/shared/custom-reuse-strategy';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MultiselectDropdownModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    DetailComponent,
    MessagesComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
  ],
  providers: [
    HeroService,
    MessageService,
    QueryService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
