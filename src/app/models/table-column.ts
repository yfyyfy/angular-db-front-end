export class TableColumn {
  id?: string;
  path?: string[];
  width?: string;
  invisibleByDefault?: boolean;
  fixed?: boolean;

  constructor(obj: TableColumn = {} as TableColumn) {
    let {
      id = '',
      path = [],
      width = null,
      invisibleByDefault = false,
      fixed = false,
    } = obj;

    this.id = id;
    this.path = path;
    this.width = width;
    this.invisibleByDefault = invisibleByDefault;
    this.fixed = fixed;
  }
}
