import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-openingclientwise',
  templateUrl: './openingclientwise.component.html',
  styleUrls: ['./openingclientwise.component.scss']
})
export class OpeningclientwiseComponent implements OnInit {


  title = 'app';
  message = { id: 0 };
  isEdit = false;
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  public autoGroupColumnDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  public defaultColDef;
  columnDefs =
    [
      { 'headerName': 'Billing Name', 'field': 'BillingName', 'sortable': true, 'filter': true },
      {
        'headerName': 'Job Title', 'field': 'JobTitle', 'sortable': true, 'filter': true,
        cellRenderer: function (jt) {

          return jt.data.JobTitle + '<b>b</b>';
        }
      },
      { 'headerName': 'No of Opening', 'field': 'No.Of.Opening', 'sortable': true, 'filter': true }
    ];

  rowData = [
  ];
  constructor(public db: DBService) {
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowSelection = 'singal';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit() {
    this.LoadData();
  }


  // grid

  LoadData(): void {
    this.db.list('openingclientwise/', {}, ((response): void => {
      // this.columnDefs = this.db.GenerateColDef(response);
      this.rowData = response;



    }));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    console.log(event.api.getSelectedNodes());
    const rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      // switch (actionType) {
      //   case 'delete':
      //     return this.onActionDeleteClick(data);
      //   case 'edit':
      //     return this.onActionEditClick(data);
      // }
    }
  }

  public onActionDeleteClick(data: any) {
    console.log('View action clicked', data);
  }
  // grid



}
