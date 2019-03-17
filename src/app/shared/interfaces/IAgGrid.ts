export interface IAgGrid {
  columnDefs: Array<object>;
  rowData: Array<object>;
  onGridReady();
  onSelectionChanged(event);
  onRowClicked(e);
  onExportData();
}
