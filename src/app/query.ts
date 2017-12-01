export class Query {
  id?: number;
  name?: string;
  country?: string[];
  activeDuty?: boolean[];

  constructor(obj: Query = {} as Query) {
    let {
      id = 0,
      name = '',
      country = [],
      activeDuty = [null, null],
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
    this.activeDuty = activeDuty;
 }
}
