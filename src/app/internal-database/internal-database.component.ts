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
  currentData = {};
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

    {
      headerCheckboxSelection: true, checkboxSelection: true,

      headerName: 'Candidate Name', field: 'candidateName',
      sortable: false, filter: false,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='candidateshow' class='btn  btn-sm'>
    ` + param.value + `
</button>
`;
      }
    },
    { headerNmae: 'CurrentDesignation', field: 'currentDesignation', sortable: true, filter: true },
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
  allids = [];
  page = 1;
  pageSize = 50;
  searchText = '';
  isPager = false;
  totalpage = [];
  pageSizes = [10, 20, 50, 100, 500, 1000, 5000, 10000, 50000];
  constructor(public db: DBService) { }

  ngOnInit() {
    this.loadInternalData();
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      debugger;
      switch (actionType) {
        // case 'activity':
        //   return this.activityclick(data);
        // case 'comment':
        //   return this.onCommentClick(data);
        // case 'notes':
        //   return this.onNotesClick(data);
        case 'candidateshow':
          return this.oncandidateshowClick(data);
      }
    }
  }
  public oncandidateshowClick(data: any) {

    debugger;
    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }
  loadInternalData(isPager?): void {
    this.rowData = [];
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

    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());


    // window.alert('selection changed, ' + rowCount + ' rows selected');
  }
}
