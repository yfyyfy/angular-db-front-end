export class TabulableNode {
  item: boolean | number | string | {[s: string]: TabulableNode | TabulableNode[]};
  height: number;
  position: number;
  rowspan: number;

  constructor(item: boolean | number | string | {[s: string]: TabulableNode | TabulableNode[]}, height: number) {
    this.item = item;
    this.height = height;
  }

  static arrayHeight(array:TabulableNode[]): number {
    return array.map(e => e.height).reduce(function(prev, current) {return prev + current;}, 0);
  };

  static expand(nodes:TabulableNode[], columns: {path: string[], name: string}[]): {[key: string]: TabulableNode[]} {
    // console.log(JSON.stringify(nodes));

    var nrow = nodes[nodes.length - 1].position + nodes[nodes.length - 1].height;

    var tableData = {}; // tableData's keys are column names. tableData[key][idx] is idx-th row's data of the key.
    columns.forEach(function(column) {
      var columnRows;
      column.path.forEach(function(key, index) {
        if (index == 0) {
          columnRows = nodes.map((node: TabulableNode) => [node.height, node.item[key]]);
        } else {
          columnRows = columnRows.filter(e => e[1].length > 0);
          columnRows = columnRows.map(e => e[1].map((node: TabulableNode) => [node.height, node.item[key]]));
          columnRows = [].concat(...columnRows);
        }
      });

      // Set TabulableNode.rowspan.
      columnRows = columnRows.map(function(e: [number, TabulableNode]) {
        e[1].rowspan = e[0];
        return e[1];
      });
      // console.log(columnRows); // columnRows is TabulableNode[].

      tableData[column.name] = <TabulableNode[]>[];
      columnRows.forEach(function(e: TabulableNode) {
        tableData[column.name][e.position] = e;
      });

      // Populate with empty TabulableNode.
      var previousItem = null;
      for (let idx = 0; idx < nrow; ++idx) {
        if (tableData[column.name][idx] == null) {
          tableData[column.name][idx] = new TabulableNode(previousItem, 0);
        } else {
          previousItem = tableData[column.name][idx].item;
        }
      }
    });

    return tableData;
  }
}

export class Tabulable {
  // Override this.
  tabulate(): TabulableNode {
    return new TabulableNode(null, -1);
  }

  static calculatePosition(tabulables: Tabulable[]): TabulableNode[] {
    var ret = tabulables.map(e => e.tabulate());

    var heightSum = 0;
    ret.forEach(function(node: TabulableNode) {
      var height = node.height;
      Tabulable._calculatePosition(node, heightSum);
      heightSum += height;
    });

    // console.log(JSON.stringify(ret));
    return ret;
  }

  static _calculatePosition(node: TabulableNode, position: number): void {
    node.position = position;

    if (typeof(node.item) !== 'object') {return;}

    for (let key in node.item) {
      if (node.item[key] instanceof TabulableNode) {
        Tabulable._calculatePosition((<TabulableNode>node).item[key], position);
      } else if (node.item[key] instanceof Array) {
        var heightSum = position;
        (<TabulableNode[]>node.item[key]).forEach(function(subNode: TabulableNode) {
          var height = subNode.height;
          Tabulable._calculatePosition(subNode, heightSum);
          heightSum += height;
        });
      } else { // node.item[key] is primitive.
      }
    }
  }
}
