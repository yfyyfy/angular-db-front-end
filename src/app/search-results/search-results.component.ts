import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Query } from '../query';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  configVisible: boolean = false;
  heroes: Hero[];
  columnVisible: boolean[] = [true, true, true, true];

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
    this.heroService.getMulti(query).subscribe(heroes => this.heroes = heroes);
  }
}
