import { Component, OnInit } from '@angular/core';

import { DBService } from 'app/db.service';
import { CandidateCampaignViewComponent } from 'app/control/candidate-campaign-view/candidate-campaign-view.component';
import { debug } from 'util';
declare var $: any;
@Component({
  selector: 'app-candidate-campain',
  templateUrl: './candidate-campain.component.html',
  styleUrls: ['./candidate-campain.component.scss']
})
export class CandidateCampainComponent implements OnInit {

  title = 'app';
  private smsselected = {};
  conversations = {};
  conversationsobj = [];
  callconversation: any;
  chats = {};
  chatobj = [];
  breakchat: any;
  chatconversation: any;
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
  dailycampaincheckday: any;
  filtercheck = false;
  showprocess: { process: any };
  processes: any;
  genders = [];
  gongoingcampaindata: any;
  addresses = [];
  address: {};
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  //   columnDefs = [
  //     // {
  //     //   headerName: 'Job Name', width: 200,
  //     //   field: 'job_name', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true
  //     // },

  //     {
  //       headerName: 'Candidate Name', field: 'candidateName',
  //       sortable: false, filter: false,
  //       //     cellRenderer: function (param) {
  //       //       return `<button type='button' data-action-type='candidateshow' data-toggle="modal" class='btn  btn-sm'>
  //       //         ` + param.value + `
  //       //   </button>
  //       // `;
  //       //     }
  //     },

  //     { headerName: 'Email', field: 'email', sortable: true, filter: true },
  //     { headerName: 'Mobile No', field: 'mobileNo', sortable: true, filter: true },
  //     { headerName: 'Day', field: 'day', sortable: true, filter: true },
  //     { headerName: 'Status', field: 'call_status', sortable: true, filter: true },
  //     { headerName: 'Open Email Sms', field: 'is_open_mail', sortable: true, filter: true ,
  //     cellRenderer: function (param) {

  //       if (param.data.is_open_mail === 1) {

  //         return `
  //     ` + 'Open' + `
  // </button>
  // `;
  //       } else {
  //         return `
  //     ` + 'Not Open' + `
  // </button>
  // `;
  //       }
  //     }},
  //     { headerName: 'Start Date', field: 'last_activity', sortable: true, filter: true },

  //     { headerName: 'Open In', field: 'check_mail_sms', sortable: true, filter: true },
  //     {
  //       headerName: 'Open Link', field: 'is_read', sortable: true, filter: true,
  //       cellRenderer: function (param) {

  //         if (param.data.is_read === 1) {

  //           return `
  //       ` + 'Yes' + `
  // </button>
  // `;
  //         } else {
  //           return `
  //       ` + 'No' + `
  // </button>
  // `;
  //         }
  //       }
  //     },

  //   ];
  columnDefs = [
    {
      headerName: 'activity', sortable: false, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateCampaignViewComponent, autoHeight: true,
      width: 1190, cellStyle: { 'white-space': 'normal !important;' }

    },

  ];

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
    this.compeletedcampaindata();
    this.filterhistory();
    this.loadalert();
    //this.reloadpage();
  }
  dailycampaincheck() {
    debugger;
    // if (this.dailycampaincheckday === undefined) {
    //   this.dailycampaincheckday = 1;
    // }
    this.rowData = [];
    this.db.list('ongoingcampaindata/', { 'day': this.dailycampaincheckday }, ((response) => {
      debugger;
      this.rowData = response;
      this.filtercheck = true;
      this.gongoingcampaindata = response;
    })
    );
  }
  conversation(entity): void {
    debugger;
    this.callconversation = entity;
    //          /  this.conversations = JSON.parse(entity.conversation);
    // $('#conversation').modal('show');
    $('#player').html('<iframe src="' + this.db.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');

    this.conversationsobj = [];
    // this.callconversation=entity;
    this.db.show('calldetail/', entity.id, ((response): void => {
      //debugger;
      this.conversations = JSON.parse(response.conversation);
      for (const con in this.conversations) {
        if (true) {
          if (this.conversations['audio']) {
            this.conversationsobj.push({
              //key: Object.keys(con).toString(),

              key: con.split('__')[0],
              value: this.conversations[con].text,
              start_speaking: this.conversations[con].start_speaking,
              end_speaking: this.conversations[con].end_speaking,
              start_transcribe: this.conversations[con].start_transcribe,
              end_transcribe: this.conversations[con].end_transcribe,
              audio: this.conversations[con].audio,
              text: this.conversations[con].text,
              // start_speaking: this.conversations[con].start_speaking,
              //            start_speaking: this.conversations[con].start_speaking,

            })
          } else if (this.conversations[con].text != null) {
            this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
          } else {
            // this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
            this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con] })
          }
        }
      }
      $('#conversation').modal('show');
    })
    );

  };
  chat(entity): void {
    debugger;
    this.chatconversation = entity;
    //          /  this.conversations = JSON.parse(entity.conversation);
    // $('#conversation').modal('show');
    $('#player').html('<iframe src="' + this.db.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');

    this.chatobj = [];
    // this.callconversation=entity;
    this.db.show('chatdetail/', entity.id, ((response): void => {
      debugger;
      const chats = (response.conversation);
      this.breakchat = chats.split(';');
      // for (const con in this.chats) {



      //   if (true) {
      //     //if (this.conversations['audio']) {
      //     this.conversationsobj.push({
      //       //key: Object.keys(con).toString(),

      //       key: con.split('__')[0],
      //       value: this.conversations[con].text,
      //       start_speaking: this.conversations[con].start_speaking,
      //       end_speaking: this.conversations[con].end_speaking,
      //       start_transcribe: this.conversations[con].start_transcribe,
      //       end_transcribe: this.conversations[con].end_transcribe,
      //       audio: this.conversations[con].audio,
      //       text: this.conversations[con].text,
      //       // start_speaking: this.conversations[con].start_speaking,
      //       //            start_speaking: this.conversations[con].start_speaking,

      //     })
      //     // } else if (this.conversations[con].text != null) {
      //     //   this.chatobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
      //     //  } else {
      //     // this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
      //     //this.chatobj.push({ key: con.split('__')[0], text: this.conversations[con] })
      //     // }
      //   }
      // }
      $('#chat').modal('show');
    })
    );

  };
  compeletedcampaindata() {
    debugger;
    this.db.list('getcompletedcampaindatabs/', {}, ((response) => {
      debugger;
      this.rowData = response;
      this.gridOptions = response;

      this.gongoingcampaindata = response;
      this.filtercheck = false;

    })
    );
  }
  filterwithdate() {
    debugger
    if (this.filtercheck === true) {
      if (this.dailycampaincheckday === undefined) {
        this.dailycampaincheckday = 1;
      }
      this.db.list('ongoingcampaindata/', {
        'day': this.dailycampaincheckday,
        'start_date': this.db.toYYMMDD(this.startdate),
        'end_date': this.db.toYYMMDD(this.enddate)

      }, ((response) => {
        debugger;
        this.rowData = response;
        this.filtercheck = true;
        this.gongoingcampaindata = response;
      })
      );
    } else {
      this.db.list('getcompletedcampaindata/', {
        'start_date': this.db.toYYMMDD(this.startdate),
        'end_date': this.db.toYYMMDD(this.enddate)

      }, ((response) => {
        debugger;
        this.rowData = response;
        this.filtercheck = false;
        this.gongoingcampaindata = response;
      })
      );
    }
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
        ;
        // this.rowData = response;
        // this.candidatedetails = response;

        // this.historydata = response;
        // this.gridOptions = response;



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
    this.db.list('loadlocation/', null, ((response): void => {
      this.addresses = response;
    }));
  }

  filterhistory(): void {

    if (this.searchcandidatetext.length !== 0 || this.searchcandidatetext.length !== undefined) {
      const main = [];

      for (const i in this.candidatedetails) {
        if (i) {
          for (const j in this.candidatedetails[i]) {
            if (this.candidatedetails[i][j] != null && (this.candidatedetails[i][j].toString()).
              indexOf((this.searchcandidatetext)) === 0) {
              main.push(this.candidatedetails[i]);
              break;
            }

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

        case 'conversation':
          return this.conversation(data);
        case 'chat':
          return this.chat(data);
      }
    }
  }





  candidatesave = function () {
    this.currentpage = this.gridApi.paginationGetCurrentPage();
    this.db.store('addnewcandidatehistory/', this.store, ((response): void => {
      $('#addcandidate').modal('hide');
      $('#uploadresume').modal('show');
      this.LoadHistory();
      this.db.addmessageandremove('Candidate added successfully.');

    }));
  }



  onGridReady(params) {
    this.gridApi = params.api;

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

