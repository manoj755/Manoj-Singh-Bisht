import { Component, OnInit } from '@angular/core';

import { DBService } from 'app/db.service';
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
  currentData: any;
  recruiter;
  allids = [];
  managers: any;
  data: any;
  //CandidateNote: { candidate_id: 0, not_scheduled: '' };
  contactibility: any;
  not_scheduled: any;
  gridOptions: any;
  candidate_id: any;
  candidatedetails: any;
  searchcandidatetext: any;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    { headerName: 'Job Name', field: 'job_name', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true },

    {
      headerName: 'Candidate Name', field: 'candidateName',
      sortable: false, filter: false,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='candidateshow' data-toggle="modal" class='btn  btn-sm'>
          ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Contactibility', field: 'contactibility',
      sortable: false, filter: false,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='notes' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Not Scheduled', field: 'not_scheduled',
      sortable: false, filter: false,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='status' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Mobile No', field: 'mobileNo', sortable: true, filter: true },
    { headerName: 'Current Designation', field: 'currentDesignation', sortable: true, filter: true },
    { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    { headerName: 'Overall Experience', field: 'ovarallExperiance', sortable: true, filter: true },
    { headerName: 'Salary', field: 'currentSalary', sortable: true, filter: true },
    { headerName: 'Recruiter Name', field: 'recruitername', sortable: true, filter: true },


    //{ headerName: 'CV Status', field: 'cvstatus', sortable: true, filter: true },

  ];

  rowData = [
  ];
  //CandidateNote: any;
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
    this.filterhistory();
    this.loadalert();




  }
  // setNotes(): void {
  //   debugger;
  //   this.candidate_id = this.candidate_id;
  //   $('#notesdetail').modal('show');
  // }
  loadalert(): void {
    const allrow = this.allids;
    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
  }
  LoadHistory(): void {
    this.rowData = [];
    this.data = {};
    if (this.recruiter) {
      this.data = { recruiter: this.recruiter };

    }
    this.db.list('history/', this.data, ((response): void => {
      this.rowData = response;
      this.candidatedetails = response;
      this.gridOptions = response;


    }));

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
      console.log(response);

    })
    );
  }

  filterhistory(): void {

    // this.db.list('history/', { data: this.data, searchcandidatetext: this.searchcandidatetext }, ((response): void => {
    //   this.rowData = response;
    //   this.candidatedetails = response;
    //   this.gridOptions = response;


    // }));
    debugger;
    if (this.searchcandidatetext.length !== 0 || this.searchcandidatetext.length !== undefined) {
      const main = [];
      // tslint:disable-next-line: forin
      for (const i in this.candidatedetails) {
        for (const j in this.candidatedetails[i]) {
          if (this.candidatedetails[i][j] != null && (this.candidatedetails[i][j].toString()).
            indexOf((this.searchcandidatetext)) === 0) {
            main.push(this.candidatedetails[i]);
            break;
          }

        }
      }
      this.rowData = main;
    } else {
      this.rowData = this.candidatedetails;
    }
  };


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {
        // case 'activity':
        //   return this.activityclick(data);
        // case 'comment':
        //   return this.onCommentClick(data);
        case 'notes':
          return this.onNotesClick(data);
        case 'candidateshow':
          return this.oncandidateshowClick(data);
        case 'status':
          return this.onStatusClick(data);
      }
    }
  }

  public onNotesClick(data: any) {
    $('#notesdetail1').modal('show')
    this.candidate_id = data.id;
  }
  public onStatusClick(data: any) {
    $('#notesdetail2').modal('show')
    this.candidate_id = data.id;
  }
  CandidateNotesave(): void {
    // if (!$('.validate').validate('#notesdetail')) {
    //   //  $.fn.showMessage('Please fill values');
    //     return;
    //   }
    debugger;

    //this.CandidateNote.candidate_id = this.candidate_id;
    const historystatus = {
      'candidate_id': this.candidate_id,
      'contactibility': this.contactibility
      // 'not_scheduled': this.CandidateNote.not_scheduled
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {

      this.db.addmessageandremove('Added Successfully');

      //this.message = {};
      //this.CandidateNote = { candidate_id: 0 };
      //this.GetNotes();

    }));

  };
  CandidateHistoryStatus(): void {
    // if (!$('.validate').validate('#notesdetail')) {
    //   //  $.fn.showMessage('Please fill values');
    //     return;
    //   }
    debugger;

    //this.CandidateNote.candidate_id = this.candidate_id;
    const historystatus = {
      'candidate_id': this.candidate_id,
      //'contactibility': this.contactibility
      'not_scheduled': this.not_scheduled
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {

      this.db.addmessageandremove('Added Successfully');

      //this.message = {};
      //this.CandidateNote = { candidate_id: 0 };
      //this.GetNotes();

    }));

  };
  public oncandidateshowClick(data: any) {


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
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

  }
}
