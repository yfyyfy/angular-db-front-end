export class Tabulable {
  // Override this.
  tabulate(): [any, number] {
    return [{}, 0];
  }

  tabulableArraySize(tabulables:any): number {
    return tabulables.map(e => e[1]).reduce(function(prev, current) {return prev + current;}, 0);
  };
}
