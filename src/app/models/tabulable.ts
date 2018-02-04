import { TableColumn } from './table-column';

export class TabulableNode {
  item: boolean | number | string | {[s: string]: TabulableNode | TabulableNode[]};
  height: number;
  href: string;
  position: number;
  routerLink: string;
  rowspan: number;

  constructor(item: boolean | number | string | {[s: string]: TabulableNode | TabulableNode[]}) {
    var isBoolean = typeof item === 'boolean';
    var isString = (typeof item === 'string' || item instanceof String);
    var isNumber = typeof item === 'number';
    var isNull = item === null;

    this.item = item;

    if (isBoolean || isString || isNumber || isNull) {
      this.height = 1;
    } else {
      var heights = Object.values(item).map(e=>TabulableNode.height(e));
      this.height = Math.max(...heights);
    }
  }

  setItem(item: boolean | number | string | {[s: string]: TabulableNode | TabulableNode[]}): TabulableNode {
    this.item = item;
    return this;
  }
  setHeight(height: number): TabulableNode {
    this.height = height;
    return this;
  }
  setHref(href: string): TabulableNode {
    this.href = href;
    return this;
  }
  setPosition(position: number): TabulableNode {
    this.position = position;
    return this;
  }
  setRouterLink(routerLink: string): TabulableNode {
    this.routerLink = routerLink;
    return this;
  }
  setRowspan(rowspan: number): TabulableNode {
    this.rowspan = rowspan;
    return this;
  }

  isEmpty(): boolean {
    return this.item === null;
  }

  static emptyNode(): TabulableNode {
    return new TabulableNode(null);
  }

  static arrayHeight(array: TabulableNode[]): number {
    return array.map(e => e.height).reduce(function(prev, current) {return prev + current;}, 0);
  };

  static height(arg: TabulableNode | TabulableNode[]): number {
    if (arg instanceof TabulableNode) {
      return arg.height;
    } else {
      return this.arrayHeight(arg);
    }
  };

  static expand(nodes: TabulableNode[], columns: TableColumn[]): {[key: string]: TabulableNode[]} {
    // console.log(JSON.stringify(nodes));

    var tableData = {}; // tableData's keys are column names. tableData[key][idx] is idx-th row's data of the key.
    columns.forEach(function(column) {
      var columnRows;
      column.path.forEach(function(key, index) {
        if (index == 0) {
          columnRows = nodes.map((node: TabulableNode) => [node.height, node.item[key]]);
        } else {
          columnRows = columnRows.map(e => e[1].map(function(node: TabulableNode, idx: number) {
            // console.log(e[0] + " " + e[1].length + " " + idx + " " + node.position);

            if (node.isEmpty()) {
              if (index < column.path.length - 1) {
                return [e[0], [node]];
              } else {
                return [e[0], node];
              }
            } else {
              var height = node.height;
              if (idx == e[1].length - 1) {
                var sumHeight = e[1].reduce(function(acc, val, idx) {if (idx < e[1].length - 1) {return acc + val.height;} else {return acc;}}, 0);
                height = e[0] - sumHeight;
              }
              return [height, node.item[key]];
            }
          }));
          columnRows = [].concat(...columnRows);
        }
      });

      // Set TabulableNode.rowspan.
      columnRows = columnRows.map(function(e: [number, TabulableNode]) {
        e[1].rowspan = e[0];
        return e[1];
      });
      // console.log(columnRows); // columnRows is TabulableNode[].

      tableData[column.id] = <TabulableNode[]>[];
      columnRows.forEach(function(e: TabulableNode) {
        tableData[column.id][e.position] = e;
      });

      // Populate with empty TabulableNode.
      if (nodes.length > 0) {
        var nrow = nodes[nodes.length - 1].position + nodes[nodes.length - 1].height;

        var previousNode: TabulableNode;
        for (let idx = 0; idx < nrow; ++idx) {
          if (tableData[column.id][idx] == null) {
            tableData[column.id][idx] = new TabulableNode(previousNode.item).setHeight(0).setHref(previousNode.href).setRouterLink(previousNode.routerLink);
          } else {
            previousNode = tableData[column.id][idx];
          }
        }
      }
    });

    return tableData;
  }
}

export class Tabulable {
  // Override this.
  childNodes(): {[s: string]: TabulableNode | TabulableNode[]} {
    return null;
  }

  tabulate(): TabulableNode {
    return new TabulableNode(this.childNodes());
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
        // Fill an empty array with a dummy data.
        if ((<TabulableNode[]>node.item[key]).length == 0) {
          (<TabulableNode[]>node.item[key]).push(TabulableNode.emptyNode());
        }

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
