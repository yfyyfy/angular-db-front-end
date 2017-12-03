export class Language {
  hero_id: number;
  id: number;
  name: string;

  constructor(obj: Language = {} as Language) {
    let {
      hero_id = 0,
      id = 0,
      name = '',
    } = obj;

    this.hero_id = hero_id;
    this.id = id;
    this.name = name;
  }
}
