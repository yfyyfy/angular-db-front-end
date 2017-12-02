export class Query {
  id?: number;
  name?: string;
  country?: string[];

  constructor(obj: Query = {} as Query) {
    let {
      id = 0,
      name = '',
      country = [],
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
 }
}
