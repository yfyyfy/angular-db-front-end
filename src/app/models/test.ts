import { Tabulable, TabulableNode } from './tabulable';

export class Test extends Tabulable {
  id: number;
  name: string;

  constructor(obj: Test = {} as Test) {
    super();
    let {
      id = 0,
      name = '',
    } = obj;

    this.id = id;
    this.name = name;

    this.childNodeFunctions = {
      'name': () => new TabulableNode(this.name),
    };
  }
}
