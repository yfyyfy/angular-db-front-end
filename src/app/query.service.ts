import { Subject } from 'rxjs/Subject';

import { Query }    from './query';

export class QueryService {

  private query = new Subject<Query>();
  public query$ = this.query.asObservable();

  publishQuery(query: Query)
  {
    this.query.next(query);
  }
}
