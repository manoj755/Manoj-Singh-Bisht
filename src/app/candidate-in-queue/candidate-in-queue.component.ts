import { Component, OnInit } from '@angular/core';

import { DBService } from 'app/db.service';
import { debug } from 'util';
declare var $: any;
@Component({
  selector: 'app-candidate-in-queue',
  templateUrl: './candidate-in-queue.component.html',
  styleUrls: ['./candidate-in-queue.component.scss']
})
export class CandidateInQueueComponent implements OnInit {
  clients: any = [];
  addtojob: any = {};
  totalItems = 0;
  cvslists: any;
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  data: any = {};
  currentData = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  title = 'app';
  enddate: any;
  startdate: any;
  private gridApi;
  allids = [];
  page = 1;
  duplicatecandidate: any;
  pageSize = 100;
  searchText = '';
  isPager = false;
  totalpage = [];
  pageSizes = [10, 20, 50, 100, 500, 1000, 5000, 10000, 50000];
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [

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
    // { headerNmae: 'CurrentDesignation', field: 'currentDesignation', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    // { headerName: 'Qualification', field: 'qualification', sortable: true, filter: true },
    { headerName: 'Mobile', field: 'mobileNo', sortable: true, filter: true },
    // { headerName: 'Ovarall Experiance', field: 'ovarallExperiance', sortable: true, filter: true },
    // { headerName: 'Current Salary', field: 'currentSalary', sortable: true, filter: true },
    // { headerName: 'Preferred Location', field: 'preferredLocation', sortable: true, filter: true },
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
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit() {
    this.loadInternalData();




  }
  public onRowClicked(e) {
    debugger;
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


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
  public alreadyCalledCandidate(isPager?): void {
    this.rowData = [];
    if (isPager) {
      this.isPager = true;
    } else {
      this.isPager = false;
    }

    this.db.list('alreadycalledcandidate/', { page: this.page, pageSize: this.pageSize, searchText: this.searchText }, ((response): void => {
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
    public loadInternalData(isPager?): void {
    this.rowData = [];
    if (isPager) {
      this.isPager = true;
    } else {
      this.isPager = false;
    }

    this.db.list('candidatelist/', { page: this.page, pageSize: this.pageSize, searchText: this.searchText }, ((response): void => {
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
  loadInternalDatawithfilter(): void {
    debugger;
    this.rowData = [];
    if (this.startdate) {
      this.data = {
        //recruiter: this.recruiter,
        start_date: this.db.toYYMMDDTT(this.startdate),
        end_date: this.db.toYYMMDDTT(this.enddate)
      }
    }

    this.db.list('candidatelistinternalwithfilter/',
      this.data, ((response): void => {
        debugger;
        this.rowData = response.data;
        this.totalItems = response.totalItems;

      }));
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
  opennaukrimodel() {
    debugger;
    $('#uploadcandidateinqueue').modal('show');
  }

  candidatesave = function () {
    debugger;

    this.db.store('candidatedetail/', this.store, ((response): void => {
      debugger;
      this.updateid = response.id;

      $('#addcandidate').modal('hide');
      this.loadInternalData()
      this.db.addmessageandremove('Candidate added successfully.');

    }));
  }
  uploadcandidateinqueue(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('uploadcandidateinqueue/', { file: files }, (re) => {
      debugger;
      $('#uploadexcel').modal('hide');
      $('#showcvs').modal('show');

      this.duplicatecandidate = re;
      if (this.duplicatecandidate !== 0) {
        this.db.addmessageandremove('Duplicate candidate ' + this.duplicatecandidate);
      }

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded');
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }

}

