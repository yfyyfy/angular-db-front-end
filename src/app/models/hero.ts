import { Tabulable, TabulableNode } from './tabulable';
import { Language } from './language';
import {Test} from './test';

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

    // Dummy data
    var _tests = [new Test(<any>{id: 1, name: 'test1'}), new Test(<any>{id: 2, name: 'test2'}), new Test(<any>{id: 3, name: 'test3'})];
    var tests = _tests.map(e => e.tabulate());
    if (this.id == 11) {tests = [];}

    this.childNodeFunctions = {
      'id': () => new TabulableNode(this.id).setRouterLink(`/detail/view/${this.id}`),
      'name': () => new TabulableNode(this.name),
      'country': () => new TabulableNode(this.country),
      'activeDuty': () => new TabulableNode(this.activeDuty ? 'active' : 'retired'),
      'languages': (arg) => this.languages.map(e => e.tabulate(arg)),
      'test': () => tests, // Add dummy data.
    };
  }
}
