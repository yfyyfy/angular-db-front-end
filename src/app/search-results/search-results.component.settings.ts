import { TableColumn } from 'app/models/table-column';

var tableColumns: TableColumn[] = [
  {id: 'ID',       path: ['id']},
  {id: 'Name',     path: ['name']},
  {id: 'Country',  path: ['country']},
  {id: 'Status',   path: ['activeDuty']},
  {id: 'Language', path: ['languages', 'name']},
  {id: 'Test',     path: ['languages', 'test', 'name']},
  {id: 'Test2',     path: ['languages', 'test2', 'name']},
  {id: 'Test3',     path: ['languages', 'test3', 'name']},
  {id: 'Test4', path: ['test', 'name']},
];

export const SETTINGS = {
  tableColumns: tableColumns,
  linkColumnId: 'ID',
  tableWidth: null,
  tableHorizontalScrollable: false,
};
