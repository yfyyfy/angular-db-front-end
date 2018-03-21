import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from 'app/models/hero';
import { Query } from 'app/models/query';
import { TableColumn } from 'app/models/table-column';
import { Tabulable, TabulableNode } from 'app/models/tabulable';
import { HeroService } from 'app/services/hero.service';
import { QueryService } from 'app/services/query.service';
import { SETTINGS } from './search-results.component.settings';

import * as FileSaver from 'file-saver';
import * as stringify from 'csv-stringify';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  configVisible: boolean = false;
  heroes: Hero[];
  tableContents: {[key: string]: TabulableNode[]};
  tableWidth: string;
  tableHorizontalScrollable: boolean;
  columnVisible: boolean[];
  columnIds: string[];
  columnNames: string[];
  columnNamesForVisibility: string[];
  columnWidths: string[];
  togglableColumnIndices: number[];
  linkColumnId: string; // The id of the column whose link is applied to the all cells in the same row.

  private subscriber: Subscription;

  constructor(private heroService: HeroService,
              private queryService: QueryService) {}

  toggleConfigVisibility(): void {
    this.configVisible = !this.configVisible;
  }

  hideColumn($event: any): void {
    let parentNode = $event.target.parentNode;
    let parentTagName = parentNode.tagName;
    let parentSiblings = Array.prototype.filter.call(parentNode.parentNode.childNodes, elt => elt.tagName === parentTagName);
    let indexInVisible = Array.prototype.indexOf.call(parentSiblings, parentNode);
    let index = this.columnVisible.map((e, i) => <any>{value: e, index: i}).filter(e => e.value)[indexInVisible].index;
    this.columnVisible[index] = false;

    this.setTableContents();
  }

  ngOnInit() {
    this.setTableSettings(SETTINGS);
    this.subscriber = this.queryService.query$.subscribe(this.getHeroes.bind(this));
    this.getHeroes();
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  getHeroes(query?: Query): void {
    var self = this;
    this.heroService.getMulti(query).subscribe(function(heroes) {
      self.heroes = heroes;
      self.setTableContents();
    });
  }

  setTableContents(): void {
    let tableColumns = SETTINGS.tableColumns.filter((val, idx) => val.id === SETTINGS.linkColumnId || this.columnVisible[idx]);
    this.tableContents = Tabulable.expand(this.heroes, tableColumns);
  }

  setTableSettings(settings) {
    this.columnVisible             = settings.tableColumns.map(e => ! e.invisibleByDefault);
    this.columnIds                 = settings.tableColumns.map(e => e.id);
    this.columnNames               = settings.tableColumns.map(e => e.name || e.id);
    this.columnNamesForVisibility  = settings.tableColumns.map(e => e.nameForVisibility || e.name || e.id);
    this.columnWidths              = settings.tableColumns.map(e => e.width);
    this.togglableColumnIndices    = settings.tableColumns.map((e, i) => e.fixed ? null : i).filter(e => e != null);

    this.linkColumnId              = settings.linkColumnId;
    this.tableWidth                = settings.tableWidth;
    this.tableHorizontalScrollable = settings.tableHorizontalScrollable;
  }

  range(n:number): number[] {
    return Array.from(Array(n).keys());
  }

  downloadResult(): void {
    let transposedTable: (boolean | number | string)[][] = [];
    for (let columnId of this.columnIds) {
      transposedTable.push([columnId, ...this.tableContents[columnId].map(e => <boolean | number | string>e.item)]);
    }

    let table: (boolean | number | string)[][] = [];
    for (let irow in transposedTable) {
      for (let icol in transposedTable[irow]) {
        if (table[icol] == null) {
          table[icol] = [];
        }
        table[icol][irow] = transposedTable[irow][icol];
        if (table[icol][irow] == null) {
          table[icol][irow] = '';
        }
      }
    }

    let filename = 'result.csv';
    this.downloadCsv(table, filename)
  }

  downloadCsv(table: (boolean | number | string)[][], filename: string): void {
    stringify(table, function(err: Error | undefined, csvStr: string) {
      let BOM = '\uFEFF';
      let blob = new Blob([BOM + csvStr], {
        type: 'ext/csv;charset=utf-8',
      });
      FileSaver.saveAs(blob, filename);
    });
  }
}
