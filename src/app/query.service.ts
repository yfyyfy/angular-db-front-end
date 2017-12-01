import { Subject } from 'rxjs/Subject';

import { Hero }    from './hero';

export class QueryService {

  private query = new Subject<Hero>();
  public query$ = this.query.asObservable();

  publishQuery(query: Hero)
  {
    this.query.next(query);
  }
}
