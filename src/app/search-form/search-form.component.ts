import { Component, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IMultiSelectOption,IMultiSelectSettings } from 'ng2-multiselect';

import { Query }    from 'app/models/query';
import { HeroService } from 'app/services/hero.service'
import { QueryService } from 'app/services/query.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @ViewChild('searchForm') searchForm: NgForm;

  countries: any[];
  countriesSettings: IMultiSelectSettings;

  languages: any[];
  languagesSettings: IMultiSelectSettings;

  model = new Query({name: '', country: []});
  submitted = false;

  constructor(private heroService: HeroService,
              private queryService: QueryService) {
    this.setMultiSelect(heroService, 'country', 'countries', 'countriesSettings');
    this.setMultiSelect(heroService, 'language', 'languages', 'languagesSettings');
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

  setSelect(service: HeroService, queryProperty: string, selectList: string): void {
    var tableColumn = Query.getTableColumn(queryProperty);
    service.getTableColumnValues(tableColumn[0], tableColumn[1]).subscribe(columnValues => this[selectList] = ['', ...columnValues.filter(elt => elt !== '')]);
  }

  setMultiSelect(service: HeroService, queryProperty: string, selectList: string, multiSelectSettings: string): void {
    var tableColumn = Query.getTableColumn(queryProperty);
    service.getTableColumnValues(tableColumn[0], tableColumn[1]).subscribe(columnValues => this[selectList] = columnValues.filter(elt => elt !== '').map(elt => <any>{[tableColumn[1]]: elt}));
    this[multiSelectSettings] = {
      keyToSelect: tableColumn[1],
      lableToDisplay: tableColumn[1],
      isSimpleArray: false
    };
  }

  // Todo: for debug.
  get modelJson() {
    return JSON.stringify(this.model);
  }
  get nameInForm() {
    return this.searchForm && this.searchForm.controls['name'] && this.searchForm.controls['name'].value;
  }
}
