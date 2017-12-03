export class Query {
  id?: number;
  name?: string;
  country?: string[];
  language?: string[];
  activeDuty?: boolean[];

  constructor(obj: Query = {} as Query) {
    let {
      id = 0,
      name = '',
      country = [],
      language = [],
      activeDuty = [],
    } = obj;

    this.id = id;
    this.name = name;
    this.country = country;
    this.language = language;
    this.activeDuty = activeDuty;
 }
}
