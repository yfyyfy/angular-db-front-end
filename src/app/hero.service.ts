import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HeroDB, HERODB } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  heroDB: HeroDB;

  constructor(private messageService: MessageService) {
    this.heroDB = HERODB;
  }

  getMulti(hero?: Hero): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: search heroes`);
    return of(this.heroDB.getMulti(hero));
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(this.heroDB.get(id));
  }

  public update(hero: Hero): Observable<any> {
    // Todo: send the message _after_ updating the hero
    this.messageService.add(`HeroService: updated hero id=${hero.id}`);
    return of(this.heroDB.update(hero));
  }
}
