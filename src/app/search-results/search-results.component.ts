import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from 'app/models/hero';
import { Query } from 'app/models/query';
import { TableColumn } from 'app/models/table-column';
import { Tabulable, TabulableNode } from 'app/models/tabulable';
import { HeroService } from 'app/services/hero.service';
import { QueryService } from 'app/services/query.service';
import { SETTINGS } from './search-results.component.settings';

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
  columnNames: string[];
  columnWidths: string[];
  togglableColumnIndices: number[];
  linkColumnName: string; // The name of the column whose link is applied to the all cells in the same row.

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
    let index = Array.prototype.indexOf.call(parentSiblings, parentNode);
    this.columnVisible[index] = false;
  }

  ngOnInit() {
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
      self.tableContents = self.getTableContents();
    });
  }

  getTableContents(): {[key: string]: TabulableNode[]} {
    var nodes = Tabulable.calculatePosition(this.heroes);
    this.setTableSettings(SETTINGS);

    return TabulableNode.expand(nodes, SETTINGS.tableColumns);
  }

  setTableSettings(settings) {
    this.columnVisible             = settings.tableColumns.map(e => ! e.invisibleByDefault);
    this.columnNames               = settings.tableColumns.map(e => e.name);
    this.columnWidths              = settings.tableColumns.map(e => e.width);
    this.togglableColumnIndices    = settings.tableColumns.map((e, i) => e.fixed ? null : i).filter(e => e != null);

    this.linkColumnName            = settings.linkColumnName;
    this.tableWidth                = settings.tableWidth;
    this.tableHorizontalScrollable = settings.tableHorizontalScrollable;
  }

  range(n:number): number[] {
    return Array.from(Array(n).keys());
  }
}
