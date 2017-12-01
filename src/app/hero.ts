export class Hero {
  id?: number;
  name?: string;
  country?: string;

  constructor(obj: Hero = {} as Hero) {
    let {
      id = 0,
      name = '',
      country = '',
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
 }
}
