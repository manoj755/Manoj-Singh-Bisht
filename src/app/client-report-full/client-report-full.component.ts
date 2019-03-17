import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-client-report-full',
  templateUrl: './client-report-full.component.html',
  styleUrls: ['./client-report-full.component.scss']
})
export class ClientReportFullComponent implements OnInit {

  title = 'app';
  message = { id: 0 };
  isEdit = false;
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    { 'headerName': 'Billing Name', 'field': 'billingName', 'sortable': true, 'filter': true },
    { 'headerName': 'Website', 'field': 'website', 'sortable': true, 'filter': true },

    { 'headerName': 'Address', 'field': 'address', 'sortable': true, 'filter': true },
    { 'headerName': 'Contract Duration Start', 'field': 'contractDurationStart', 'sortable': true, 'filter': true },
    { 'headerName': 'Contract Duration End', 'field': 'contractDurationEnd', 'sortable': true, 'filter': true },
      { 'headerName': 'Billing Period', 'field': 'billing_period', 'sortable': true, 'filter': true },
    { 'headerName': 'Invoice Currency', 'field': 'invoice_currency', 'sortable': true, 'filter': true },
    { 'headerName': 'Email', 'field': 'email', 'sortable': true, 'filter': true },
    { 'headerName': 'Phone', 'field': 'phone', 'sortable': true, 'filter': true },
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
    this.db.list('clientreports/', {}, ((response): void => {
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
