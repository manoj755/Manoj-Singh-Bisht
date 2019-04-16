import { Component, OnInit } from '@angular/core';
import { DBService } from '../db.service';
import { CandidateMyJobComponent } from '../control/candidate-my-job/candidate-my-job.component';
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
  allids = [];
  displaydd = 'Job';
  private gridColumnApi;
  managers = [];
  manager: any;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateMyJobComponent,
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
  gridOptionsloadcandidatesInPopUp = {};
  childprocessnewvar: any;
  gridheader: any;
  mainprocessnewvar: any;
  vendornew: any = {};
  sendtracker: any = {};
  jobslistlength: any;
  commentstatus: any = {};
  selectedmanagerlist: any;
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
  status_id = 0;
  vendorSearch: any;
  departments = [];
  prmSubject = '';
  prmMessagge = '';
  trackerno: any;
  status_row: any;
  managerSearch: any;
  selectedmanager: any;
  agreed = 0;
  disagreed = 0;
  searchText: any;
  applications: any;
  jobidforReference: any;
  constructor(public db: DBService) {

    if (db.profile.id) {

    } else {
      db.profile.id = 0;
    }

  }

  ngOnInit() {
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
  showjd(item) {

    item.responsibilityshow = !item.responsibilityshow;
    this.itemone = item;
    this.itemone.jobDescription = 'hi';
    this.db.show('addnewjob/', item.id, (response): void => {
      this.itemone.jobDescription = response.jobDescription;
    })


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
      this.sendtracker.atjids = allrow;
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
      this.downloadcv = true;
    } else {
      this.downloadcv = false;

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
    if (typeof showpopup === 'undefined') {
      showpopup = true;
    }

    this.commentstatus.ajid = this.ajid;
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
  bindJob(): void {
    this.isLoadingJobs = true;
    this.db.list('joblist/', {}, ((response): void => {
      this.jobslist = response;
      this.jobslistmain = response;
      this.isLoadingJobs = false;

    })
    );
  }

  getlist(): void {

    this.db.list('joblist/', {
      'candidate': this.searchcandidate
    }, ((response): void => {
      this.jobslistmain = response;
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
    this.jobslistlength = this.numberOfPages(this.jobslist);

  }
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
  cvformdatapost(): void {

  }
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

    this.searchcandidatetext = '';
    this.getlist();

  };
  filterbyJob(): void {

    this.loadCandidate();
    this.ShowCandidates = true;
  };

  loadCandidate = function () {

    //
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
      candidate: this.searchcandidate

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
  searchtermchange(): void {
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


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }

  public onNotesClick(data: any) {

    this.candidate_id = data.id;
  }



  toggleColor(item) {
    if (item.tagged == '11') {
      this.newColor = !this.newColor;
    } else {
      this.newColor = this.newColor;
    }
  }

  tag(item): void {

    if (item.tagged !== '10') {
      this.db.destroy('jobtag/', item.id, (response): void => {
        item.tagged = 10;
        this.db.showMessage('Untagged');

      });

    } else {


      this.db.store('jobtag/', { job_id: item.id }, (response): void => {
        item.tagged = 11;
        this.db.showMessage('Tagged');
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

  assignjob(): void {
    debugger;
    const assignjob = {
      'managers': this.db.SelectedCheckbox(this.managers),
      'jobs': this.db.SelectedCheckbox(this.jobslist)
    };
    this.db.store('assignjob/', assignjob, ((response): void => {
      console.log(response);
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
    this.selectednodes = event.api.getSelectedNodes();
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());
    // this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }
}
