import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
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
