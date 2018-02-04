export class TableColumn {
  id?: string;
  name?: string;
  nameForVisibility?: string;
  path?: string[];
  width?: string;
  invisibleByDefault?: boolean;
  fixed?: boolean;

  constructor(obj: TableColumn = {} as TableColumn) {
    let {
      id = '',
      name = '',
      nameForVisibility = '',
      path = [],
      width = null,
      invisibleByDefault = false,
      fixed = false,
    } = obj;

    this.id = id;
    this.name = name;
    this.nameForVisibility = nameForVisibility;
    this.path = path;
    this.width = width;
    this.invisibleByDefault = invisibleByDefault;
    this.fixed = fixed;
  }
}
