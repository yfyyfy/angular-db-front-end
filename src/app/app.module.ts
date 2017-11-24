import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { DetailComponent }      from './detail/detail.component';
import { SearchResultsComponent }      from './search-results/search-results.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { QueryService }       from './query.service';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DetailComponent,
    MessagesComponent,
    SearchFormComponent,
    SearchResultsComponent
  ],
  providers: [ HeroService, MessageService, QueryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
