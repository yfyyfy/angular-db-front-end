import { Hero } from 'app/models/hero';
import { Language } from 'app/models/language';
import { Query } from 'app/models/query';

import * as SQL from 'ext/sql.js';

export class HeroDB {
  db: SQL.Database;

  constructor(heroObjArray: {}[]) {
    this.db = new SQL.Database();

    // Create a table in memory.
    var createTableStatement_h = 'CREATE TABLE hero (id INTEGER PRIMARY KEY, name TEXT, country TEXT, activeDuty BOOLEAN);';
    var createTableStatement_hl = 'CREATE TABLE hero_language (hero_id INTEGER, id INTEGER, name TEXT, PRIMARY KEY (hero_id, id));';
    this.db.run(createTableStatement_h);
    this.db.run(createTableStatement_hl);

    // Insert records.
    try {
      this.db.run('BEGIN TRANSACTION;');
      this.insertToTable('hero', heroObjArray);
      this.insertToTable('hero_language', heroLanguageObjArray);
      this.db.run('COMMIT;');
    } catch (e) {
      this.db.run('ROLLBACK;');
      console.warn(e);
    }
  }

  private getBySelect(selectStatement: string): Hero[] {
    try {
      this.db.run('BEGIN TRANSACTION;');
      var results: SQL.QueryResults[] = this.db.exec(selectStatement);
      var ret: Hero[] = this.queryResults2objArray(Hero, results[0]);

      var ids = ret.map(e => e.id);
      var languages = this.selectIn('hero_language', 'hero_id', ids, ['hero_id', true], ['id', true]);

      this.db.run('COMMIT;');
    } catch (e) {
      this.db.run('ROLLBACK;');
      console.warn(e);
      return [];
    }
    var languagesObj = this.queryResults2objArray(Language, languages[0]);

    if (! this.appendChildren(ret, languagesObj, 'id', 'hero_id', 'languages')) {
      return [];
    }

    return ret;
  }

  public get(id: number): Hero {
    var selectStatement = `SELECT * FROM hero where id = ${id};`
    var ret = this.getBySelect(selectStatement);
    if (ret.length != 1) {
      console.warn('heroes.length != 1');
    }

    return ret[0];
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
      if (query.language && query.language.length > 0) {
        let languages = query.language.map(e => "'" + e + "'").join(',');
        wheres.push(`EXISTS (SELECT * FROM hero_language WHERE hero_language.hero_id = hero.id AND hero_language.name IN (${languages}))`);
      }

      if (wheres.length > 0) {
        selectStatement += ' WHERE ' + wheres.join(' AND ');
      }
    }

    selectStatement += ' ORDER BY id;'

    return this.getBySelect(selectStatement);
  }

  public insert(hero?: Hero): boolean {
    try {
      this.db.run('BEGIN TRANSACTION;');

      // Get ID.
      var maxId = this.extractSingleValueFromQueryResult(this.db.exec('SELECT MAX(id) from hero;')[0]);
      hero.id = Number(maxId) + 1;

      // Construct statements.
      var insertStatement = 'INSERT into hero';

      var keys: string[] = [];
      var values: any[] = [];
      if (hero.id != null) {
        keys.push('id');
        values.push(hero.id);
      }
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

      if (keys.length == 1) {return false;}

      insertStatement += ' ( ' + keys.join(',') + ' ) ';
      insertStatement += ' VALUES ( ' + values.join(',') + ' ) ';

      hero.languages = hero.languages.filter(e => e['name'].length > 0).map(function(e,i) {e.hero_id = hero.id; e.id = i; return e;});

      // Execute statements.
      this.db.run(insertStatement);
      this.insertToTable('hero_language', hero.languages);
      this.db.run('COMMIT;');
    } catch (e) {
      this.db.run('ROLLBACK;');
      console.warn(e);
      return false;
    }

    return true;
  }

  public update(hero?: Hero): boolean {
    var updateStatement_h = 'UPDATE hero';

    var sets_h: string[] = [];
    if (hero.name && hero.name.length > 0) {
      sets_h.push(`name = "${hero.name}"`);
    }
    if (hero.country && hero.country.length > 0) {
      sets_h.push(`country = "${hero.country}"`);
    }
    if (hero.activeDuty != null) {
      sets_h.push(`activeDuty = ${hero.activeDuty ? 1 : 0}`);
    }

    if (sets_h.length == 0) {return false;}

    updateStatement_h += ' SET ' + sets_h.join(',');
    updateStatement_h += ` WHERE id = ${hero.id}`;

    var deleteStatement_hl = `DELETE FROM hero_language WHERE hero_id = ${hero.id};`;
    hero.languages = hero.languages.filter(e => e['name'].length > 0).map(function(e,i) {e.hero_id = hero.id; e.id = i; return e;});

    try {
      this.db.run('BEGIN TRANSACTION;');
      this.db.run(updateStatement_h);
      this.db.run(deleteStatement_hl);
      this.insertToTable('hero_language', hero.languages);
      this.db.run('COMMIT;');
    } catch (e) {
      this.db.run('ROLLBACK;');
      console.warn(e);
      return false;
    }

    return true;
  }

  public delete(hero?: Hero): boolean {
    var deleteStatement_h = `DELETE FROM hero WHERE id = ${hero.id};`;
    var deleteStatement_hl = `DELETE FROM hero_language WHERE hero_id = ${hero.id};`;

    try {
      this.db.run('BEGIN TRANSACTION;');
      this.db.run(deleteStatement_h);
      this.db.run(deleteStatement_hl);
      this.db.run('COMMIT;');
    } catch (e) {
      this.db.run('ROLLBACK;');
      console.warn(e);
      return false;
    }

    return true;
  }

  public getTableColumnValues(table: string, column: string): any[] {
    var selectStatement = `SELECT DISTINCT ${column} FROM ${table} ORDER BY ${column};`
    var results: SQL.QueryResults[] = this.db.exec(selectStatement);

    return results[0].values.map(elt => elt[0]);
  }

  public getColumnValues(column: string): any[] {
    var table: string;
    if (column === 'country') {
      table = 'hero';
    } else if (column === 'language') {
      column = 'name';
      table = 'hero_language';
    }

    return this.getTableColumnValues(table, column);
  }

  private insertToTable(table: string, keyValues: {}[]): void {
    var LENGTH = 10;
    for (let idx = 0; idx < keyValues.length; idx += LENGTH) {
      this.insertToTableAtOnce(table, keyValues.slice(idx, idx + LENGTH));
    }
  }

  private insertToTableAtOnce(table: string, keyValues: {}[]): void {
    if (keyValues.length === 0) {return;}

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

  // orderbys = [[columnName, isASC], ...]
  private selectIn(table: string, column: string, values: any[], ...rest: (string | [string, boolean])[]) {
    var orderbys: [string, boolean][] = <[string, boolean][]> (rest.filter(Array.isArray));
    var wheres: string[] = <string[]> (rest.filter(elt => ! Array.isArray(elt)));

    var orderby = orderbys.map(e => `${e[0]} ${e[1] ? 'ASC' : 'DESC'}`).join(',');
    if (orderby.length > 0) {
      orderby = 'ORDER BY ' + orderby;
    }

    var _wheres: string[] = wheres.slice();
    {
      var inStr = values.map(e => (typeof e === 'string' || e instanceof String) ? JSON.stringify(e) : e).join(',');
      _wheres.push(`${column} IN (${inStr})`);
    }

    var selectStatement = `SELECT * FROM ${table} WHERE ${_wheres.join(" AND ")} ${orderby};`;

    return this.db.exec(selectStatement);
  }

  private queryResults2objArray<T>(c: new (o: {}) => T, results: SQL.QueryResults): T[] {
    var objects: T[] = [];
    if (!results) {return objects;}

    for (let result of results.values) {
      var o = {};
      for (let i in result) {
        o[results.columns[i]] = result[i];
      }
      var object: T = new c(o);
      objects.push(object);
    }

    return objects;
  }

  // Append child's element to parent's element under appendKey.
  // parentKey and childKey are used for matching the elements.
  private appendChildren(parent: {}[], child: {}[], parentKey: string, childKey: string, appendKey: string): boolean {
    var parentMap: Map<any, number> = <Map<any, number>>(parent.reduce(function(acc: Map<any, number>, val: any, idx: number) {acc.set(val[parentKey], idx); return acc;}, new Map()));

    child.forEach(function(e) {
      var idx = parentMap.get(e[childKey]);
      if (idx == null) {return false;}

      parent[idx][appendKey].push(e);
    });

    return true;
  }

  private extractFromQueryResult(results: SQL.QueryResults, key: string): any[] {
    if (!results) {return [];}

    var index = results.columns.indexOf(key);
    if (index < 0) {return []};

    return results.values.map(e => e[index]);
  }

  private extractSingleValueFromQueryResult(results: SQL.QueryResults): any {
    return results.values[0][0];
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

const heroLanguageObjArray: {}[] = [
  {hero_id: 11, id: 0, name: 'English'},
  {hero_id: 11, id: 1, name: 'French'},
  {hero_id: 12, id: 0, name: 'English'},
  {hero_id: 12, id: 1, name: 'Japanese'},
];

export const HERODB: HeroDB = new HeroDB(heroObjArray);
