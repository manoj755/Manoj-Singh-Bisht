import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import { HttpClient } from '@angular/common/http';
import { CandidateInternaldatabaseComponent } from 'app/control/candidate-internadatabase/candidate-internaldatabase.component';
import { Pipe, PipeTransform } from '@angular/core';
// import { AllModules } from '@ag-grid-enterprise/all-modules';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
// import { MenuModule } from '@ag-grid-enterprise/menu';
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
// import '@ag-grid-community/core/dist/styles/ag-grid.css';
// import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
// import '@ag-grid-community/core';
// import '@ag-grid-community/client-side-row-model';
// import '@ag-grid-enterprise/menu';
// import '@ag-grid-enterprise/excel-export';

@Component({
  selector: 'app-internal-database',
  templateUrl: './internal-database.component.html',
  styleUrls: ['./internal-database.component.scss']
})
export class InternalDatabaseComponent implements OnInit {

  paginationNumberFormatter: (params: any) => string;
  paginationPageSize: number;
  pageSizee: any;
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
  showInternaldatagrid = false;
  hideInternaldata = true;
  // private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private getRowHeight;
  private groupDefaultExpanded;
  private isRowSelectable;

  // public modules: Module[] = [
  //   ClientSideRowModelModule,
  //   RowGroupingModule,
  //   MenuModule,
  //   ColumnsToolPanelModule,
  // ];

  candidate_filtered: any;

  columnDefsexcel = [

    {
      headerCheckboxSelection: true, checkboxSelection: true,

      headerName: 'Candidate Name', field: 'candidateName', width: 270,
      sortable: false, filter: false,
      cellRenderer: function (param) {
        return `<span><button type='button' data-action-type='candidateshow' class='btn  btn-sm'>
    ` + param.value + `
</button></span>
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
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateInternaldatabaseComponent,
      width: 1170, cellStyle: { "white-space": "normal" }
    },
  ];

  totalItems = 0;
  rowData = [

  ];
  allids = [];
  searchText: any;
  andsearch = '';
  orsearch = '';
  notsearch = '';
  checksearch = '';
  isPager = false;
  totalpage = [];
  getsalary: any;
  advancesearch = false;
  hidesearch = true;
  salarytoa = '';
  salaryfroma = '';
  expfroma = '';
  exptoa = '';
  booleansearch: boolean;
  search: any;
  salaryfrom: any;
  salaryto: any;
  expfrom: any;
  expto: any;
  showInternaldatagridboolean = false;
  showexcelgrid = false;
  shownormalgrid = false;
  databoolean: any;
  static salaryfroma: any;
  static exptoa: any;
  static salarytoa: any;
  static expfroma: any;
  static columnDefs: any;
  static columnDefsexcel: any;
  location: any;
  candidatelocation: any;
  locationcnd: any;
  objArray: any;
  locationtype: string;
  private content: string;
  public query: string;
  gridfromet: any;
  constructor(public db: DBService) {
    // this.autoGroupColumnDef = {
    //   headerName: 'Athlete',
    //   field: 'location',
    //   minWidth: 250,
    //   cellRenderer: 'agGroupCellRenderer',
    //   cellRendererParams: { suppressCount: true },

    // };
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 50;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };


  }
  onPageSizeChanged(newPageSize) {
    debugger
    var value = this.pageSizee;// document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  ngOnInit() {
    this.advancesearch = true;
    this.loadlocation();
  }


  ShowgridExcle(): void {
    debugger;
    this.showexcelgrid = true;
    this.shownormalgrid = false;
  }
  ShowgridNormal(): void {
    debugger;
    this.showexcelgrid = false;
    this.shownormalgrid = true;
  }

  loadlocation(): void {
    this.locationtype = 'location';
    this.location = [];
    this.db.list('location', null, (response): void => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.location.push(data[j].location);
        }
      }
    });
  };
  loadSearchAdvance(): void {
    this.advancesearch = true;
    this.booleansearch = false;
    this.hideInternaldata = true;
    this.showInternaldatagrid = false;
    this.showInternaldatagridboolean = false;

  }
  loadSearchBoolean(): void {

    this.advancesearch = false;
    this.booleansearch = true;
    this.hideInternaldata = true;
    this.showInternaldatagrid = false;
    this.showInternaldatagridboolean = false;

  }

  public loadGridboolean(): void {
    debugger;
    if ((this.searchText === '') && (this.locationcnd === '' || this.locationcnd === undefined) &&
      (this.salaryfroma === '' || this.salarytoa === '') && (this.expfroma === '' || this.exptoa === '')) {
      this.hideInternaldata = true;
      this.showInternaldatagrid = false;
      this.showInternaldatagridboolean = false;
      this.db.addmessageandremove('Please Insert data to search');
    }
    else {
      this.shownormalgrid = true;
      this.showInternaldatagridboolean = true;
      this.showInternaldatagrid = false;
      this.hideInternaldata = false;
      this.loadbooleanInternalData();
    }

  }



  public loadGrid(): void {
    debugger;
    if ((this.andsearch === '') && (this.orsearch === '') && (this.notsearch === '') &&
      (this.locationcnd === '' || this.locationcnd === undefined) && (this.salaryfroma === '' || this.salarytoa === '')
      && (this.expfroma === '' || this.exptoa === '')) {
      this.showInternaldatagrid = false;
      this.showInternaldatagridboolean = false;
      this.hideInternaldata = true;
      this.db.showMessage('Please Insert data to search');
      this.db.addmessageandremove('Please Insert data to search');
    }
    else {
      this.showInternaldatagrid = true;
      this.shownormalgrid = true;
      this.showInternaldatagridboolean = false;
      this.hideInternaldata = false;
      this.loadInternalData();
    }
  }

  public onRowClicked(e) {
    debugger;
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {
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


  loadbooleanInternalData(): void {
    if (true) {
      const locations = this.locationcnd;
      let candidatelocation = '';
      for (const j in locations) {
        if (locations[j].$ngOptionLabel) {
          candidatelocation += locations[j].$ngOptionLabel + ',';

        }
        this.locationcnd = candidatelocation;
      }
      this.db.list('showdataboolean/', { searchText: this.searchText, candidatelocation: this.locationcnd, salaryfrom: this.salaryfroma, salaryto: this.salarytoa, expfrom: this.expfroma, expto: this.exptoa }, ((response): void => {

        this.rowData = response;

      }));
    }
  }


  loadInternalData(isPager?): void {
    debugger;
    this.rowData = [];
    if (true) {
      const locations = this.locationcnd;
      let candidatelocation = '';
      for (const j in locations) {
        if (locations[j].$ngOptionLabel) {
          candidatelocation += locations[j].$ngOptionLabel + ',';

        }
        this.locationcnd = candidatelocation;
      }
      debugger;
      this.db.list('showdata/', { andsearch: this.andsearch, orsearch: this.orsearch, notsearch: this.notsearch, salaryfrom: this.salaryfroma, salaryto: this.salarytoa, expfrom: this.expfroma, expto: this.exptoa, candidatelocation: this.locationcnd }, ((response): void => {
        debugger;
        this.rowData = response;

      }));
    }

  }
  onGridReady(params) {
    debugger;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    debugger;
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());


    // window.alert('selection changed, ' + rowCount + ' rows selected');
  }
}
