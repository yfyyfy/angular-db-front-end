import { TableColumn } from 'app/models/table-column';

var tableColumns: TableColumn[] = [
  {id: 'ID',       path: ['id']},
  {id: 'Name',     path: ['name']},
  {id: 'Country',  path: ['country']},
  {id: 'Status',   path: ['activeDuty']},
  {id: 'Language', path: ['languages', 'name']}
];

export const SETTINGS = {
  tableColumns: tableColumns,
  linkColumnId: 'ID',
  tableWidth: null,
  tableHorizontalScrollable: false,
};
