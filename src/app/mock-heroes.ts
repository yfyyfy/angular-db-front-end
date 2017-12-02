import { Hero } from './hero';
import { Query } from './query';

import * as SQL from 'sql.js';

export class HeroDB {
  db: SQL.Database;

  constructor(heroObjArray: {}[]) {
    this.db = new SQL.Database();

    // Create a table in memory.
    var createTableStatement = 'CREATE TABLE hero (id INTEGER PRIMARY KEY, name TEXT, country TEXT, activeDuty BOOLEAN);';
    this.db.run(createTableStatement);

    // Insert records.
    try {
      this.insertToTable('hero', heroObjArray);
    } catch (e) {
      console.warn(e);
    }
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

  public getMulti(query?: Query): Hero[] {
    var selectStatement = 'SELECT * FROM hero';

    if (query) {
      var wheres: string[] = [];
      if (query.name && query.name.length > 0) {
        wheres.push(`name LIKE "%${query.name}%"`);
      }
      if (query.country && query.country.length > 0) {
        let countryWheres: string[] = [];
        for (let country of query.country) {
          countryWheres.push(`country = "${country}"`);
        }
        if (countryWheres.length > 0) {
          wheres.push('(' + countryWheres.join(' OR ') + ')');
        }
      }
      if (query.activeDuty && query.activeDuty.length > 0) {
        let activeDutyWheres: string[] = [];
        for (let activeDuty of query.activeDuty) {
          activeDutyWheres.push(`activeDuty = ${+activeDuty}`);
        }
        if (activeDutyWheres.length > 0) {
          wheres.push('(' + activeDutyWheres.join(' OR ') + ')');
        }
      }

      if (wheres.length > 0) {
        selectStatement += ' WHERE ' + wheres.join(' AND ');
      }
    }

    selectStatement += ';'

    var results: SQL.QueryResults[] = this.db.exec(selectStatement);
    return this.queryResults2objArray(results[0]);
  }

  public insert(hero?: Hero): boolean {
    var insertStatement = 'INSERT into hero';

    var keys: string[] = [];
    var values: string[] = [];
    if (hero.name != null) {
      keys.push('name');
      values.push(`"${hero.name}"`);
    }
    if (hero.country != null) {
      keys.push('country');
      values.push(`"${hero.country}"`);
    }
    if (hero.activeDuty != null) {
      keys.push('activeDuty');
      values.push(`${hero.activeDuty ? 1 : 0}`);
    }

    if (keys.length == 0) {return false;}

    insertStatement += ' ( ' + keys.join(',') + ' ) ';
    insertStatement += ' VALUES ( ' + values.join(',') + ' ) ';

    try {
      this.db.run(insertStatement);
    } catch (e) {
      console.warn(e);
      return false;
    }

    return true;
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
    if (hero.activeDuty != null) {
      sets.push(`activeDuty = ${hero.activeDuty ? 1 : 0}`);
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

  public delete(hero?: Hero): boolean {
    var deleteStatement = `DELETE FROM hero WHERE id = ${hero.id};`;

    try {
      this.db.run(deleteStatement);
    } catch (e) {
      console.warn(e);
      return false;
    }

    return true;
  }

  public getColumnValues(column: string): any[] {
    var selectStatement = `SELECT DISTINCT ${column} FROM hero;`
    var results: SQL.QueryResults[] = this.db.exec(selectStatement);

    return results[0].values.map(elt => elt[0]);
  }

  private insertToTable(table: string, keyValues: {}[]): void {
    var columnsArray = keyValues.map(e => Object.keys(e));
    var columns = [...Array.from(new Set([].concat(...columnsArray)))];

    var holders = [];
    var values = {};
    for (let index in keyValues) {
      holders.push(columns.map(e => '@' + e + '_' + index).join(','));
      var value = keyValues[index];
      for (let keyValue in value) {
        values['@' + keyValue + '_' + index] = value[keyValue];
      }
    }

    var insertStatement = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${holders.map(e => '(' + e + ')').join(',')};`;
    this.db.run(insertStatement, values);
  }

  private queryResults2objArray(results: SQL.QueryResults): Hero[] {
    var heroes: Hero[] = [];

    if (! results) {return heroes;}

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
  {id: 11, name: 'Mr. Nice',  country: 'US', activeDuty: 1},
  {id: 12, name: 'Narco',     country: 'UK', activeDuty: 0},
  {id: 13, name: 'Bombasto',  country: 'US', activeDuty: 1},
  {id: 14, name: 'Celeritas', country: 'US', activeDuty: 1},
  {id: 15, name: 'Magneta',   country: 'UK', activeDuty: 1},
  {id: 16, name: 'RubberMan', country: 'UK', activeDuty: 1},
  {id: 17, name: 'Dynama',    country: 'US', activeDuty: 1},
  {id: 18, name: 'Dr IQ',     country: 'US', activeDuty: 1},
  {id: 19, name: 'Magma',     country: 'US', activeDuty: 1},
  {id: 20, name: 'Tornado',   country: 'US', activeDuty: 1},
];

export const HERODB: HeroDB = new HeroDB(heroObjArray);
