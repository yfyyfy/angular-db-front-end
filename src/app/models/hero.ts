import { Tabulable } from './tabulable';
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

  tabulate(): [any, number] {
    var obj = {'ID': [this.id, 1],
               'Name': [this.name, 1],
               'Country': [this.country, 1],
               'Status': [this.activeDuty ? 'active' : 'retired', 1],
               'Language': this.languages.map(e => e.tabulate())};
    var size = Math.max(1, this.tabulableArraySize(obj['Language']));

    return [obj, size];
  }
}
