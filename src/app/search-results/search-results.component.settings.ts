import { TableColumn } from 'app/models/table-column';

var tableColumns: TableColumn[] = [
  {name: 'ID',       path: ['id']},
  {name: 'Name',     path: ['name']},
  {name: 'Country',  path: ['country']},
  {name: 'Status',   path: ['activeDuty']},
  {name: 'Language', path: ['languages', 'name']}
];

export const SETTINGS = {
  tableColumns: tableColumns,
  linkColumnName: 'ID',
  tableWidth: null,
  tableHorizontalScrollable: false,
};
