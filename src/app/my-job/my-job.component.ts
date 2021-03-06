import { Component, OnInit } from '@angular/core';
import { DBService } from '../db.service';
import { CandidateMyJobComponent } from '../control/candidate-my-job/candidate-my-job.component';
import { AddCandidateMyjobComponent } from '../control/add-candidate-myjob/add-candidate-myjob.component';

import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
//import { FilterPipe } from '../shared/pipes/FilterPipe.pipe';
declare var $: any;
@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss'],

})
export class MyJobComponent implements OnInit {
  private smsselected = {};
  //public  FilterPipe1 = FilterPipe;
  private emailselected = {};
  private gridApi;
  p = 0;
  recruiter;
  load: AddCandidateMyjobComponent;
  allids = [];
  displaydd = 'Job';
  private gridColumnApi;
  managers = [];
  show_all_jobs: any;
  manager: any;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateMyJobComponent,autoHeight: true, 
      width: 1000,cellStyle: { "white-space": "normal !important;"}
    },

  ];

  rowData = [
  ];
  fileToUpload: File = null;
  cvslists: any;
  jobidcvupload: any;
  responsedata: any;
  jobslistbyclients: any = [];
  profile: any = {};
  callconversation: any = {};
  jobitemselected: any = {};
  activities: any = [];
  copycandidate: any = {};
  cv_to_panel: any = {};
  gridOptionsloadcandidatesInPopUp = {};
  childprocessnewvar: any;
  gridheader: any;
  mainprocessnewvar: any;
  jobidjd: any;
  vendornew: any = {};
  sendtracker: any = {};
  jobslistlength: any;
  commentstatus: any = {};
  selectedmanagerlist: any;
   alljobclient = false;

  currentPage = 0;
  pageSize = 10;
  isinterview: any;
  trackerdatamyjob: any = {};
  isfilter: any;
  jobslist: any = [];
  selectedjob: any = 0;
  jobslistmain: any;
  filterdropdown = '';
  searchcandidatetext = '';

  searchcandidate = '';
  currentfilter = '';
  filter: any;
  ShowCandidates: any;
  selectedjoball: any;
  trackerlist = [];
  selectedjobunderreview: any;
  selectedjobinprocess: any;
  selectedjobselectedcandidate: any;
  process: any = 'all';
  hidejd = false;
  ajid: any;
  vendors: any = [];
  selectedjobrejected: any;
  downloadcv = false;
  download = false;
  selectedjobininterview: any;
  isLoadingJobs = false;
  countRowsinMyJob = 0;
  mainprocess: any = '0';
  $url = 'https://www.passivereferral.com/refer';
  $urlapply = 'https://www.passivereferral.com/apply';
  newColor = false;
  itemone = { jobDescription: '' };
  candidate_id = 0;
  currentData = {};
  hoverIndex: any;
  allstatusload = 0;
  selectednodes = [];
  ClientName: any;
  status_id = 0;
  vendorSearch: any;
  departments = [];
  prmSubject = '';
  prmMessagge = '';
  //showalljobs = '';
  trackerno: any;
  status_row: any;
  managerSearch: any;
  selectedmanager: any;
  agreed = 0;
  disagreed = 0;
  searchText: any;
  applications: any;
  jobidforReference: any;
  showtag: {};
  countviewreletedjobs: any;
  Client_ids: any;
  clients: any;
  showjobs: boolean;
  job_status: any;
  job_value: any;
  AssignDate: any;
  constructor(public db: DBService) {

    if (db.profile.id) {

    } else {
      db.profile.id = 0;
    }

  }

  ngOnInit() {
    this.db.list('clientdetail/', null, ((response): void => {
      this.clients = response;
      console.log(this.clients);
    }));
    this.bindJob();
    this.loadmanager();
    //this.updatestatuscommentmyjob('showpopup');
    this.loadCandidate();

  }

  GetInHourseReference(id, $event) {
    $event.stopPropagation();
    this.jobidforReference = id;
    this.db.list('applicationdepartment/', null, (response) => {



      try {
        this.departments = response;
        $('#internalreference').modal('show');
      } catch (e) {

      }

    }, function (response) {
      //$scope.token=response.statusText;
    });
  };
  getinternalreferrence() {
    // console.log($scope.departments);
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
    this.db.store('internalreference', dataforreference, () => {
      $('#internalreference').modal('hide');
    })
  };
  changechecked(item) {

    item.selected = !item.selected;
  };

  enter(i) {
    this.hoverIndex = i;
  }

  leave(i) {
    this.hoverIndex = i;
  }
  showjd(item): void {
    debugger;

    item.responsibilityshow = !item.responsibilityshow;
    // if (this.hidejd === false) {
    //   this.hidejd = true;
    // }
    // else {

    // }
    this.itemone = item;
    this.itemone.jobDescription = 'hi';
    this.db.show('addnewjob/', item.id, ((response): void => {
      this.itemone.jobDescription = response.jobDescription;
      this.jobidjd = response;
      $('#viewjobDescription').modal('show');

      // this.hidejd = false;
      //item.responsibilityshow === item.responsibilityshow;
    })
    );

  }


  sendtrackermsg(download): void {
    if (!download) {
      if (!$('.validate').validate('#myModal')) {
        //  $.fn.showMessage('Please fill values');
        return;
      }
    }
    if (download) {
      this.download = true;
    } else {
      this.download = false;

    }
    if (this.selectednodes.length > 0) {

      const allrow = this.db.extractIDsData(this.selectednodes, 'ajid');

      if (allrow.length === 0) {
        this.db.showMessage('Please select candidates');
        return;
      }
      this.sendtracker.atjids = allrow.toString();
      if (this.download) {
        this.sendtracker.download = true;
      } else {
        this.sendtracker.download = false;
      }
      this.db.store('sendtracker', this.sendtracker, ((r): void => {
        if (this.download) {

          const resumes = r.resumes;
          let resumehtml = '';
          if (resumes.length > 0) {
            resumehtml = '</br> <h3>Resume List</h3> <div class="list-group">';
            for (const k in resumes) {
              if (resumes[k]) {
                resumehtml += '<a target="_blank" class="list-group-item '
                  + ' href="http://api.passivereferral.com/resumes/' + resumes[k].resume + '">' + resumes[k].name + '</a>';
              }
            }
            resumehtml += '</div>';
          }
          this.db.showDialog(`Your excel is ready.<a href="http://api.passivereferral.com/trackers/`
            + r.excel
            + `">Click Here</a> to Download ` + resumehtml, 'Message');
        } else {
          this.db.addmessageandremove('tracker sent');
        }
      }),
        ((r): void => {
          if (r.errormsg !== undefined) {
            this.db.addmessageandremove(r.errormsg);
          }//  else {
          //   this.db.addmessageandremove('Some error occured');
          // }
        }));
    } else {
      this.db.addmessageandremove('Please Select CV');
    }
  }
  getRowHeight = function (params) {
    return 200;
  }

  submit_cv_to_panel_status(): void {

    this.db.list('submit_cv_to_panel_status', {}, ((response): void => {

      this.cv_to_panel = { status: response };
      $('#submit_cv_to_panel_status').modal('show');

    }), ((response): void => {
      if (response.msg) {
        alert(response.msg);
      }
    }));

  };


  submitcv(download): void {
    if (download) {
      this.downloadcv = false;
    } else {
      this.downloadcv = true;

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
  updatestatuscommentmyjob = function (showpopup) {
    debugger;
    if (typeof showpopup === 'undefined') {
      showpopup = true;
    }

    this.commentstatus.ajid = this.ajid;
    this.commentstatus.date = this.db.toYYMMDD(this.commentstatus.date);
    // this.commentstatus.recruiterid=this.recruiterid;
    this.db.store('csr/', this.commentstatus, ((response): void => {
      $('#commentstatus').modal('hide');
      this.filterdrbytab();
      this.commentstatus = {};


      this.cancel();
      if (showpopup) {
        this.db.showMessage('Status changed successfully.');
      }
    }), ((response): void => {
      if (showpopup) {
        this.db.ShowPopUp('Please try again.');
      }

    })); this.loadCandidate();
  };

  sendCvToPanel(): void {
    if (!$('.validate').validate('#submit_cv_to_panel_status')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }

    const allrow = this.db.extractIDsData(this.selectednodes, 'ajid');

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
              this.db.addmessageandremove('Cv Submitted to panel.');
            }

          }
        }
      }), ((response): void => {
        this.db.showMessage('Try again.');
      })
      );
    }

  };
  bindJob(): void {
    debugger;
    this.alljobclient = true;
    this.show_all_jobs = false;
    this.isLoadingJobs = true;
    if(this.Client_ids != null){
      this.showjobs = true;
    }else{
      this.showjobs = false;
    }
    this.db.list('joblist/', {client_id :this.Client_ids}, ((response): void => {
      debugger;
      this.jobslist = response;
      this.jobslistmain = response;
      this.isLoadingJobs = false;
      this.changefilter(this.job_value, 'job_status');

    })
    );
  }
  bindJobs(): void {
    debugger;
    this.alljobclient = true;
    this.isLoadingJobs = true;
    this.show_all_jobs = true;
    // const showjoblist = {
    //   showalljobs: 1
    // }
    //this.showjoblist = 1;
    if(this.Client_ids != null){
      this.showjobs = true;
    }else{
      this.showjobs = false;
    }
    this.db.list('joblist/', { showalljobs: 1,client_id :this.Client_ids }, ((response): void => {
      debugger;
      this.jobslist = response;
      this.jobslistmain = response;
      this.isLoadingJobs = false;
      this.changefilter(this.job_value, 'job_status');

    })
    );
  }

  getlist(): void {

    this.db.list('joblist/', {
      'candidate': this.searchcandidate
    }, ((response): void => {
      this.jobslistmain = response;
      //this.showtag.tagged = response.tagged;
      this.bindJoblist(this.jobslistmain);
    }));
  };
  selectedmanagerlistset(id): void {
    if (this.selectedmanagerlist.indexOf(id) > -1) {
      this.selectedmanagerlist.pop(id);
    } else {
      this.selectedmanagerlist.push(id);
    }

  }
  filteragain(): void {
    debugger;
    this.jobslistlength = this.numberOfPages(this.jobslist);

  }
  assignjobClickToVendor(): void {
    debugger;
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
    debugger;
    if (selected === 1) {
      this.db.list('vendorunderjob/', {
        job_id: job_id
      }, ((response): void => {

        const vendorunderjoblist = response;
        setTimeout(() => {
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
        }, 1000);
      }));

    } else {
      if (selected > 1) {
        alert('Please select one job\n' + selected + ' selected!!');
      } else if (selected < 1) {
        alert('Please select job');
      }
    }
  };

  loadvendor(): void {

    this.db.list('vendor/', null, ((response): void => {
      this.vendors = response;

    }));

    this.assignjobClickToVendor();
  };

  vendorsave(): void {
    if (!$('.validate').validate('#addvendor')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }
    this.db.store('vendor/', this.vendornew, (response): void => {
      if (response.d === true) {
        alert(response.msg);
      }
    });
  }
  filterdrbytab(mainprocess?, childprocess?, jobitem?): void {
    debugger;
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
    this.gridheader = childprocess;
    if (jobitem != null) {
      this.selectedjob = jobitem.id;

      this.selectedjoball = jobitem.allcandidate;
      this.selectedjobunderreview = jobitem.underreview;
      this.selectedjobinprocess = jobitem.inprocess;
      this.selectedjobselectedcandidate = jobitem.selectedcandidate;
      this.selectedjobrejected = jobitem.rejected;
      this.selectedjobininterview = jobitem.candidates_interview_count;
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

  filterbycandidate(): void {
    debugger;
    this.searchcandidatetext = '';
    this.getlist();

  };
  filterbyJob(): void {
    debugger;
    this.loadCandidate();
    this.ShowCandidates = true;
  };

  loadCandidate = function () {

    debugger;
    let start_date = ''
    if (this.startdatefilter ==  undefined) {
      start_date = '2000-01-01';
    } else {
      start_date = this.db.toYYMMDDTT(this.startdatefilter);
    }

    let end_date = ''
    if (this.enddatefilter == undefined) {
      end_date = '';
    } else {
      end_date = this.db.toYYMMDDTT(this.enddatefilter)
      ;
    }
    if (this.show_all_jobs === false) {
      let SelectedJob = ''
      if (this.isfirstload !== 1) {
        SelectedJob = this.db.SelectedCheckboxWithComma(this.jobslist);
      } else {
        SelectedJob = this.selectedjob;
      }
      SelectedJob = this.selectedjob;
      // const totalrow = this.selectednodes;
      // SelectedJob = this.db.SelectedWithComma(totalrow, 'id');
      this.db.globaljobid = SelectedJob;
      if (this.mainprocess === undefined) {
        this.mainprocess = '';
      }
      if (this.process === undefined) {
        this.process = '';
      }
      const Search = {
        filterdropdown: this.filterdropdown,
        process: this.process,
        mainprocess: this.mainprocess,
        searchcandidatetext: this.searchcandidatetext,
        selectedjob: SelectedJob,
        candidate: this.searchcandidate,
        showallcandidate: 0,
        start_date: start_date,
        end_date: end_date

      };
      if (this.isinterview !== undefined) {
        Search['isinterview'] = this.isinterview;
      }

      this.rowData = [];
      console.log(Search);
      this.db.list('candidatesdetailmyjob/', Search, ((response): void => {
  //  this.startdatefilter = '';
  //  this.enddatefilter = '';
        this.candidatedetails = response;
        this.rowData = response;
        this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
          return this.candidatedetails;
        };
        this.candidateinpopup = response;
      }));
    } else {
      debugger;
      let SelectedJob = ''
      if (this.isfirstload !== 1) {
        SelectedJob = this.db.SelectedCheckboxWithComma(this.jobslist);
      } else {
        SelectedJob = this.selectedjob;
      }
      SelectedJob = this.selectedjob;
      // const totalrow = this.selectednodes;
      // SelectedJob = this.db.SelectedWithComma(totalrow, 'id');
      this.db.globaljobid = SelectedJob;
      if (this.mainprocess === undefined) {
        this.mainprocess = '';
      }
      if (this.process === undefined) {
        this.process = '';
      }
      const Search = {
        filterdropdown: this.filterdropdown,
        process: this.process,
        mainprocess: this.mainprocess,
        searchcandidatetext: this.searchcandidatetext,
        selectedjob: SelectedJob,
        candidate: this.searchcandidate,
        showallcandidate: 1,
        start_date: start_date,
        end_date: end_date



      };
      if (this.isinterview !== undefined) {
        Search['isinterview'] = this.isinterview;
      }

      this.rowData = [];
      console.log(Search);
      this.db.list('candidatesdetailmyjob/', Search, ((response): void => {


        this.candidatedetails = response;
        this.rowData = response;
        this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
          return this.candidatedetails;
        };
        this.candidateinpopup = response;
      }));
    }

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
  changefilter(val, type): void {
    debugger;
    this.isfilter = true;
    let data = [];
    this.job_value = val;
    if(val == null || val == undefined || val == '' ){
      val = 'Active';
    }
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
          if (this.jobslistmain[i].tagged === 11 || this.jobslistmain[i].tagged === '11') {
            data.push(this.jobslistmain[i]);
          }
        }
      } else if (type === 'interview') {

        for (const i in this.jobslistmain) {
          if (this.jobslistmain[i].candidates_interview_count !== 0) {
            data.push(this.jobslistmain[i]);
          }
        }
      }

    this.bindJoblist(data);
  };
  numberOfPages(data): number {
    let text;
    try {
      text = Math.ceil(data.length / this.pageSize);
    } catch (e) {
      text = 0;
    }
    return text;
  }
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

  viewreletedjobs(item):void{
    debugger;
    const jobkeyskill =item.keyskills;
    const location =item.location;
    this.db.list('viewjob',{jobkeyskill:item.keyskills,joblocation:item.location},((response): void =>{
          this.rowData=response[0];
          this.countviewreletedjobs=response[1];
    }));
  }

  assignjobClick(): void {
    debugger;
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
  searchtermchange(): void {
    debugger;
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

  filterdropdownfunction(choice, display): void {
    debugger;
    this.filterdropdown = choice;
    this.displaydd = display;
    this.currentfilter = choice;
    this.searchtermchange();
    // this.filterbyJob();
    if (choice === 'jobs') {
      this.getlist();
    }

  };
  openaddvendor(): void {
    $('#addvendor').modal('show');
  }
  loadmanager(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;



    }));
  };



  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {
        case 'activity':
          return this.activityclick(data);
        case 'comment':
          return this.onCommentClick(data);
        case 'notes':
          return this.onNotesClick(data);
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
    this.candidate_id = data.id;
  }

  public onNotesClick(data: any) {

    this.candidate_id = data.id;
  }
  public setupdateid(id) {
    debugger;
    this.candidate_id = id;
  }


  // toggleColor(item) {
  //   if (item.tagged == '11') {
  //     this.newColor = !this.newColor;
  //   } else {
  //     this.newColor = this.newColor;
  //   }
  // }

  tag(item): void {

    if (item.tagged == '10') {

      this.db.store('jobtag/', { job_id: item.id }, (response): void => {
        item.tagged = '11';
        this.db.showMessage('Tagged');
      });
    } else {

      this.db.destroy('jobtag/', item.id, (response): void => {
        item.tagged = '10';
        this.db.showMessage('Untagged');

      });

    }

  };

  public onCommentClick(data: any) {

    this.allstatusload = 0;

    this.status_row = data;
    // this.updatestatuscomponent.status_id = 22;
    // if (entity) {
    //   $scope.entityvar = entity;
    // } else {
    //   entity = $scope.entityvar;
    // }
    // if ($scope.allstatus) {
    //   $scope.allstatusload = 1;
    // } else {
    //   $scope.allstatusload = 0;
    // }

    //
    // if (entity.recruiter_id == null) {
    //   $scope.showowner = true;
    // } else {
    //   $scope.showowner = false;
    // }
    // $scope.ajid = entity.ajid;
    // $rootScope.ajid = entity.ajid;
    // console.log(entity);
    // $scope.currentstatusid = entity.status_id;
    // $scope.currentstatusname = entity.display_name;
    // db.list('csr/' + entity.status_id, { allstatus: $scope.allstatusload }, function (response) {
    //   $("#business").hide();
    //   $("#offerhide").hide();
    //   $scope.statuses = response.data;
    //   $('#commentstatus').modal('show');
    //   //            $mdDialog.show({
    //   //                contentElement: '#commentstatus',
    //   //                parent: angular.element(document.body),
    //   //                clickOutsideToClose: true,
    //   //                fullscreen: false,
    //   //                disableParentScroll: false
    //   //
    //   //            });
    // });



  }

  public activityclick(data: any) {
    this.db.show('addtojob/activity/', data.ajid, (response): void => {
      this.activities = response;

    });


  }

  // assignjob(): void {
  //   debugger;
  //   const assignjob = {
  //     'managers': this.db.SelectedCheckbox(this.managers),
  //     'jobs': this.db.SelectedCheckbox(this.jobslist)
  //   };
  //   this.db.store('assignjob/', assignjob, ((response): void => {
  //     console.log(response);
  //     this.db.addmessageandremove('job successfully asssign');
  //   }));
  // };
  assignjob(): void {
    debugger;
    const assignjob = {
      'managers': this.db.SelectedCheckbox(this.managers),
      'jobs': this.db.SelectedCheckbox(this.jobslist),
      'assigndate':this.AssignDate

    };
    this.db.store('assignjob/', assignjob, ((response): void => {
      console.log(response);
      this.db.addmessageandremove('job successfully asssign');
    }));
  };


  unassignjob(): void {
    debugger;
    const unassignjob = {
      'managers': this.db.SelectedCheckbox(this.managers),
      'jobs': this.db.SelectedCheckbox(this.jobslist)
    };
    this.db.store('unassignjob/', unassignjob, ((response): void => {
      console.log(response);
      this.db.addmessageandremove('job successfully unasssign');


    }));
  };


  assignjobtovendor(): void {
    const assignjob = {
      'vendors': this.db.SelectedCheckbox(this.vendors),
      'jobs': this.db.SelectedCheckbox(this.jobslist)
    };
    this.db.store('assignjobtovendor/', assignjob, ((response): void => {
      console.log(response);
      this.db.addmessageandremove('Assigned Jobs');
    }));
  };


  unassignjobtovendor() {
    const unassignjob = {
      'vendors': this.db.SelectedCheckbox(this.vendors),
      'jobs': this.db.SelectedCheckbox(this.jobslist)
    };
    this.db.store('unassignjobtovendor/', unassignjob, ((response): void => {

      this.db.addmessageandremove('Un-Assigned Jobs');
    }));
  };


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }

  onSelectionChanged(event) {
    debugger;
    this.selectednodes = event.api.getSelectedNodes();
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());
    // this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }
  //   upload = function (file) {
  //     if (file != null) {
  //         debugger;
  //         db.upload('cvsexcelupload/', {file: file}, function (response) {
  //             debugger;

  //             alert('uploaded');

  //         }, function (response) {
  //             $rootScope.addmessageandremove('Please try again');
  //         }, function (percentage, response) {
  //             document.title = percentage;
  //         });
  //     }
  // };
  uploadexcel(files: FileList) {
    debugger;
    // const jodid = jobid;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'file', 'file': files.item(0) });
    this.db.storeupload('getcvexceldata/', { file: files }, (re) => {

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
  cvformdatapost(): void {
    debugger;
    const formData = [];
    console.log(this.cvslists);
    $('#cvformdata .rowtr').each(function () {
      const Row = {
        'jobid': this.cvslists.jobid
      };
      $(this).find('.key').each(function () {
        const key = $(this).attr('key');
        Row[key] = $(this).val();
        //                if (key == 'email') {
        //
        //                    for (var j in $scope.cvslists) {
        //                        if ($scope.cvslists[j].email == $(this).val()) {
        //                            Row['resume'] = $scope.cvslists[j].file;
        //                        }
        //                    }
        //
        //                }

      });
      formData.push(Row);
    });
    this.db.store('uploadcvs/', { cvs: formData }, ((response): void => {
      this.responsedata = response;
      // tslint:disable-next-line: forin
      for (const tt in this.cvslists) {
        const email = this.cvslists[tt].email;
        for (const d in this.responsedata.alreadyexists) {
          if (this.responsedata.alreadyexists[d] === email) {

            this.cvslists[tt].statusofsubmit = 'fail';

            break;
          }
        }
        for (const d in this.responsedata.newcv) {
          if (this.responsedata.newcv[d] === email) {

            this.cvslists[tt].statusofsubmit = 'done';

            break;
          }
        }

      }
    })
    );
    for (const t in this.cvslists) {
      if (this.cvslists) {
        const data = {
          file: this.cvslists[t].file,
          email: this.cvslists[t].email,
          'jobid': this.cvslists[t].jobid
        };
        this.db.upload('uploadcvs/', data, function () { }, function (response) { }, function (response) { });
      }
    }
    console.log(formData);
  };

  uploadresume(files: FileList) {
    debugger;
    //this.candidate_id = candidate_id;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'resume', 'file': files.item(0) });
    this.db.storeupload('candidatedetail/update/' + this.candidate_id, null, (re) => {
      this.db.showNotification('Resume Uploaded');
      $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadresume').modal('hide');
    }, null, fileToUpload);
  }

  myjobActivity(item): void {
 
    debugger;
      this.db.list('updateactivity/',{job_id: item.id, job_satatus: this.job_status}, (response): void => {
       debugger;
        this.bindJob();
        debugger;
         this.changefilter(this.job_value, 'job_status');
      this.db.addmessageandremove('Updated Successfully');
    });
  }

  // uploadresume(files: FileList) {
  //   debugger;

  //   const formData = [];
  //   console.log(this.cvslists);
  //   $("#cvformdata .rowtr").each(function () {
  //     const Row = {
  //       'jobid': this.jobidcvupload
  //     };
  //     $(this).find('.key').each(function () {
  //       const key = $(this).attr('key');
  //       Row[key] = $(this).val();
  //       //                if (key == 'email') {
  //       //
  //       //                    for (var j in $scope.cvslists) {
  //       //                        if ($scope.cvslists[j].email == $(this).val()) {
  //       //                            Row['resume'] = $scope.cvslists[j].file;
  //       //                        }
  //       //                    }
  //       //
  //       //                }

  //     });
  //     formData.push(Row);
  //   });



  //   const fileToUpload: any[] = [];
  //   fileToUpload.push({ 'filekey': 'resume', 'file': files.item(0) });
  //   this.db.storeupload('uploadcvs/', { cvs: files }, (re) => {



  //     this.responsedata = re;
  //     // tslint:disable-next-line: forin
  //     for (const tt in this.cvslists) {
  //       const email = this.cvslists[tt].email;
  //       for (const d in this.responsedata.alreadyexists) {
  //         if (this.responsedata.alreadyexists[d] === email) {

  //           this.cvslists[tt].statusofsubmit = 'fail';

  //           break;
  //         }
  //       }
  //       for (var d in this.responsedata.newcv) {
  //         if (this.responsedata.newcv[d] === email) {

  //           this.cvslists[tt].statusofsubmit = 'done';

  //           break;
  //         }
  //       }

  //     }
  //   });
  //   // this.db.showNotification('Resume Uploaded');
  //   // $('#uploadresume').modal('hide');
  //   //}, (re) => {
  //   //this.db.showNotification('uploaded'); $('#uploadresume').modal('hide');
  //   //}, null, fileToUpload);
  //   //}
  // }
}
