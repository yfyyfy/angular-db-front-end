import { Component, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IMultiSelectOption,IMultiSelectSettings } from 'ng2-multiselect';

import { Query }    from '../query';
import { QueryService } from '../query.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @ViewChild('searchForm') searchForm: NgForm;

  countries: any[] = [
    { country: 'US'},
    { country: 'UK'}
  ];

  countriesSettings: IMultiSelectSettings = {
    keyToSelect: 'country',
    lableToDisplay: 'country',
    isSimpleArray: false
  };

  model = new Query({name: '', country: []});
  submitted = false;

  constructor(private queryService: QueryService) {}

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
