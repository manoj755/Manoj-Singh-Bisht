import { Component, OnInit } from '@angular/core';

import { DBService } from 'app/db.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  title = 'app';
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  recruiter;
  private gridColumnApi;
  managers = [];
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    { headerName: 'Job Name', field: 'job_name', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'Candidate Name', field: 'candidateName', sortable: true, filter: true },
    { headerName: 'Current Designation', field: 'currentDesignation', sortable: true, filter: true },
    { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    { headerName: 'Mobile No', field: 'mobileNo', sortable: true, filter: true },
    { headerName: 'Overall Experience', field: 'ovarallExperiance', sortable: true, filter: true },
    { headerName: 'Salary', field: 'currentSalary', sortable: true, filter: true },
    { headerName: 'Recruiter Name', field: 'recruitername', sortable: true, filter: true },
    { headerName: 'CV Status', field: 'cvstatus', sortable: true, filter: true },
 ];

  rowData = [
  ];
  constructor(private db: DBService) {
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit() {
    this.LoadHistory();
    this.loadmanagerid();
  }

  LoadHistory(): void {
    let data = {};
    if (this.recruiter) {
      data = { recruiter: this.recruiter };

    }
    this.db.list('history/', data, ((response): void => {
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
    this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }

  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };
}
