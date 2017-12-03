import { Tabulable } from './tabulable';

export class Language extends Tabulable {
  hero_id: number;
  id: number;
  name: string;

  constructor(obj: Language = {} as Language) {
    super();
    let {
      hero_id = 0,
      id = 0,
      name = '',
    } = obj;

    this.hero_id = hero_id;
    this.id = id;
    this.name = name;
  }

  tabulate(): [any, number] {
    var obj = {'Language': [this.name, 1]};
    var size = 1;

    return [obj, size];
  }
}
