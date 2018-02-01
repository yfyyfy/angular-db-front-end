import { Tabulable, TabulableNode } from './tabulable';
import { Language } from './language';

export class Hero extends Tabulable{
  id?: number;
  name?: string;
  country?: string;
  languages?: Language[];
  activeDuty?: boolean;

  constructor(obj: Hero = {} as Hero) {
    super();
    let {
      id = 0,
      name = '',
      country = '',
      languages = [],
      activeDuty = true,
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
    this.languages = languages;
    this.activeDuty = activeDuty;
  }

  tabulate(): TabulableNode {
    var obj = {'id': new TabulableNode(this.id).setRouterLink(`/detail/view/${this.id}`),
               'name': new TabulableNode(this.name),
               'country': new TabulableNode(this.country),
               'activeDuty': new TabulableNode(this.activeDuty ? 'active' : 'retired'),
               'languages': this.languages.map(e => e.tabulate()),
              };

    return new TabulableNode(obj);
  }
}
