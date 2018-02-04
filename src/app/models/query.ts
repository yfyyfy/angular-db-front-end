export class Query {
  id?: number;
  name?: string;
  country?: string[];
  language?: string[];
  activeDuty?: boolean[];

  static prop2tableColumn: {[key: string]: string[]} = {
    country: ['hero', 'country'],
    language: ['hero_language', 'name'],
  }

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

  static getTableColumn(prop: string): string[] {
    return this.prop2tableColumn[prop];
  }
}
