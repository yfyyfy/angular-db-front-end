import { Tabulable, TabulableNode } from './tabulable';
import {Test} from './test';

export class Language extends Tabulable {
  hero_id: number;
  id: number;
  name: string;

  constructor(obj: Language = {} as Language) {
    super();
    let {
      hero_id = 0,
      id = 0,
      name = '',
    } = obj;

    this.hero_id = hero_id;
    this.id = id;
    this.name = name;

    // Dummy data
    var _tests = [new Test(<any>{id: 1, name: 'test1'}), new Test(<any>{id: 2, name: 'test2'}), new Test(<any>{id: 3, name: 'test3'})];
    var tests = _tests.map(e => e.tabulate());
    if (this.hero_id == 11 && this.name == 'English') {tests = [];}
    if (this.hero_id == 12 && this.name == 'Japanese') {tests = [];}

    var _tests2 = [new Test(<any>{id: 1, name: 'test1'}), new Test(<any>{id: 2, name: 'test2'}), new Test(<any>{id: 3, name: 'test3'})];
    var tests2 = _tests2.map(e => e.tabulate());
    if (this.hero_id == 11 && this.name == 'French') {tests2 = [];}
    if (this.hero_id == 12 && this.name == 'English') {tests2 = [];}

    var _tests3 = [new Test(<any>{id: 1, name: 'test1'})];
    var tests3 = _tests3.map(e => e.tabulate());
    if (this.hero_id == 11 && this.name == 'French') {tests3 = [];}
    if (this.hero_id == 12 && this.name == 'English') {tests3 = [];}

    this.childNodeFunctions = {
      'name': () => new TabulableNode(this.name),
//      'test': () => tests, // Add dummy data.
//      'test2': () => tests2, // Add dummy data.
      'test3': () => tests3, // Add dummy data.
    }
  }
}
