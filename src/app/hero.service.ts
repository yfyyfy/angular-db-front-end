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

  // Todo: send the messages _after_ heroDB returns value
  getMulti(hero?: Hero): Observable<Hero[]> {
    this.messageService.add(`HeroService: search heroes`);
    return of(this.heroDB.getMulti(hero));
  }

  get(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(this.heroDB.get(id));
  }

  public insert(hero: Hero): Observable<any> {
    this.messageService.add(`HeroService: inserted a hero`);
    return of(this.heroDB.insert(hero));
  }

  public update(hero: Hero): Observable<any> {
    this.messageService.add(`HeroService: updated hero id=${hero.id}`);
    return of(this.heroDB.update(hero));
  }
}
