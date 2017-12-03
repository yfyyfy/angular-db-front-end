import { Language } from './language';

export class Hero {
  id?: number;
  name?: string;
  country?: string;
  languages?: Language[];
  activeDuty?: boolean;

  constructor(obj: Hero = {} as Hero) {
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
}
