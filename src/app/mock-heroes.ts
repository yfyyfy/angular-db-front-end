import { Hero } from './hero';

import * as SQL from 'sql.js';

export class HeroDB {
  db: SQL.Database;

  constructor(heroObjArray: {}[]) {
    this.db = new SQL.Database();

    // Create a table in memory.
    var createTableStatement = 'CREATE TABLE hero (id INTEGER PRIMARY KEY, name TEXT, country TEXT);';
    this.db.run(createTableStatement);

    // Insert records.
    try {
      var insertStatement = 'INSERT INTO hero (id, name, country) VALUES (@id, @name, @country);';
      for (let hero of heroObjArray) {
        this.db.run(insertStatement, hero);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  public getAll(): Hero[] {
    var selectStatement = 'SELECT * FROM hero;'
    var results: SQL.QueryResults[] = this.db.exec(selectStatement);
    return this.queryResults2objArray(results[0]);
  }

  public get(id: number): Hero {
    var selectStatement = `SELECT * FROM hero where id = ${id};`
    var results: SQL.QueryResults[] = this.db.exec(selectStatement);
    var heroes: Hero[] = this.queryResults2objArray(results[0]);
    if (heroes.length != 1) {
      console.warn('heroes.length != 1');
    }
    return heroes[0];
  }

  public update(hero?: Hero): boolean {
    var updateStatement = 'UPDATE hero';

    var sets: string[] = [];
    if (hero.name && hero.name.length > 0) {
      sets.push(`name = "${hero.name}"`);
    }
    if (hero.country && hero.country.length > 0) {
      sets.push(`country = "${hero.country}"`);
    }

    if (sets.length == 0) {return false;}

    updateStatement += ' SET ' + sets.join(',');
    updateStatement += ` WHERE id = ${hero.id}`;

    try {
      this.db.run(updateStatement);
    } catch (e) {
      console.warn(e);
      return false;
    }

    return true;
  }

  private queryResults2objArray(results: SQL.QueryResults): Hero[] {
    var heroes: Hero[] = [];

    for (let result of results.values) {
      var obj = {};
      for (let i in result) {
        obj[results.columns[i]] = result[i];
      }
      var hero: Hero = new Hero(obj);
      heroes.push(hero);
    }

    return heroes;
  }

}

const heroObjArray: {}[] = [
  {'@id': 11, '@name': 'Mr. Nice', '@country': 'US'},
  {'@id': 12, '@name': 'Narco', '@country': 'UK'},
  {'@id': 13, '@name': 'Bombasto', '@country': 'US'},
  {'@id': 14, '@name': 'Celeritas', '@country': 'US'},
  {'@id': 15, '@name': 'Magneta', '@country': 'UK'},
  {'@id': 16, '@name': 'RubberMan', '@country': 'UK'},
  {'@id': 17, '@name': 'Dynama', '@country': 'US'},
  {'@id': 18, '@name': 'Dr IQ', '@country': 'US'},
  {'@id': 19, '@name': 'Magma', '@country': 'US'},
  {'@id': 20, '@name': 'Tornado', '@country': 'US'},
];

export const HERODB: HeroDB = new HeroDB(heroObjArray);
