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
    var languages = this.languages.map(e => e.tabulate());
    var languagesSize = TabulableNode.arrayHeight(languages);

    var obj = {'id': new TabulableNode(this.id, 1).setRouterLink(`/detail/view/${this.id}`),
               'name': new TabulableNode(this.name, 1),
               'country': new TabulableNode(this.country, 1),
               'activeDuty': new TabulableNode(this.activeDuty ? 'active' : 'retired', 1),
               'languages': languages};
    var height = Math.max(1, languagesSize);

    return new TabulableNode(obj, height);
  }
}
