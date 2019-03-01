import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-internal-database',
  templateUrl: './internal-database.component.html',
  styleUrls: ['./internal-database.component.scss']
})
export class InternalDatabaseComponent implements OnInit {

  clients: any = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    { headerName: 'Candidate Name', field: 'candidateName', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true },
    {headerNmae: 'CurrentDesignation', field: 'currentDesignation', sortable: true, filter: true},
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Qualification', field: 'qualification', sortable: true, filter: true },
    { headerName: 'Mobile', field: 'mobileNo', sortable: true, filter: true },
    { headerName: 'Ovarall Experiance', field: 'ovarallExperiance', sortable: true, filter: true },
    { headerName: 'Current Salary', field: 'currentSalary', sortable: true, filter: true },
    { headerName: 'Preferred Location', field: 'preferredLocation', sortable: true, filter: true },
  ];
  totalItems = 0;
  rowData = [

  ];
  page = 1;
  pageSize = 50;
  searchText = '';
  isPager = false;
  totalpage = [];
  pageSizes = [10, 20, 50, 100, 500, 1000, 5000, 10000, 50000];
  constructor(private db: DBService) { }

  ngOnInit() {
    this.loadInternalData();
  }

  loadInternalData(isPager?): void {

    if (isPager) {
      this.isPager = true;
    } else {
      this.isPager = false;
    }

    this.db.list('candidatelistinternal/', { page: this.page, pageSize: this.pageSize, searchText: this.searchText }, ((response): void => {
      this.rowData = response.data;
      this.totalItems = response.totalItems;
      if (!this.isPager) {
        this.page = 1;
      }
      this.totalpage = [];
      let totalpages = Math.floor(this.totalItems / this.pageSize);
      if (this.totalItems % this.pageSize > 0) {
        totalpages = totalpages + 1;
      }
      for (let i = 1; totalpages >= i; i++) {
        this.totalpage.push(i);
      }

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

    // window.alert('selection changed, ' + rowCount + ' rows selected');
  }
}
