import { Component, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IMultiSelectOption,IMultiSelectSettings } from 'ng2-multiselect';

import { Query }    from '../models/query';
import { HeroService } from '../services/hero.service'
import { QueryService } from '../services/query.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @ViewChild('searchForm') searchForm: NgForm;

  countries: any[];
  countriesSettings: IMultiSelectSettings;

  model = new Query({name: '', country: []});
  submitted = false;

  constructor(private heroService: HeroService,
              private queryService: QueryService) {
    heroService.getColumnValues('country').subscribe(columnValues => this.countries = columnValues.map(elt => <any>{'country': elt}));
    this.countriesSettings = {
      keyToSelect: 'country',
      lableToDisplay: 'country',
      isSimpleArray: false
    };
  }

  onSubmit() {
    this.submitted = true;
    this.queryService.publishQuery(this.model);
  }

  clear() {
    this.searchForm.reset();
    // reset() sets all model's properties connected to searchForm to null
    // including Object properties.
    this.model = new Query({name: '', country: []});
  }

  // Todo: for debug.
  get modelJson() {
    return JSON.stringify(this.model);
  }
  get nameInForm() {
    return this.searchForm && this.searchForm.controls['name'] && this.searchForm.controls['name'].value;
  }
}
