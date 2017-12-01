export class Hero {
  id?: number;
  name?: string;
  country?: string;
  activeDuty?: boolean;

  constructor(obj: Hero = {} as Hero) {
    let {
      id = 0,
      name = '',
      country = '',
      activeDuty = true,
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
    this.activeDuty = activeDuty;
 }
}
