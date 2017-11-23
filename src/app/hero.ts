export class Hero {
  id?: number;
  name?: string;

  constructor(obj: Hero = {} as Hero) {
    let {
      id = 0,
      name = '',
    } = obj;

    this.id = id;
    this.name = name;
 }
}
