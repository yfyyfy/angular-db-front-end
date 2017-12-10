import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from '../models/hero';
import { Query } from '../models/query';
import { Tabulable, TabulableNode } from '../models/tabulable';
import { HeroService } from '../services/hero.service';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  configVisible: boolean = false;
  heroes: Hero[];
  tableContents: {[key: string]: TabulableNode[]};
  columnVisible: boolean[];
  columnNames: string[];
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
    var columns = [{name: 'ID',       path: ['id']},
                   {name: 'Name',     path: ['name']},
                   {name: 'Country',  path: ['country']},
                   {name: 'Status',   path: ['activeDuty']},
                   {name: 'Language', path: ['languages', 'name']}];

    this.linkColumnName = 'ID';
    this.columnVisible = columns.map(e => true);
    this.columnNames = columns.map(e => e.name);
    return TabulableNode.expand(nodes, columns);
  }

  range(n:number): number[] {
    return Array.from(Array(n).keys());
  }
}
