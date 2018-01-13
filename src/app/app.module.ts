import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { MultiselectDropdownModule } from 'ng2-multiselect';
import { NguiAutoCompleteModule }    from '@ngui/auto-complete';

import { AppComponent }              from 'app/app.component';
import { CheckboxOneditComponent }   from 'app/checkbox-onedit/checkbox-onedit.component';
import { DetailComponent }           from 'app/detail/detail.component';
import { InputOneditComponent }      from 'app/input-onedit/input-onedit.component';
import { SearchResultsComponent }    from 'app/search-results/search-results.component';
import { SearchFormComponent }       from 'app/search-form/search-form.component';
import { MultiCheckboxComponent }    from 'app/multi-checkbox/multi-checkbox.component';
import { MultiInputOneditComponent } from 'app/multi-input-onedit/multi-input-onedit.component';
import { MessagesComponent }         from 'app/messages/messages.component';
import { SearchComponent }           from 'app/search/search.component';

import { EmptyStringPipe }           from 'app/pipes/empty-string.pipe';

import { HeroService }               from 'app/services/hero.service';
import { MessageService }            from 'app/services/message.service';
import { QueryService }              from 'app/services/query.service';

import { AppRoutingModule }          from 'app/app-routing.module';

import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from 'app/custom-reuse-strategy';

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
    MultiInputOneditComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
    EmptyStringPipe
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
