import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DBService } from 'app/db.service';
import { debug } from 'util';
import { NgForm } from '@angular/forms';
import { MyHistoryCandidateComponent } from 'app/control/my-history-candidate/my-history-candidate.component';
declare var $: any;
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
  store = { candidateName: '', mobileNo: '', email: '', gender: '' };
  currentData: any;
  historystatuses: any;
  recruiter;
  showcomment: any;
  currentpage: any;
  allids = [];
  managers: any;
  data: any = {};
  candidateshowdata: any;
  enablesearch = false;
  enddate: any;
  startdate: any;
  cvshareddate: any;
  //CandidateNote: { candidate_id: 0, not_scheduled: '' };
  contactibility: any;
  showprocesses: any;
  not_scheduled: any;
  date: {};
  quality: any;
  gridOptions: any;
  graduation: {};
  client: {};
  saveclientprocess: {};
  experience: {};
  historydata: {};
  comment: {};
  cvslists: any;
  item: any = { end_date_temp: new Date() };
  curDate = new Date();
  candidate_id: any;
  candidatedetails: any;
  searchcandidatetext: any;
  clientdetails: any[];
  clientids: {};
  showprocess: { process: any };
  processes: any;
  genders = [];
  addresses = [];
  address: {};
  candidatename: any;
  candidateemail: any;
  candidatePhone: any;
  candidateskills: any;
  candidatefilenname: any;
  candidateid: any;
  resumeDetails: boolean;
  candidateupdateid: string;
  candidategender: any;
  showexcelgrid = false;
  shownormalgrid = false;
  paginationPageSize: number;

  paginationNumberFormatter: (params: any) => string;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;

  columnDefs = [
    {
      headerName: 'activity', sortable: false, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: MyHistoryCandidateComponent, autoHeight: true,
      width: 1190, cellStyle: { "white-space": "normal !important;"}

    },

  ];


  columnDefsexcel = [
    {
      headerCheckboxSelection: true, checkboxSelection: true,
      headerName: 'Parshed Date',
      width: 150, field: 'updated_at', sortable: true, filter: true
    },
    {
      headerName: 'Candidate Name', width: 140, field: 'candidateName',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='candidateshow' data-toggle="modal" class='btn  btn-sm'>
          ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Mobile No', width: 140, field: 'mobileNo', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer: function (param) {
        return `<span help='` + param.value + `'  class='text'>
      ` + param.value + `
  </span>
`;
      }
    },
    {
      headerName: 'Email', width: 120, field: 'email', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer: function (param) {
        return `<span help='` + param.value + `'  class='text'>
    ` + param.value + `
</span>
`;
      }
    },
    {
      headerName: 'Status', width: 120, field: 'not_scheduled',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer: function (param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='status' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },

    //   {
    //     headerName: 'Contactibility', width: 120, field: 'contactibility',
    //     sortable: true, filter: true,
    //     cellRenderer: function (param) {
    //       return `<button type='button'help='` + param.value + `'  data-action-type='notes' data-toggle="modal" class='btn  btn-sm'>
    //       ` + param.value + `
    //   </button>
    // `;
    //     }
    //   },

    {
      headerName: 'client', width: 120, field: 'client',
      filterParams: { newRowsAction: 'keep' },
      sortable: true, filter: true,
      cellRenderer: function (param) {
        return `<button type='button' help='` + param.value + `' data-action-type='client' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Process', width: 120, field: 'clientprocess',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer: function (param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='ClientProcess' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Qualification', width: 120, field: 'graduation',
      sortable: true, filter: true,
      cellRenderer: function (param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='Graduation' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Experience', width: 120, field: 'experience',
      sortable: true, filter: true,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='Experience' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Comment', width: 140, field: 'comment',
      sortable: true, filter: true,
      cellRenderer: function (param) {
        const abc = param.value;
        return `<button type='button' help='` + param.value + `'  data-action-type='Comment' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },

    {
      headerName: 'Cv Shared date', width: 120, field: 'cvshareddate',
      sortable: true, filter: true,
    },
    { headerName: 'Lineup Date', width: 150, field: 'schedule_date', sortable: true, filter: true },
    {
      headerName: 'Last Withdrawn Salary', width: 120, field: 'currentSalary',
      sortable: true, filter: true,
      cellRenderer: function (param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='changesalary' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
  ];
  // columnDefs = [
  //   {
  //     headerName: 'Job Name', width: 200,
  //     field: 'job_name', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true
  //   },

  //   {
  //     headerName: 'Candidate Name', field: 'candidateName',
  //     sortable: false, filter: false,
  //     cellRenderer: function (param) {
  //       return `<button type='button' data-action-type='candidateshow' data-toggle="modal" class='btn  btn-sm'>
  //         ` + param.value + `
  //   </button>
  // `;
  //     }
  //   },
  //   {
  //     headerName: 'Contactibility', field: 'contactibility',
  //     sortable: false, filter: false,
  //     cellRenderer: function (param) {
  //       return `<button type='button'  data-action-type='notes' data-toggle="modal" class='btn  btn-sm'>
  //       ` + param.value + `
  //   </button>
  // `;
  //     }
  //   },
  //   {
  //     headerName: 'Not Scheduled', field: 'not_scheduled',
  //     sortable: false, filter: false,
  //     cellRenderer: function (param) {
  //       return `<button type='button'  data-action-type='status' data-toggle="modal" class='btn  btn-sm'>
  //       ` + param.value + `
  //   </button>
  // `;
  //     }
  //   },
  //   { headerName: 'Email', field: 'email', sortable: true, filter: true },
  //   { headerName: 'Mobile No', field: 'mobileNo', sortable: true, filter: true },
  //   { headerName: 'Current Designation', field: 'currentDesignation', sortable: true, filter: true },
  //   { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
  //   { headerName: 'Location', field: 'location', sortable: true, filter: true },
  //   { headerName: 'Overall Experience', field: 'ovarallExperiance', sortable: true, filter: true },
  //   { headerName: 'Salary', field: 'currentSalary', sortable: true, filter: true },
  //   { headerName: 'Recruiter Name', field: 'recruitername', sortable: true, filter: true },
  // ];

  rowData = [
  ];
  isinterview: any;
  historystatus: {
    'candidate_id': any;
    'not_scheduled': any; 'date': string; 'isinterview': any;
    'address': any; 'quality': any;
  };
  historystatuswithoutdate: {
    'candidate_id': any;
    'not_scheduled': any;
  };
  filedata: string | Blob;
  parsedata: any;
  pageSizee: any;
  countries: any;

  constructor(public db: DBService) {
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
    this.paginationPageSize = 20;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }
  viewresumee:[];
  ngOnInit() {
    this.ShowgridNormal();
    this.LoadHistory();
    this.filterhistory();
    this.loadalert();
    //this.reloadpage();




  }

  onPageSizeChanged() {
    debugger;
    var value = this.pageSizee;// document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
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

  addcandidate() {
    debugger;
    $('#addcandidate').modal('show');
  }

  Uploadresume(){
    $('#resumeupload').modal('show');

  }


  uploadresume(files: FileList){
    // debugger;

    // const fileToUpload: any[] = [];
    // fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    // this.db.storeupload('uploadresumee/', { file:files }, (re) => {
    //   $('#uploadresume').modal('hide');

    //   this.db.showNotification('Resume Uploaded');
    //   // $('#uploadresume').modal('hide');
    // }, (re) => {
    //   this.db.showNotification('uploaded'); $('#uploadresume').modal('hide');
    // }, null, fileToUpload);

    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('uploadresumee/', { file: files }, (response) => {
      this.viewresumee = response.Filename;

      debugger;
    console.log(this.viewresumee);
      $('#uploadresume').modal('show');
    //
      // $scope.cvslists = response.data;
      this.db.showNotification('Resume Uploaded', this.viewresumee);
      // $('#uploadresume').modal('hide');
    }, (response) => {
       this.viewresumee = response.Filename;
      this.db.showNotification('uploaded'); $('#uploadresume').modal('show');
    }, null, fileToUpload);
  }
//   fileEvent(e){
//     this.filedata = e.target.files[0];
// }

//   onSubmit(f: NgForm) {
//        debugger;
//     var myFormData = new FormData();
//     const headers = new HttpHeaders();
//   headers.append('Content-Type', 'multipart/form-data');
//   headers.append('Accept', 'application/json');
//   myFormData.append('image', this.filedata);
// this.db.list('uploadresumee', myFormData,).subscribe(data => {
//   console.log(data);
// });

// }

onBtFirst() {
  this.gridApi.paginationGoToFirstPage();
}

onBtLast() {
  console.log("here");
  this.gridApi.paginationGoToLastPage();
}
onBtNext() {
  this.gridApi.paginationGoToNextPage();
}

onBtPrevious() {
  this.gridApi.paginationGoToPreviousPage();
}

  hidedownloadexcel() {
    $('#downloadexcel').modal('hide');
  }

  uploadnaukriexcel(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('uploadnaukriexcelbestseller/', { file: files }, (re) => {
      debugger;
      // console.log('type', files.type);

      $('#uploadexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded');
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }
  opennaukrimodel() {
    debugger;
    $('#uploadnaukriexcel').modal('show');
  }
  openhistorymodel() {
    $('#uploadhistoryexcel').modal('show');
  }
  openhistorydbmodel() {
    $('#uploaddbexcel').modal('show');
  }
  uploadhistoryexcel(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('uploadhistoryexcel/', { file: files }, (re) => {
      debugger;
      $('#uploadhistoryexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded', this.cvslists);
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }
  uploaddbexcel(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('uploadhistoryexcelfromdb/', { file: files }, (re) => {
      debugger;
      $('#uploaddbexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded');
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }

  // loadclientaddress(): void {
  //   debugger;
  //   this.db.list('loadlocation/', null, ((response): void => {
  //     this.addresses = response;
  //   }));
  // }


  // AddressSave(): void {
  //   debugger;
  //   this.currentpage = this.gridApi.paginationGetCurrentPage();

  //   const historystatus = {
  //     'candidate_id': this.candidate_id,
  //     'address': this.address,
  //     //'client': this.client
  //   };
  //   this.db.store('updatehistorystatus/', historystatus, ((response): void => {
  //     $('#address').modal('hide')
  //     this.LoadHistory();

  //     this.db.addmessageandremove('Added Successfully');

  //     //this.message = {};
  //     //this.CandidateNote = { candidate_id: 0 };
  //     //this.GetNotes();

  //   }));

  // };
  loadgender(): void {
    //debugger;
    this.db.list('master/gender', {
      'gi': 'rolecreating'
    }, ((response): void => {
      this.genders = response;
    }));
  };
  //  reloadpage(): void {
  //    debugger;
  //    this.currentpage = this.gridApi.paginationGetCurrentPage();
  //   if (this.gridApi) {
  //     //this.gridApi = params.api;
  //     this.gridApi.paginationGoToPage(this.currentpage);
  //   }
  // }
  reloadpage(currentpage): void {
    //debugger;

    setTimeout(() => {
      // this.LoadHistory();
      if (this.gridApi) {
        //this.gridApi = params.api;
        this.gridApi.paginationGoToPage(currentpage);

      }
    }, 100)
  }

  clientprocess(clientid): void {

    this.clientids = { 'id': clientid };
    this.db.list('getprocess/', this.clientids, ((response): void => {

      this.showprocess = response;

      for (const j in this.showprocess) {

        this.showprocesses = this.showprocess[j];
      }
      if (this.showprocesses.process != null) {
        const showprocessstr = this.showprocesses.process.toString().split(',');

        const process = [];
        //debugger;
        for (const i in showprocessstr) {
          if (showprocessstr[i]) {
            process.push(showprocessstr[i])
          }
        }

        this.processes = process;
      }
      else {
        this.processes = null;
      }
      this.CandidateClientSave(clientid);
    }));
  }
  purposechange(): void {
    $('#business').show();
    $('#cvsharedid').hide();


  };
  cvshared(): void {
    $('#cvsharedid').show();
    $('#business').hide();

  };

  loadalert(): void {
    const allrow = this.allids;
    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
  }
  LoadHistory(): void {
    debugger;
    if (this.enablesearch === false) {
      debugger;
      this.rowData = [];
      this.data = {};
      if (this.searchcandidatetext) {
        this.data = { 'key': this.searchcandidatetext }
      }
      if (this.recruiter) {
        this.data = { recruiter: this.recruiter };

      }
      if (this.startdate) {
        this.data = {
          recruiter: this.recruiter,
          start_date: this.db.toYYMMDDTT(this.startdate),
          end_date: this.db.toYYMMDDTT(this.enddate)
        }
      }
      this.db.list('history/', this.data, ((response): void => {
        debugger;
        this.rowData = response;
        this.candidatedetails = response;

        this.historydata = response;
        this.gridOptions = response;



        this.reloadpage(this.currentpage);



      }));
    } else {
      this.rowData = this.rowData;
    }

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
      console.log(response);

    })
    );
    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });
    // this.db.list('loadlocation/', null, ((response): void => {
    //   this.addresses = response;
    // }));
  }

  filterhistory(): void {

    if (this.searchcandidatetext.length !== 0 || this.searchcandidatetext.length !== undefined) {
      const main = [];

      for (const i in this.candidatedetails) {
        for (const j in this.candidatedetails[i]) {
          if (this.candidatedetails[i][j] != null && (this.candidatedetails[i][j].toString()).
            indexOf((this.searchcandidatetext)) === 0) {
            main.push(this.candidatedetails[i]);
            break;
          }

        }
      }
      if (this.searchcandidatetext === '') {
        this.rowData = main;
        this.enablesearch = false;
      } else {
        this.rowData = main;
        this.enablesearch = true;
      }
    } else {
      this.rowData = this.candidatedetails;
    }
  };


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {

        case 'notes':
          return this.onNotesClick(data);
        case 'candidateshow':
          return this.oncandidateshowClick(data);
        case 'status':
          return this.onStatusClick(data);
        case 'client':
          return this.onclientClick(data);
        case 'Graduation':
          return this.onGraduationClick(data);
        case 'Experience':
          return this.onExperienceClick(data);
        case 'Comment':
          return this.onCommentClick(data);
        case 'ClientProcess':
          return this.onClientProcess(data);
        case 'address':
          return this.onClickAddress(data);
        case 'changesalary':
          return this.onChangeSalary(data);
      }
    }
  }

  public onNotesClick(data: any) {
    $('#notesdetail1').modal('show')
    this.candidate_id = data.id;
  }
  public onChangeSalary(data: any) {
    $('#changesalary').modal('show')
    this.candidate_id = data.id;
  }
  public onStatusClick(data: any) {
    $('#notesdetail2').modal('show')
    this.candidate_id = data.id;
  }

  public onClickAddress(data: any) {
    $('#address').modal('show')
    this.candidate_id = data.id;
  }

  public onclientClick(data: any) {
    $('#client1').modal('show')
    this.candidate_id = data.id;
  }
  public onGraduationClick(data: any) {
    $('#Graduation').modal('show')
    this.candidate_id = data.id;
  }

  public onExperienceClick(data: any) {
    $('#Experience').modal('show')
    this.candidate_id = data.id;
  }
  public onCommentClick(data: any) {
    $('#Comment').modal('show')
    this.candidate_id = data.id;
    this.getcomment(this.candidate_id);
  }
  public onClientProcess(data: any) {
    $('#clientprocess').modal('show')
    this.candidate_id = data.id;
  }
  getcomment(candidate_id): void {

    const candidateids = {
      'candidateid': candidate_id,
    }
    this.db.list('getcomment', candidateids, ((response): void => {

      this.showcomment = response;
    })
    );
  }

  CandidateNotesave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      'candidate_id': this.candidate_id,
      'contactibility': this.contactibility
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {

      $('#notesdetail1').modal('hide');
      this.gridApi.paginationGoToPage(this.currentpage);
      this.LoadHistory();
      this.db.addmessageandremove('Added Successfully');



    }));

  };

  CandidateHistoryStatus(): void {
    debugger;
    this.currentpage = this.gridApi.paginationGetCurrentPage();
    if (this.date != undefined && this.date != null && this.not_scheduled === 'Scheduled - Interview Aligned') {
      this.isinterview = 1;
      this.historystatus = {
        'candidate_id': this.candidate_id,
        'not_scheduled': this.not_scheduled,
        'date': this.db.toYYMMDDTT(this.date),
        'address': this.address,
        'isinterview': this.isinterview,
        'quality': this.quality
      };
      this.db.store('updatehistorystatus/', this.historystatus, ((response): void => {
        $('#notesdetail2').modal('hide')
        $('#business').hide();

        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');



      }));
    } else if (this.cvshareddate != undefined && this.not_scheduled === 'CV Shared') {

      this.historystatuses = {
        'candidate_id': this.candidate_id,
        'cvshareddate': this.db.toYYMMDDTT(this.cvshareddate),
        'not_scheduled': this.not_scheduled,

      };
      this.db.store('updatehistorystatus/', this.historystatuses, ((response): void => {
        $('#notesdetail2').modal('hide')
        $('#cvsharedid').hide();

        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');
      }));
    } else {
      this.isinterview = 0;
      this.historystatuswithoutdate = {
        'candidate_id': this.candidate_id,
        'not_scheduled': this.not_scheduled,

      };

      this.db.store('updatehistorystatus/', this.historystatuswithoutdate, ((response): void => {
        $('#notesdetail2').modal('hide')
        $('#business').hide();
        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');



      }));
    }



  };


  candidatesave = function () {
    debugger;
    this.currentpage = this.gridApi.paginationGetCurrentPage();
    this.db.store('addnewcandidatehistory/', this.store, ((response): void => {
      $('#addcandidate').modal('hide');
      this.LoadHistory();
      this.db.addmessageandremove('Candidate added successfully.');

    }));
  }

  CandidateClientSave(clientid): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();

    const historystatus = {
      'candidate_id': this.candidate_id,
      'clientid': clientid,
      'client': this.client
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#client1').modal('hide')
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');
    }));

  };

  CandidateClientProcessSave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      'candidate_id': this.candidate_id,
      'clientprocess': this.saveclientprocess
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#clientprocess').modal('hide')
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');



    }));

  };
  CandidateGraduationSave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      'candidate_id': this.candidate_id,
      'graduation': this.graduation
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Graduation').modal('hide')
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');

    }));

  };


  CandidateExperienceSave(): void {
    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      'candidate_id': this.candidate_id,
      'experience': this.experience
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Experience').modal('hide')
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');



    }));

  };


  CandidateCommentSave(): void {


    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      'candidate_id': this.candidate_id,
      'comment': this.comment
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Comment').modal('hide')
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');

      //this.message = {};
      //this.CandidateNote = { candidate_id: 0 };
      //this.GetNotes();

    }));

  };

  Uploadresumee() {
    $('#resumeupload').modal('show');

  }
  resumeeupload(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('resumeuploade/', { file: files }, (response) => {
      debugger;
      this.candidateshowdata = response[1];
      this.candidatename = response[1].Name;
      this.candidateemail = response[1].Email;
      this.candidatePhone = response[1].Phone;
      this.candidateskills = response[1].Skills;
      this.candidatefilenname = response[1].Filename;
      this.candidateid = response[0];
      this.resumeDetails = true;

      // this.fileUploader.nativeElement.value = null;
      debugger;
      if (this.candidateshowdata.Filename.indexOf('docx') === - 1) {
        $('#resumeview').attr('src',
          'https://docs.google.com/gview?url=http://api.passivereferral.com/new_parser_resume/' +
          this.candidateshowdata.Filename + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true');
      } else {
        $('#resumeview').attr('src',
          'https://view.officeapps.live.com/op/embed.aspx?src=http://api.passivereferral.com/new_parser_resume/' + this.candidateshowdata.Filename);
      }

      //
      // $scope.cvslists = response.data;
      this.db.showNotification('Resume Uploaded');
      // $('#uploadresume').modal('hide');
    }, (response) => {
      //  this.viewresumee = response.Filename;
      this.db.showNotification('Not uploaded'); $('#resumeupload').modal('show');
    }, null, fileToUpload);
  }
  getcandidatechange(): void {
    debugger;

    debugger;
    if (this.countries === undefined) {
      this.db.list('master/country', {
        'gi': 'rolecreating'
      }, (response): void => {
        this.countries = response;
      });
    }
    this.candidateshowdata = {
      'gender': this.candidateshowdata.gender,
      'parseid': this.candidateid,
      'candidateName': this.candidateshowdata.Name,
      'email': this.candidateshowdata.Email,
       'mobileNo': this.candidateshowdata.Phone,
      'filename':this.candidatefilenname,
      'dob': this.candidateshowdata.dob,
      'currentSalary': this.candidateshowdata.currentSalary,
      'currentOrganization': this.candidateshowdata.currentOrganization,
      'noticePeriod': this.candidateshowdata.noticePeriod,
      'expectedSalary': this.candidateshowdata.expectedSalary,
      'currentDesignation': this.candidateshowdata.currentDesignation,
      'state': this.candidateshowdata.state,
      'city': this.candidateshowdata.city,
      'location': this.candidateshowdata.location,
      'preferredLocation': this.candidateshowdata.preferredLocation,
      'qualification': this.candidateshowdata.Education,
      'phoneNo': this.candidateshowdata.phoneNo,
      'panNo': this.candidateshowdata.panNo ,
      'nationality': this.candidateshowdata.nationality ,
      'visaType': this.candidateshowdata.visaType ,
      'remark': this.candidateshowdata.remark ,
      'ovarallExperiance': this.candidateshowdata.ovarallExperiance ,
      'relevantExperiance': this.candidateshowdata.relevantExperiance,
      'address': this.candidateshowdata.address ,
      'industryType': this.candidateshowdata.industryType ,
      'functionalArea': this.candidateshowdata.functionalArea ,
      'skillSet': this.candidateshowdata.Skills ,
      'source': this.candidateshowdata.source ,
      }
    this.db.list('addnewcandidateresume/', this.candidateshowdata, (response) => {
      this.db.addmessageandremove('Candidate added successfully.');
      this.LoadHistory();
      this.resumeDetails = false;
      $('#resumeupload').modal('hide');
      $('#uploadresume').modal('show');

    });

  }
  public oncandidateshowClick(data: any) {


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }
  // onPaginationChanged() {
  //   console.log("onPaginationPageLoaded");
  //   if (this.gridApi) {
  //     setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
  //   }
  // }
  onGridReady(params) {
    //debugger;
    this.gridApi = params.api;
    //this.currentpage = this.gridApi.paginationGetCurrentPage();
    // this.gridApi.paginationGoToPreviousPage();
    //
    // this.gridApi.paginationGoToPage(1);
    this.gridColumnApi = params.columnApi;
    this.loadgender();

  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    //debugger;
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());

  }
  gotocurrentpage(event) {
    //debugger;
    this.currentpage = event.api;
  }
}

