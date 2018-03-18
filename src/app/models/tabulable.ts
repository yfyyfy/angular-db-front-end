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

    var tableData: {[key: string]: TabulableNode[]} = {}; // tableData[key][idx] is the value of idx-th row's 'key' column.
    columns.forEach(function(column: TableColumn) {
      var columnCells: (ColumnCell | ColumnCellAggregate)[];
      column.path.forEach(function(key: string, index: number) {
        if (index == 0) {
          if (index < column.path.length - 1) {
            columnCells = nodes.map((node: TabulableNode) => new ColumnCellAggregate(node.item[key], node.height));
          } else {
            columnCells = nodes.map((node: TabulableNode) => new ColumnCell(node.item[key], node.height));
          }
        } else {
          var columnCellsArray: (ColumnCell | ColumnCellAggregate)[][];
          columnCellsArray = columnCells.map((cca: ColumnCellAggregate) => cca.node.map(function(node: TabulableNode, idx: number): ColumnCell | ColumnCellAggregate {
            // console.log(cca.height + " " + cca.node.length + " " + idx + " " + node.position);

            if (node.isEmpty()) {
              if (index < column.path.length - 1) {
                return new ColumnCellAggregate([node], cca.height, cca.extraHeight);
              } else {
                return new ColumnCell(node, cca.height, cca.extraHeight);
              }
            } else {
              var height = node.height;
              var extraHeight = 0;

              if (idx == cca.node.length - 1) {
                var sumHeight = cca.node.reduce(function(acc: number, val: TabulableNode, idx: number): number {if (idx < cca.node.length - 1) {return acc + val.height;} else {return acc;}}, 0);

                extraHeight = cca.height + cca.extraHeight - sumHeight - height;
              }

              if (index < column.path.length - 1) {
                return new ColumnCellAggregate(node.item[key], height, extraHeight);
              } else {
                return new ColumnCell(node.item[key], height, extraHeight);
              }
            }
          }));
          columnCells = [].concat(...columnCellsArray);
        }
      });

      // Set TabulableNode.rowspan.
      columnCells.forEach(function(e: ColumnCell) {
        e.node.rowspan = e.height + e.extraHeight;
      });

      // Indexing ColumnCell by position.
      var tabulatedCells = <ColumnCell[]>[];
      columnCells.forEach(function(e: ColumnCell) {
        tabulatedCells[e.node.position] = e;
      });

      // Populate with ColumnCells with no height.
      if (nodes.length > 0) {
        var nrow = nodes[nodes.length - 1].position + nodes[nodes.length - 1].height;

        var previousCell: ColumnCell;
        for (let idx = 0; idx < nrow; ++idx) {
          if (tabulatedCells[idx] == null) {
            let item = null;
            if (idx < previousCell.node.position + previousCell.height) {
              item = previousCell.node.item;
            }

            let node = new TabulableNode(item).setHeight(0).setHref(previousCell.node.href).setRouterLink(previousCell.node.routerLink);
            tabulatedCells[idx] = new ColumnCell(node, 0, 0);
          } else {
            previousCell = tabulatedCells[idx];
          }
        }
      }

      // Extract TabulableNodes for column.id.
      tableData[column.id] = tabulatedCells.map(e => e.node);
    });

    return tableData;
  }
}

export class Tabulable {
  // Override this.
  childNodeFunctions?: {[s: string]: () => TabulableNode | TabulableNode[]};

  childNodes(): {[s: string]: TabulableNode | TabulableNode[]} {
    var ret = {};
    Object.keys(this.childNodeFunctions).forEach(e => {ret[e] = this.childNodeFunctions[e]();});
    return ret;
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

class ColumnCell {
  node: TabulableNode;
  height: number;
  extraHeight: number;

  constructor(node: TabulableNode, height: number, extraHeight?: number) {
    this.node = node;
    this.height = height;
    this.extraHeight = (extraHeight == null) ? 0 : extraHeight;
  }
}

class ColumnCellAggregate {
  node: TabulableNode[];
  height: number;
  extraHeight: number;

  constructor(node: TabulableNode[], height: number, extraHeight?: number) {
    this.node = node;
    this.height = height;
    this.extraHeight = (extraHeight == null) ? 0 : extraHeight;
  }
}
