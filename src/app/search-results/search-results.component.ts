import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  heroes: Hero[];

  private subscriber: Subscription;

  constructor(private heroService: HeroService,
              private queryService: QueryService) {}

  ngOnInit() {
    this.subscriber = this.queryService.query$.subscribe(this.getHeroes.bind(this));
    this.getHeroes();
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  getHeroes(query?: Hero): void {
    this.heroService.getMulti(query).subscribe(heroes => this.heroes = heroes);
  }
}
