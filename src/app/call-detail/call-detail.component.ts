import { Component, OnInit } from '@angular/core';
import { DBService } from '../db.service';
declare var $: any;
@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit {
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  http_or_https = 'http';
  recruiter;
  conversations = [];
  displaydd = 'Job';
  private gridColumnApi;
  pageSize: any;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CallDetailComponent,
      width: 1000,
    },

  ];
  rowData = [
  ];
  jobslistbyclients: any = [];
  profile: any = {};
  callconversation: any = {};
  jobitemselected: any = {};
  activities: any = [];
  copycandidate: any = {};
  cv_to_panel: any = {};
  vendornew: any = {};
  sendtracker: any = {};
  commentstatus: any = {};
  trackerdatamyjob: any = {};
  jobslist: any = [];
  status_show: any = {};
  gridmyjoblist: any = {};
  // loadmyjoblist: any={};
  showmyjoblist: any = {};
  updateid: any = {};
  lower: any;
  upper: any;
  ishidereference: false;
  status: any = {};
  item: any = {};
  gridOptionsloadcandidatesInPopUp: any = {};
  candidatedetails: any = {};
  FH: any = {};
  mainprocess: any;
  childprocess: any;
  ajid: any = {};
  trackerno: any = {};
  ShowCandidates = false;
  searchcandidatetext: any = '';
  searchcandidate: any = {};
  currentfilter: any = {};
  jobslistlength: any = {};
  exportdata: any = {};
  currentPage: any = {};
  selectedjob: any = {};
  isfilter = false;
  filter: any = {};
  jobslistmain: any = {};
  filterdropdown: any = {};
  isinterview: any = {};
  filterpopup: any;
  process: any;
  clientdetails: any;
  locations: any;
  location: any;
  downloadcv: false;
  jobidcvupload: any;
  addtojobmessage: any;
  vendors: any;
  cvslists: any;
  inovoicedata: any;
  trim: any;
  addpopup: any;
  managers: any;
  allstatusload: any;
  entityvar: any;
  allstatus: any;
  currentstatusname: any;
  currentstatusid: any;
  showowner: any;
  statuses: any;
  interviewquestion: any;
  myjob: any = {};
  functionalArea: any;
  atjidentity: any;
  mp: any;
  jobadd: any;
  functionalareas: [];
  functionalAreaName: any;
  trackerlist: any;
  jobidforReference: any;
  departments: any;
  prmSubject: any;
  prmMessagge: any;
  delete: any;
  clients: any;
  industries: [];
  // start_date: '2000-01-01';
  // end_date: number = Date.now();


  childprocessnewvar: any;
  gridheader: any;
  mainprocessnewvar: any;
  // ShowCandidates:false;
  entity: any = {};
  candidateinpopup: any = {};
  download: any = {};
  countRowsinMyJob: any;
  gridApipopup: any = {};
  gridmyjoblistApi: any = {};
  isLoadingJobs = false;
  $url = 'http://www.passivereferral.com/refer/';
  $urlapply = 'http://www.passivereferral.com/apply/';
  today = new Date();
  start_date = '';
  constructor(public db: DBService) {
    // this.start_date = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  ngOnInit() {
    this.bindJob();
    this.callallfunction();

  }
  bindJob(): void {
    this.isLoadingJobs = true;
    this.db.list('joblistbycall/', {}, ((response): void => {
      this.jobslist = response;
      this.isLoadingJobs = false;

    })
    );
  }


  callallfunction(): void {
    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
      console.log(response);

    })
    );
    this.db.list('clientdetail/', null, ((response): void => {
      this.clientdetails = response;
      console.log(response);
    })
    );

    this.locations = [];
    this.db.list('location', null, ((response): void => {
      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }
    })
    );
    this.db.list('functionalarea/', null, (response): void => {

      this.functionalareas = response;
    });


    this.db.list('industry/', null, function (response) {

      this.industries = response;
    }, function (response) {
      // this.token=response.statusText;
    });

    this.db.list('clientdetail/', null, ((response): void => {
      this.clientdetails = response;
      this.clients = response;
      console.log(response);
    })
    );
  }


  // this.status_show(): void {
  //     //'to be verified', 'correct', 'incorrect', 'not sure'
  //     if (status == 'to be verified') {
  //         return 'fa-question-circle-o text-info';
  //     } else if (status == 'correct') {
  //         return 'fa-thumbs-o-up text-success';
  //     } else if (status == 'incorrect') {
  //         return 'fa-thumbs-o-down text-danger';
  //     } else if (status == 'not sure') {
  //         return 'fa-arrows-h text-alert';
  //     }




  // };
  // this.tochangevendor = false;

  // this.changevendor = function (bv_vendor_id) {
  //     this.bv_vendor_id = bv_vendor_id;

  // }
  // this.setbvvendor = function () {
  //     var row = this.atjrow;
  //     this.db.store('setbvvendor', {atj_id: row.ajid, candidate_detail_id: row.id, id: row.onboardingid, bv_vendor_id: this.bv_vendor_id}, function (response) {

  //         alert('done');
  //     });

  // };

  // this.db.list('bvvendor/', null, function (response) {



  //     try {
  //         this.bvvendors = response;
  //     } catch (e) {
  //         console.info(e);
  //     }

  // }, function (response) {
  //     //this.token=response.statusText;
  // });

  loadmyjoblist(): void {
    this.showmyjoblist = !this.showmyjoblist;
    this.db.list('allcandidatesmyjoblist/', {}, ((response): void => {
      this.gridmyjoblist.data = response;
    })
    );

  };

  setupdateid = function (id) {
    this.updateid = id;
    $('#candidatenots').modal('show');
  };
  getnotes(id): void {
    this.updateid = id;
    $('#notesdetail').modal('show');
    //GetNotes();
  };

  //alert('myjob');

  //$('.validate').validate('#addnewjobform');
  //$('.validate').validate('#assignCandidate');
  //$('.validate').validate('#submitjob');
  vendorsave(): void {
    let min = 10;
    let max = 5000;
    this.lower = min;
    this.upper = max;
    this.db.store('vendor/', this.vendornew, ((response): void => {
      if (response.d == true) {
        alert(response.msg);
      }
    })
    );
  };



  submit_cv_to_panel_status(): void {
    // debugger;
    this.db.list('submit_cv_to_panel_status/', {}, ((response): void => {

      this.cv_to_panel = { status: response };
      $('#submit_cv_to_panel_status').modal('show');


    })
    );

  };

  sendCvToPanel(): void {
    if (!$('.validate').validate('#mynewjob')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }
    const allrow = this.db.getIDs(this.db.nodetype);

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidate to send to panel.');
    } else {
      this.cv_to_panel.allrow = allrow;
      this.db.store('sendtopanelcvemail', this.cv_to_panel, ((response) => {
        if (response.msg) {
          this.db.showMessage(response.msg);
        } else {

          for (const k in allrow) {
            if (allrow[k]) {
              this.ajid = allrow[k];
              this.commentstatus = {
                ajid: parseInt(allrow[k], 0),
                comment: this.cv_to_panel.comment,
                status: this.cv_to_panel.status,
              };

              this.updatestatuscommentmyjob(false);
              this.db.showMessage('Cv Submitted to panel.');
            }

          }
        }
      }), ((response): void => {
        this.db.showMessage('Try again.');
      })
      );
    }

  };
  tag(item): void {

    //  debugger;
    if (item.tagged != '10') {
      this.db.destroy('jobtag/', this.item.id, ((response): void => {
        this.item.tagged = '10';
      })
      );
    }
    else {

      this.db.store('jobtag/', { job_id: item.id }, ((response): void => {
        this.item.tagged = '11';
      })
      );

    }

  };
  is_approved_by_manager(item): void {

    // debugger;
    if (item.is_approved_by_manager != '0') {
      this.db.store('removeapprovedbymanager/', { job_id: this.item.id }, ((response): void => {
        this.item.is_approved_by_manager = '0';
      })
      );
    } else {

      this.db.store('approvedbymanager/', { job_id: this.item.id, }, ((response): void => {
        this.item.is_approved_by_manager = '1';
      })
      );
    }

  };



  updatestatuscommentmyjob = function (showpopup) {
    if (typeof showpopup === 'undefined') {
      showpopup = true;
    }
    this.commentstatus.ajid = this.ajid;
    // this.commentstatus.recruiterid=this.recruiterid;
    this.db.store('csr/', this.commentstatus, ((response): void => {
      $('#commentstatus').modal('hide');
      this.filterdrbytab();
      this.commentstatus = {};

      this.loadCandidate();
      this.cancel();
      if (showpopup) {
        this.db.showMessage('Status changed successfully.');
      }
    }), ((response): void => {
      if (showpopup) {
        this.db.ShowPopUp('Please try again.');
      }
    }));
  };




  selectdeselect(event, item): void {

    if (!event.ctrlKey) {
      for (const i in this.jobslist) {
        if (this.jobslist[i]) {
          this.jobslist[i].selected = false;
        }
      }
    }
    item.selected = !item.selected;
  };

  purposechange(): void {

    //

    if ($('#purpose').find('option:selected').attr('isinterview') === '2') {
      $('#offerhide').show();
    } else {
      $('#offerhide').hide();
    }

    if ($('#purpose').find('option:selected').attr('isinterview') === '1') {
      $('#business').show();
    } else {
      $('#business').hide();
    }

  };


  filterhistory(): void {
    const countRowsinMyJob = 0;
    const filterdropdown = '';
    const process = 'all';
    const mainprocess = 0;
    const searchcandidatetext = '';
    const isfirstload = 0;
    const selectedjob = 0;
    this.gridOptionsloadcandidatesInPopUp.columnDefs = this.columnDefs;

    if (searchcandidatetext.length > 0) {
      const main = [];
      const candidatedetails = '';
      for (const i in this.candidatedetails) {
        if (this.candidatedetails[i]) {
          for (const j in this.candidatedetails[i]) {
            if (this.candidatedetails[i]) {
              const jk = this.candidatedetails[i][j];
              console.log(jk);
              if (this.candidatedetails[i][j] != null
                && this.candidatedetails[i][j].toString().toLowerCase().indexOf(this.searchcandidatetext.toLowerCase()) != -1) {
                main.push(this.candidatedetails[i]);
                break;
              }
            }
          }
        }
      }
      this.gridOptionsloadcandidatesInPopUp.data = main;
    } else {
      this.gridOptionsloadcandidatesInPopUp.data = this.candidatedetails;
    }
  };
  filterpopupfunction(): void {
    // debugger;
    if (this.trim(this.filterpopup.length) === 0) {
      this.gridOptionsloadcandidatesInPopUp.data = this.candidateinpopup;
    } else {
      //  debugger;
      const dataafterfilter = [];
      for (const i in this.candidateinpopup) {
        if (this.candidateinpopup[i]) {
          let currentdata = this.candidateinpopup[i];
          for (const t in currentdata) {
            const val = currentdata[t];
            if (!isNaN(val) && val != null) {
              try {
                val = val.toString();
              } catch (e) {

              }
            }
            if (typeof val == 'string' && val.toLowerCase().indexOf(this.filterpopup.toLowerCase()) != -1) {
              dataafterfilter.push(currentdata);
              break;
            }
          }
        }
      }

      this.gridOptionsloadcandidatesInPopUp.data = dataafterfilter;
    }
  }

  openpopup(id): void {
    window.open(this.http_or_https + '://api.passivereferral.com/recording/?id='
      + id, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=400,height=150');
  }
  loadCandidate = function () {

    //
    let SelectedJob = ''
    if (this.isfirstload !== 1) {
      // SelectedJob = FH.SelectedCheckboxWithComma(this.jobslist);
    } else {
      SelectedJob = this.selectedjob;
    }
    SelectedJob = this.selectedjob;
    //        var totalrow=this.gridApipopup.selection.getSelectedRows();
    //             SelectedJob= FH.SelectedWithComma(totalrow,'id');
    this.globaljobid = SelectedJob;
    const Search = {
      filterdropdown: this.filterdropdown,
      process: this.process,
      mainprocess: this.mainprocess,
      searchcandidatetext: this.searchcandidatetext,
      selectedjob: SelectedJob,
      candidate: this.searchcandidate,
      isinterview: this.isinterview,
      start_date: this.item.start_date,
      end_date: this.item.end_date
    };

    $('#conversation').on('hidden.bs.modal', function () {
      $('#player').html('');
      // put your default event here
    });





    this.rowData = [];
    this.db.list('callcandidatesdetailmyjob/', Search, ((response): void => {
      // debugger;
      // this.gridOptionsloadcandidatesInPopUp.columnDefs = this.columnDefs;
      this.candidatedetails = response;
      this.rowData = response;
      this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
        return this.candidatedetails;
      };
      this.candidateinpopup = response;
    })
    );
  };

  conversation(entity): void {
    this.callconversation = entity;
    //          /  this.conversations = JSON.parse(entity.conversation);
    // $('#conversation').modal('show');
    $('#player').html('<iframe src="' + this.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');


    // this.callconversation=entity;
    this.db.show('calldetail/', entity.call_id, ((response): void => {
      this.conversations = JSON.parse(response.conversation);
      $('#conversation').modal('show');
    })
    );

  };


  sendtrackermsg(download): void {

    if (download) {
      this.download = true;
    } else {
      this.download = false;

    }
    if (this.countRowsinMyJob > 0) {
      var totalrow = 0;
      if (this.showmyjoblist) {
        totalrow = this.gridApipopup.selection.getSelectedRows();
      } else {
        totalrow = this.gridmyjoblistApi.selection.getSelectedRows();
      }
      var allrow = FH.SelectedWithComma(totalrow, 'ajid');
      this.sendtracker.atjids = allrow;
      if (this.download) {
        this.sendtracker.download = true;
      } else {
        this.sendtracker.download = false;
      }
      this.db.store('sendtracker', this.sendtracker, ((response): void => {
        if (this.download) {
          const resumes = response.resumes;
          let resumehtml = '';
          if (resumes.length > 0) {
            resumehtml = '</br> <h3>Resume List</h3> <div class="list - group">';
            for (const k in resumes) {
              if (resumes[k]) {
                resumehtml += '<a target="_blank" class="list - group - item" '
                  + ' href="http://api.passivereferral.com/resumes/' + resumes[k].resume
                  + '" > ' + resumes[k].name + ' < /a>';
              }
            }
            resumehtml += '</div>';
          }
          this.db.showMessage('Your excel is ready.<a  href="http://api.passivereferral.com/trackers/'
            + response.excel + '" > Click Here < /a> to Download ' + resumehtml, 'Excel Prepared');
        } else {
          this.db.addmessageandremove('tracker sent');
        }
      })
      );
    } else {
      this.db.addmessageandremove('Please Select CV');
    }
  };

  downloadtracker(): void {


    this.download = true;


    if (this.countRowsinMyJob > 0) {
      let totalrow = 0;
      if (this.showmyjoblist) {
        totalrow = this.gridApipopup.selection.getSelectedRows();
      } else {
        totalrow = this.gridmyjoblistApi.selection.getSelectedRows();
        this.sendtracker.trackerno = this.trackerno;
      }
      const allrow = this.db.SelectedWithComma(totalrow, 'ajid');
      this.sendtracker.atjids = allrow;
      if (this.download) {
        this.sendtracker.download = true;
      } else {
        this.sendtracker.download = false;
      }
      this.db.store('sendtracker', this.sendtracker, (r): void => {
        if (this.download) {
          this.db.showMessage('Your excel is ready.' +
            '<a href="http://api.passivereferral.com/trackers/' + r.excel + '">Click Here</a> to Download'
            , 'Excel Prepared');
        } else {
          this.db.addmessageandremove('tracker sent');
        }
      }, (r): void => {
        if (r.errormsg !== undefined) {
          this.db.addmessageandremove(r.errormsg);
        } else {
          this.db.addmessageandremove('Some error occured');
        }
      });
    } else {
      this.db.addmessageandremove('Please Select CV');
    }
  };


  searchtermchange(): void {
    // const displaydd = 'Jobs';
    // const currentfilter = 'jobs';
    this.searchcandidatetext = '';
    this.searchcandidate = '';
    if (this.currentfilter === 'jobs') {
      $('#candidatessearch').hide();
      $('#jobssearch').show();


    } else {
      $('#candidatessearch').show();
      $('#jobssearch').hide();


    }
  };
  filteragain(): void {
    this.jobslistlength = this.numberOfPages(this.jobslist);
    this.exportdata.data = this.jobslist;
  }
  numberOfPages(data): number {
    let text;
    try {
      text = Math.ceil(data.length / this.pageSize);
    } catch (e) {
      text = 0;
    }
    return text;
  }

  // searchtermchange();
  bindJoblist(data): void {
    this.jobslist = data;
    this.currentPage = 0;
    this.jobslistlength = this.numberOfPages(this.jobslist);
    if (this.selectedjob !== 0) {
      for (const j in this.jobslist) {
        if (this.jobslist[j].id === this.selectedjob) {
          this.jobslist[j].selected = true;
        }

      }

    }
  };

  changefilter(val, type): void {

    this.isfilter = true;
    let data = [];

    this.filter = val;
    if (val === 'All') {
      data = this.jobslistmain;
    } else
      if (type === 'job_status') {
        for (const i in this.jobslistmain) {
          if (this.jobslistmain[i].job_status === val) {
            data.push(this.jobslistmain[i]);
          }
        }

      } else if (type === 'website') {
        for (const i in this.jobslistmain) {
          if (this.jobslistmain[i].visibleonwebsite === 1) {
            data.push(this.jobslistmain[i]);
          }
        }
      } else if (type === 'tagged') {

        for (const i in this.jobslistmain) {
          if (this.jobslistmain[i].tagged === '11') {
            data.push(this.jobslistmain[i]);
          }
        }
      } else if (type === 'interview') {

        for (const i in this.jobslistmain) {
          if (this.jobslistmain[i].candidates_interview_count !== 0) {
            data.push(this.jobslistmain[i]);
          }
        }
      } else if (type === 'hascall') {
        for (const i in this.jobslistmain) {
          if (parseInt(this.jobslistmain[i].allcalledcandidate, 0) > 0) {
            data.push(this.jobslistmain[i]);
          }
        }
      }

    this.bindJoblist(data);
  };

  getlist(): void {
    // if (!$('.validate').validate('#myModal')) {
    //   //  $.fn.showMessage('Please fill values');
    //   return;
    // }
    this.item.start_date = this.db.toYYMMDD(this.item.start_date_temp);
    this.item.end_date = this.db.toYYMMDD(this.item.end_date_temp);
    this.db.list('joblistbycall/', this.item, ((response): void => {
      this.jobslistmain = response;
      // this.item=response;
      this.changefilter('hascall', 'hascall');
      this.bindJoblist(this.jobslistmain);
    })
    );
  };


  filterdropdownfunction(choice, display): void {

    this.filterdropdown = choice;
    this.displaydd = display;
    this.currentfilter = choice;
    this.searchtermchange();
    //this.filterbyJob();
    if (choice === 'jobs') {
      this.getlist();
    }

  };
  openaddvendor(): void {
    $('#addvendor').modal('show');
  }

  filterbycandidate(): void {
    let filterjobTimeOut = null;
    if (filterjobTimeOut != null) {
      clearTimeout(filterjobTimeOut);
    }
    filterjobTimeOut = setTimeout(function () {
      this.getlist();
    }, 1000);

    this.searchcandidatetext = '';
  };
  filterdrbytab(mainprocess, childprocess, jobitem): void {
    this.isinterview = 9;
    if (childprocess === 'isinterview') {
      childprocess = 'all';
      this.isinterview = 1;
    }

    this.jobitemselected = jobitem;
    if (mainprocess == null) {
      mainprocess = this.mainprocessnewvar;
    }
    if (childprocess == null) {
      childprocess = this.childprocessnewvar;
    }
    this.mainprocessnewvar = mainprocess;
    this.childprocessnewvar = childprocess;
    if (childprocess == 'allcalled') {
      this.gridheader = 'All';
    } else if (childprocess == 'calledinterested') {
      this.gridheader = 'Interested';
    } else if (childprocess == 'callednotinterested') {
      this.gridheader = 'Not Interested';
    } else if (childprocess == 'callbackrequest') {
      this.gridheader = 'Call Back Request';
    } else if (childprocess == 'incompletecall') {
      this.gridheader = 'No Status';
    } else if (childprocess == 'couldnotconnect') {
      this.gridheader = 'Could not Connect';
    }
    if (jobitem != null) {
      this.selectedjob = jobitem.id;

      // this.selectedjoball = jobitem.allcandidate;
      // this.selectedjobunderreview = jobitem.underreview;
      // this.selectedjobinprocess = jobitem.inprocess;
      // this.selectedjobselectedcandidate = jobitem.selectedcandidate;
      // this.selectedjobrejected = jobitem.rejected;
      // this.selectedjobininterview = jobitem.candidates_interview_count;
    }
    this.process = childprocess;
    if (mainprocess === 'My Referrals') {
      this.mainprocess = 1;
      //            $('#1b .nav li').removeClass('active');
      //            $('#1b .nav li').eq(0).addClass('active');
    } else {
      //            $('#2b .nav li').removeClass('active');
      //            $('#2b .nav li').eq(0).addClass('active');
      this.mainprocess = 0;
    }
    this.filterbyJob();
  };

  filterbyJob(): void {

    this.loadCandidate();
    this.ShowCandidates = true;
  };


  addtojobcandidates(): void {
    if ($('.validate').validate('#assignCandidate', true)) {
      this.addtojobmessage = '';
      // var totalrow=this.gridApipopup.selection.getSelectedRows();
      // var allrow= '';//FH.SelectedWithComma(totalrow,'id');//
      const totalrow = this.gridApipopup.selection.getSelectedRows();
      const allrow = this.db.SelectedWithComma(totalrow, 'id');
      const copyjob = {
        'candidates': allrow,
        'job': this.copycandidate.job_id,
        'manager': this.copycandidate.manager
      };
      this.db.store('copyjob/', copyjob, ((response): void => {



        this.getlist();
        // for (let i in this.candidates) {
        //   if(this.candidates)
        //   this.myjob[i] = '';
        // }
        if (response.alreadyexists > 0) {
          this.addtojobmessage = response.alreadyexists + ' Candidate(s) already in pipeline.';
        } else {
          this.addtojobmessage = 'Assign Candidate Successfully';

        }
        alert(this.addtojobmessage);

      })
      );
    }
  }



  selectedmanagerlistset(id): void {
    const selectedmanagerlist = [];
    if (selectedmanagerlist.indexOf(id) > -1) {
      selectedmanagerlist.pop();
    } else {
      selectedmanagerlist.push(id);
    }

  }

  assignjobClick(): void {
    let selected = 0;
    let job_id = 0;

    for (const m in this.managers) {
      if (true) {
        this.managers[m].selected = false;
      }
    }
    for (const i in this.jobslist) {
      if (this.jobslist[i].selected) {
        selected = selected + 1;
        job_id = this.jobslist[i].id;
      }
    }
    if (selected === 1) {
      this.db.list('recruiterunderjob/', {
        job_id: job_id
      }, ((response): void => {
        const recruiterunderjoblist = response;
        for (const k in recruiterunderjoblist) {
          if (recruiterunderjoblist[k]) {
            for (const m in this.managers) {
              if (recruiterunderjoblist[k].recruiter_id === this.managers[m].id) {
                this.managers[m].selected = true;
                break;
              }
            }
          }
        }
        $('#myModal-4').modal('show');
      }));

    } else {
      if (selected > 1) {
        alert('Please select one job\n' + selected + ' selected!!');
      } else if (selected < 1) {
        alert('Please select job');
      }
    }
  };

  assignjobClickToVendor(): void {
    let selected = 0;
    let job_id = 0;

    for (const m in this.vendors) {
      if (this.vendors[m]) {
        this.vendors[m].selected = false;
      }
    }
    for (const i in this.jobslist) {
      if (this.jobslist[i].selected) {
        selected = selected + 1;
        job_id = this.jobslist[i].id;
      }
    }
    if (selected === 1) {
      this.db.list('vendorunderjob/', {
        job_id: job_id
      }, ((response): void => {
        const vendorunderjoblist = response;
        for (const k in vendorunderjoblist) {
          if (vendorunderjoblist[k]) {
            for (const m in this.vendors) {
              if (vendorunderjoblist[k].vendor_user_id === this.vendors[m].id) {
                this.vendors[m].selected = true;
                break;
              }
            }
          }
        }
        $('#vendor').modal('show');
      }));

    } else {
      if (selected > 1) {
        alert('Please select one job\n' + selected + ' selected!!');
      } else if (selected < 1) {
        alert('Please select job');
      }
    }
  };

  assignjob(): void {
    const assignjob = {
      // 'managers': FH.SelectedCheckbox(this.managers),
      // 'jobs': FH.SelectedCheckbox(this.jobslist)
    };
    this.db.store('assignjob/', assignjob, ((response): void => {
      console.log(response);
    }));
  };


  unassignjob(): void {
    const unassignjob = {
      // 'managers': FH.SelectedCheckbox(this.managers),
      // 'jobs': FH.SelectedCheckbox(this.jobslist)
    };
    this.db.store('unassignjob/', unassignjob, ((response): void => {
      console.log(response);


    }));
  };


  assignjobtovendor(): void {
    const assignjob = {
      // 'vendors': FH.SelectedCheckbox(this.vendors),
      // 'jobs': FH.SelectedCheckbox(this.jobslist)
    };
    this.db.store('assignjobtovendor/', assignjob, ((response): void => {
      console.log(response);
      this.db.addmessageandremove('Assigned Jobs');
    }));
  };


  unassignjobtovendor(): void {
    const unassignjob = {
      // 'vendors': FH.SelectedCheckbox(this.vendors),
      // 'jobs': FH.SelectedCheckbox(this.jobslist)
    };
    this.db.store('unassignjobtovendor/', unassignjob, ((response): void => {

      this.db.addmessageandremove('Un-Assigned Jobs');
    }));
  };






  showcvs(jobid): void {

    this.jobidcvupload = jobid;
  };
  cvformdatapost(): void {
    const formData = [];
    console.log(this.cvslists);
    $('#cvformdata .rowtr').each(function () {
      const Row = {
        'jobid': this.jobidcvupload
      };
      $(this).find('.key').each(function () {
        const key = $(this).attr('key');
        Row[key] = $(this).val();
        //                if (key == 'email') {
        //
        //                    for (var j in this.cvslists) {
        //                        if (this.cvslists[j].email == $(this).val()) {
        //                            Row['resume'] = this.cvslists[j].file;
        //                        }
        //                    }
        //
        //                }

      });
      formData.push(Row);
    });
    this.db.store('uploadcvs/', {
      cvs: formData
    }, ((response): void => {
      const responsedata = response;
      for (let tt in this.cvslists) {
        let email = this.cvslists[tt].email;
        for (var d in responsedata.alreadyexists) {
          if (responsedata.alreadyexists[d] === email) {
            this.cvslists[tt].statusofsubmit = 'fail';
            break;
          }
        }
        for (var d in responsedata.newcv) {
          if (responsedata.newcv[d] === email) {
            this.cvslists[tt].statusofsubmit = 'done';
            break;
          }
        }

      }
    })
    );
    for (const t in this.cvslists) {
      if (this.cvslists[t]) {
        const data = {
          file: this.cvslists[t].file,
          email: this.cvslists[t].email,
          'jobid': this.jobidcvupload
        };
        this.db.store('uploadcvs/', data, function (response) { });
      }
    }
    console.log(formData);
  };
  upload(file, jobid): void {

    this.jobidcvupload = jobid;
    this.db.store('getcvexceldata/', {
      file: file
    }, function (response) {
      $('#showcvs').modal('show');
      this.cvslists = response;
    }, function (response) {
      this.db.addmessageandremove('Please try again');
    }, function (percentage, response) {
      document.title = percentage;
    });
  };
  uploadinvoicevendor(file, invoiceid): void {
    if (file != null) {
      //  debugger;
      this.inovoicedata = {};
      this.inovoicedata.file = file;
      this.inovoicedata.invoiceid = invoiceid;
      this.db.store('uploadinvoicevendor/', this.inovoicedata, function (response) {
        this.db.addmessageandremove('uploaded', '#candidatesall');
        alert('uploaded');
      }, function (response) {
        this.db.addmessageandremove('Please try again', '#candidatesall');
      }, function (percentage, response) {
        document.title = percentage;
      });
    }
  };
  loadmyteam(): void {
    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
      console.log(response);
    })
    );
  };

  loadvendor(): void {

    this.db.list('vendor/', null, ((response): void => {
      this.vendors = response;

    }));

    this.assignjobClickToVendor();
  };

  comment(entity): void {
    this.allstatusload = 0;
    this.entityvar = {};
    if (entity) {
      this.entityvar = entity;
    } else {
      entity = this.entityvar;
    }
    if (this.allstatus) {
      this.allstatusload = 1;
    } else {
      this.allstatusload = 0;
    }

    //  debugger;
    if (entity.recruiter_id == null) {
      this.showowner = true;
    } else {
      this.showowner = false;
    }
    this.ajid = entity.ajid;
    this.ajid = entity.ajid;
    console.log(entity);
    this.currentstatusid = entity.status_id;
    this.currentstatusname = entity.display_name;
    this.db.list('csr/' + entity.status_id, { allstatus: this.allstatusload }, ((response): void => {
      $('#business').hide();
      $('#offerhide').hide();
      this.statuses = response;
      $('#commentstatus').modal('show');
      //            $mdDialog.show({
      //                contentElement: '#commentstatus',
      //                parent: angular.element(document.body),
      //                clickOutsideToClose: true,
      //                fullscreen: false,
      //                disableParentScroll: false
      //
      //            });
    })
    );
  }


  // $.fn.ShowPopUp('Please try again.', 'Status', 'sm');
  getcandidatebyclient(): void {

    this.db.list('addnewjob/', {
      clientId: this.copycandidate.client_detail_id
    }, ((response): void => {
      this.jobslistbyclients = response;
    })
    );
  }

  // this.getlist();

  // addNewJobSave():void {
  //   this.interviewquestion = {};

  //  // if ($('.validate').('#addnewjobform', true)) {
  //     //this.user.profilepic=this.user.profilepic[0];
  //     // var locations = this.location;
  //     // var locationstr = '';
  //     // for (var j in locations) {
  //     //   locationstr += locations[j] + ',';
  //    // }
  //    // this.myjob.location = locationstr;
  //     this.myjob.functionalArea = this.functionalArea.functionalAreaName;
  //     this.db.store('addnewjob/', this.myjob,  ((response):void => {
  //       this.db.addmessageandremove('Data save Successfully');
  //       this.getlist();
  //       for (let i in this.myjob) {
  //         this.myjob[i] = '';
  //       }

  //     })
  //     );
  //   }
  // };
  // removecandidate(entity): void {

  //   this.db.store('removecandidate/' + entity.ajid, {}, ((response): void => {

  //     if (response.msg == '1') {
  //       this.loadCandidate();
  //       this.db.addmessageandremove('deleted', $('#candidatesall'));
  //     } else {
  //       this.db.addmessageandremove('can't delete', $('#candidatesall'));
  //     }
  //   }, function () {
  //     this.db.addmessageandremove('Please try again', $('#candidatesall'));
  //   })
  //   );
  // };


  setatjidentity(entity): void {
    this.atjidentity = {};
    // this.job = job;
    this.atjidentity = entity;
    $('#trackerDetailExtra').modal('show');
    this.db.list('trackerdatacustom/', { ajid: entity.ajid }, ((response): void => {
      // debugger;
      this.trackerdatamyjob = response;
    })
    );

  };
  setatjidentitysave(trackerdatamyjob): void {
    //this.job = job;
    // this.atjidentity = entity;
    $('#trackerDetailExtra').modal('show');
    // debugger;
    trackerdatamyjob.ajid = this.atjidentity.ajid;
    this.db.store('trackerdatacustom/', trackerdatamyjob, ((response): void => {
      this.db.addmessageandremove('Saved');
    })
    );

  };
  activity(entity): void {
    // this.job = job;

    this.db.show('addtojob/activity/', entity.ajid, ((response): void => {
      this.activities = response;
      $('#activity').modal('show');
      //            $mdDialog.show({
      //                contentElement: '#activity',
      //                parent: angular.element(document.body),
      //                clickOutsideToClose: true,
      //                fullscreen: false,
      //                disableParentScroll: false
      //
      //            });
    })
    );
  };
  getrole(): void {

    console.log(this.functionalArea);
    //        this.jobroles = [];
    //        var code = this.functionalArea.code;
    //        if (code != null) {
    //            code = code.replace('#', '');
    //            code = code.split('.')[0];
    //            code = parseInt(code);
    //            arrRoleload = arrRoles[code];
    //            //  console.log(arrRoleload);
    //            for (var i in arrRoleload) {
    //                if (i.indexOf('a') === -1) {
    //                    this.jobroles.push(arrRoleload[i]);
    //                }
    //            }
    //        }
  };


  //    this.maximumSalary=[];
  //    debugger;
  //    this.db.list('maximumSalary',null,function(response){
  //        var data =response;
  //        for(i in data){
  //            i=parseInt(this.maximumSalary);
  //            this.maximumSalary.push(data[i].maximumSalary);
  //    }
  //    });

  clearSearchTerm(): void {
    const searchTerm = '';
  };
  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  // $element.find('input').on('keydown', function (ev) {
  //   ev.stopPropagation();
  // });

  showJob(id, $event): void {
    // debugger;
    $event.stopPropagation();
    // this.job = job;
    if (this.mp.add_new_job_show) {
      this.jobadd = false;
      this.db.show('addnewjob/', id, ((response): void => {



        this.myjob = response;
        try {
          this.myjob.minimumSalary = parseInt(this.myjob.minimumSalary, 0);
          this.myjob.maximumSalary = parseInt(this.myjob.maximumSalary, 0);
        } catch (e) {

        }
        if (this.myjob.tracker_id != null) {
          this.myjob.tracker_id = this.myjob.tracker_id.toString();
        }
        this.db.list('tracker/', null, ((response): void => {


          try {
            this.trackerlist = response;
            //                        if (this.trackerlist.length > 0)
            //                        {
            //                            // console.log(this.trackerlist);
            //                            this.myjob.tracker_id = this.trackerlist[0].id.toString();
            //                        }
          } catch (e) {
          }

        })
        );
        try {
          this.myjob.client_detail_id = this.myjob.client_detail_id.toString();
          this.myjob.manager_id = this.myjob.manager_id.toString();
          this.location = this.myjob.location.toString().split(',');
        } catch (e) {
          console.log(e);
        }
        // functionalareas this.functionalArea = this.myjob.functionalArea.toString();
        if (this.myjob.functionalArea != null) {
          for (const i in this.functionalareas) {
            if (this.myjob.functionalArea.toString() === this.functionalareas[i].functionalAreaName) {
              // this.functionalArea = {'id': this.functionalareas[i].id, 'functionalAreaName': this.functionalareas[i].functionalAreaName, 'code': this.functionalareas[i].code, 'ipAddress': this.functionalareas[i].ipAddress};
              this.myjob.functionalArea = this.functionalareas[i];
              this.getrole();
              break;
            }


          }
        }
        // this.functionalArea=''
        try {
          this.myjob.Industry = this.myjob.industry.toString();
          this.myjob.jobRole = this.myjob.jobRole.toString();
        } catch (e) {
          console.log(e);
        }
        //
        // changerole();
        //
        // debugger;
        $('#submitjob').modal('show');
      })
      );
    }
  };

  changerole(): void {
    // debugger;
    setTimeout(function () {
      if ($('#role').val() === 'Internship') {
        $('#internship').show();
      } else {
        $('#internship').hide();
      }

      if ($('#role').val() === 'Contract') {
        $('#contract').show();
      } else {
        $('#contract').hide();
      }

      if ($('#role').val() === 'Freelence') {
        $('#freelence').show();
      } else {
        $('#freelence').hide();
      }
    }, 10);
  };
  GetInHourseReference(id, $event): void {
    // debugger;
    $event.stopPropagation();
    this.jobidforReference = id;
    this.db.list('applicationdepartment/', null, ((response): void => {



      try {
        this.departments = response;
        $('#internalreference').modal('show');
      } catch (e) {
      }

    })
    );
  };
  getinternalreferrence(): void {
    console.log(this.departments);
    const departments = [];
    for (const k in this.departments) {
      if (this.departments[k].selected) {
        departments.push(this.departments[k].id);
      }
    }
    const dataforreference = {
      job_id: this.jobidforReference,
      departments: departments,
      prmMessagge: this.prmMessagge,
      prmSubject: this.prmSubject,
    };
    this.db.store('internalreference', dataforreference, function () {
      $('#internalreference').modal('hide');
    }, function () {

    })
  };
  changechecked(item): void {
    // debugger;
    item.selected = !item.selected;
  };

  // addNewJobupdate():void {
  //   const jobupdate = true;
  //   if ($('.validate').validate('#submitjob', true)) {

  //     var locations = this.location;
  //     var locationstr = '';
  //     var isfirstlocation = true;
  //     for (var j in locations) {
  //       if (locations[j] != '') {
  //         if (isfirstlocation) {
  //           locationstr += locations[j];
  //           isfirstlocation = false;
  //         } else {
  //           locationstr += ',' + locations[j];
  //         }
  //       }
  //     }
  //     this.myjob.location = locationstr;
  //     this.myjob.functionalArea = this.functionalArea.functionalAreaName;
  //     //            var locations = this.location;
  //     //            var locationstr = '';
  //     //            for (var j in locations)
  //     //            {
  //     //                locationstr += locations[j] + ',';
  //     //            }
  //     //            this.myjob.location = locationstr;
  //     //
  //     //            this.myjob.functionalArea = this.functionalArea.functionalAreaName;
  //     this.db.update('addnewjob/', this.myjob.id, this.myjob, function (response) {

  //       this.db.addpopup('Job Updated Successfully', 'Good job done !');
  //       this.cancel();
  //     }, function (response) {
  //       //this.token=response.statusText;
  //       this.db.addpopup('Please check if you entered wrong data.', 'Please try again !');


  //     });
  //   }
  // };
  deletes(): void {
    this.db.destroy('messagelogstatus/', this.delete.id, ((response): void => {
      console.log(response);
    })
    );
  }


  // const status = '  ';
  // this.customFullscreen = true;
  // if (this.current.params.jobid !== undefined) {
  //   this.isfirstload = 1;
  //   this.selectedjob = this.current.params.jobid;
  //   this.filterdrbytab('My Referrals', 'Under Review');
  //   this.isfirstload = 0;
  //   $('#myreferrals').parent().addClass('active').prev().removeClass('active');
  //   $('#1b').removeClass('actieve');
  //   $('#2b').addClass('actieve');
  // } else {
  //   this.loadCandidate();
  // }
  // addnewjobform(): void {

  //   this.db.show({
  //     contentElement: '#addnewjobform',
  //     parent: angular.element(document.body),
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     disableParentScroll: false
  //   });
  // };
  //    this.assignCandidate = function () {
  //
  //        $mdDialog.show({
  //            contentElement: '#assignCandidate',
  //            parent: angular.element(document.body),
  //            clickOutsideToClose: true,
  //            fullscreen: false,
  //            disableParentScroll: false
  //        });
  //    };


  submitcv(download): void {
    if (download) {
      // this.downloadcv = true;
    } else {
      //this.downloadcv = false;

    }
    this.db.list('tracker/', null, ((response): void => {


      try {
        this.trackerlist = response;
        if (this.downloadcv) {
          $('#downloadtracker').modal('toggle');
        } else {
          $('#myModal').modal('toggle');
        }
      } catch (e) {

      }

    }));
    //        $mdDialog.show({
    //            contentElement: '#submitcv',
    //            parent: angular.element(document.body),
    //            clickOutsideToClose: true,
    //            fullscreen: false,
    //            disableParentScroll: false
    //
    //        });

  };
  // submitjob = function () {

  //   $mdDialog.show({
  //     contentElement: '#submitjob',
  //     parent: angular.element(document.body),
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     disableParentScroll: false

  //   });
  // };
  // cancel():void {
  //   $mdDialog.hide();
  // }

  // testForm = function () {
  //   $mdDialog.show({
  //     contentElement: '#testform',
  //     parent: angular.element(document.body),
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     disableParentScroll: false
  //   });
  // };
  //export data





  getcandidatebyclientbyjob(): void {
    //debugger;

    this.db.list('addnewjob/', { clientId: this.copycandidate.client_detail_id }, ((response): void => {
      this.jobslistbyclients = response;

    })
    );
  };

  // sendcalltocandidates(): void {

  //   // debugger;

  //   var totalrow = this.row.selection.getSelectedRows();
  //   var allrow = this.FH.SelectedWithComma(totalrow, 'id');
  //   copyjob = {
  //     'candidates': allrow,
  //     'job': this.copycandidate.job_id,
  //     'manager': this.copycandidate.manager
  //   };
  //   this.db.store('sendcall/', copyjob, ((response): void => {

  //     console.log(response);
  //     //alert('done');
  //     // if (response.alreadyexists > 0) {
  //     //     this.addtojobmessage = response.alreadyexists + ' Candidate(s) already in pipeline.';
  //     // } else {
  //     //     this.addtojobmessage = 'Assign Candidate Successfully';

  //     // }
  //     // alert(this.addtojobmessage);
  //   })
  //   );
  // }

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



  // export():void {



  //   if ( export_format == 'csv') {
  //     var myElement = angular.element(document.querySelectorAll('.custom-csv-link-location'));
  //     exportdata.exporter.csvExport(this.export_row_type, this.export_column_type, myElement);
  //   } else if (this.export_format == 'pdf') {
  //     this.exportdata.exporter.pdfExport(this.export_row_type, this.export_column_type);
  //   }
  //   export_format = '';
  // };

}
