export class TableColumn {
  name?: string;
  path?: string[];
  width?: string;
  invisibleByDefault?: boolean;
  fixed?: boolean;

  constructor(obj: TableColumn = {} as TableColumn) {
    let {
      name = '',
      path = [],
      width = null,
      invisibleByDefault = false,
      fixed = false,
    } = obj;

    this.name = name;
    this.path = path;
    this.width = width;
    this.invisibleByDefault = invisibleByDefault;
    this.fixed = fixed;
  }
}
