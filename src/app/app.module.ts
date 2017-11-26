import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { MultiselectDropdownModule } from 'ng2-multiselect';
import { NguiAutoCompleteModule }    from '@ngui/auto-complete';

import { AppComponent }              from './app.component';
import { CheckboxOneditComponent }   from './checkbox-onedit/checkbox-onedit.component';
import { DetailComponent }           from './detail/detail.component';
import { InputOneditComponent }      from './input-onedit/input-onedit.component';
import { SearchResultsComponent }    from './search-results/search-results.component';
import { SearchFormComponent }       from './search-form/search-form.component';
import { MultiCheckboxComponent }    from './multi-checkbox/multi-checkbox.component';
import { MessagesComponent }         from './messages/messages.component';
import { SearchComponent }           from './search/search.component';

import { HeroService }               from './hero.service';
import { MessageService }            from './message.service';
import { QueryService }              from './query.service';

import { AppRoutingModule }          from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MultiselectDropdownModule,
    NguiAutoCompleteModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CheckboxOneditComponent,
    DetailComponent,
    InputOneditComponent,
    MessagesComponent,
    MultiCheckboxComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent
  ],
  providers: [ HeroService, MessageService, QueryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
