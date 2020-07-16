import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CandidateInJobsNotificationComponent } from '../control/candidate-in-jobs-notification/candidate-in-jobs-notification.component';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import * as c3 from 'c3';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // new reference fields
private gridApi;

  public autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateInJobsNotificationComponent,
      width: 1000,
    },

  ];

  rowData = [
  ];
  onRowClicked: any;
  getsuggestions: any;
  lenght: any;
  prsuggestionpercent: any;
  getinterviewschedules: any;
  notification_very_danger = 0;
  notification_danger = 0;
  notification_success = 0;
  status_row = {};
  selectednodes = [];
  allstatusload = 0;
  notification_default = 0;
  notification_warning = 0;
  notification: any = [];
  activities = [];
  currentData: any;
  myjob: any = [];
  hide = false;
  jobslistforref: any = [];
  jobportalurl: any = [];
  setjobandreferencetemp: any = {};
  profile: any = {};
  end_date_temp: any = new Date();
  start_date_temp: any = new Date();

  in_process_referrals: any = [];
  smsmessagetemplatesforref: any = [];
  emailmessagetemplatesforref: any = [];
  mp: any = {};
  gridOptionsSuggestedCandidates: any;
  gridOptionsSuggestedCandidatesCols = [];
  gridOptionsSuggestedCandidatesRows = [];
  allids: any;
  loaddata: any;
  Initiationcallreport: any;
  sourceData: any;
  sourcereport: any;
  recruiterreport: any;
  Openmailmessage: any;
  callInitiationreports: any;
  responcereports: any;
  recruiterreports: any;
  constructor(private router: Router, public db: DBService) { }
  isnull(val, returns) {
    if (val === null || val === undefined) {
      return returns;

    } else {
      return val;
    }
  }
  setjobandreferencetempmpfunction() {
debugger;
    if (this.db.profile != null) {
      this.setjobandreferencetemp.current_job_id =
        this.isnull(this.isnull(this.setjobandreferencetemp.current_job_id, '0'), '0').toString();
      this.setjobandreferencetemp.reference_email_template_id =
        this.isnull(this.db.profile.reference_email_template_id, '0').toString();
      this.setjobandreferencetemp.reference_sms_template_id =
        this.isnull(this.db.profile.reference_sms_template_id, '0').toString();

    }
    if (this.setjobandreferencetemp.is_send_auto_email_reference_temp) {
      this.setjobandreferencetemp.is_send_auto_email_reference = 1;
    } else {
      this.setjobandreferencetemp.is_send_auto_email_reference = 0;
    }
    console.log(this.setjobandreferencetemp);
    if (this.setjobandreferencetemp.callto == null) {
      alert('please select call type');
    }
    debugger
    this.db.store('setjobandreferencetemplate/', this.setjobandreferencetemp);
debugger;
  };
  ngOnInit() {
    this.recruiterreportdealy();
    this.callInitiationreport();
    this.resumesourcereport();
    this.start_date_temp.setDate(this.end_date_temp.getDate() - 1);
    this.loadcvparse();
    this.db.setProfile();
    this.bindNewReference();
    this.getnotification();
    this.loadsuggestion();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };




    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
    this.responcereport();

  }


  recruiterreportdealy(): void {
    //   debugger;
    const recruiter = { rootname: '', client_detail_id: 0, job_id: 0, manager: 0};

        this.db.list('DashboardrecruiterreportApi/',recruiter, (response): void => {
      debugger;

          const xval = ['x'];
          const Total_Candidate = ['Total'];
          const selected_Candidate = ['Selected'];
          const Rejected_Candidate = ['Rejected'];
          const In_Process_Candidate = ['In Process'];
          const UnderReview = ['Under Review'];


          for (const i in response) {
            if (response[i]) {
                xval.push(response[i].recruiter_Name );

              Total_Candidate.push(response[i].Total_Candidate);
              selected_Candidate.push(response[i].selected_Candidate);
              Rejected_Candidate.push(response[i].Rejected_Candidate);
              In_Process_Candidate.push(response[i].In_Process_Candidate);
              UnderReview.push(response[i].UnderReview);
            }
          }
          const Columns = [];
          const ColumnsPie = [];
          Columns.push(xval);

          Columns.push(Total_Candidate);
          Columns.push(selected_Candidate);
          Columns.push(Rejected_Candidate);
          Columns.push(In_Process_Candidate);
          Columns.push(UnderReview);

          if (this.loaddata) {
            this.recruiterreport.load({
              unload: true,
              columns: Columns
            });
          } else {
            this.recruiterreport = c3.generate({
              bindto: '#recruiterreport',
              data: {
                x: 'x',
                columns: Columns,
                type: 'area',

              },
              bar: {
                width: {
                  ratio: 0.8 // this makes bar width 50% of length between ticks
                }
              },
              axis: {
                x: {
                  type: 'category',
                  tick: {
                    rotate: 80,
                    multiline: false
                  },
                  height: 150
                }
              }
            });
            this.loaddata = false;

          }

          this.recruiterreports = response;
          this.db.sl();
        });
      }
 resumesourcereport(): void{
    //debugger;
    this.db.list('Dashboardresumesourcereport/',{ }, (response): void => {
      //debugger;

      const xval = ['x'];


      const Naukri = ['Naukri'];
      const Monster = ['Monster'];
      const Shine = ['Shine'];
      const Times_Job = ['Times_Job'];
      const Internal_Database = ['Internal_Database'];
      const LinkedIn = ['LinkedIn'];
      const Upload_Cv = ['Upload_Cv'];

      for (const i in response) {
        if (response[i]) {
       //debugger;
          xval.push(response[i].user_Name);
          Naukri.push(response[i].Naukri);
          Monster.push(response[i].Monster);
          Shine.push(response[i].Shine);
          Times_Job.push(response[i].Times_Job);
          Internal_Database.push(response[i].Internal_Database);
          LinkedIn.push(response[i].LinkedIn);
          Upload_Cv.push(response[i].Upload_Cv);

        }
      }
      const ColumnsPie = [];
      ColumnsPie.push(Times_Job);
      ColumnsPie.push(Naukri);
      ColumnsPie.push(Monster);
      ColumnsPie.push(Shine);
      ColumnsPie.push(Internal_Database);
      ColumnsPie.push(LinkedIn);
      ColumnsPie.push(Upload_Cv);

      if (this.loaddata) {
        this.sourcereport.load({
          unload: true,
          ColumnsPie: ColumnsPie
        });
      } else {
        this.sourcereport = c3.generate({
          bindto: '#sourcereport',
          data: {
            columns: ColumnsPie,
            type: 'donut',
            // type: 'gauge',

          },

        });
        this.loaddata = false;

      }
      this.sourceData = response;
      console.log(response);
      this.db.sl();

    });
  }

  responcereport(): void{
    const sendapi = { manager: 0, start_date: '2000-01-01', end_date: this.db.toYYMMDD(new Date()) };
    debugger;

    this.db.list('DashboardopenemailsmsreportApi/',{}, (response): void => {
      debugger;

     const Assessment_Attempted_by_email = ['Assessment_Attempted_by_email'];
     const Assessment_Attempted_by_sms = ['Assessment_Attempted_by_sms'];



    for (const i in response) {
      if (response[i]) {
        Assessment_Attempted_by_email.push(response[i].Assessment_Attempted_by_email);
        Assessment_Attempted_by_sms.push(response[i].Assessment_Attempted_by_sms);

      }
    }
    const Columns = [];
    Columns.push(Assessment_Attempted_by_email);
    Columns.push(Assessment_Attempted_by_sms);



    if (this.loaddata) {
      this.Openmailmessage.load({
        unload: true,
        columns: Columns
      });

    } else {
      this.Openmailmessage = c3.generate({
        bindto: '#Openmailmessage',
        data: {
          columns: Columns,
          type: 'donut',
        },

      });
      this.loaddata = false;

    }
    this.responcereports = response;
    this.db.sl();
  });
  }
  callInitiationreport(): void{
    //   debugger;
    this.db.list('Dashboardcallenunciatereport/',{ }, (response): void => {
      //   debugger;

      const xval = ['x'];


      const Initiation_call = ['Initiation_call'];
      for (const i in response) {
        if (response[i]) {
       //   debugger;
          xval.push(response[i].userName);
          Initiation_call.push(response[i].Initiation_call);

        }
      }
      const Columns = [];
      Columns.push(xval);
      Columns.push(Initiation_call);

      if (this.loaddata) {
        this.Initiationcallreport.load({
          unload: true,
          columns: Columns
        });
      } else {
        this.Initiationcallreport  = c3.generate({
          bindto: '#Initiationcallreport',

          data: {
            x: 'x',
            columns: Columns,
            type: 'bar',
            labels: true,
           },
          color: {
            pattern: ['#9d32a8']
        },
          bar: {
            width: {
              ratio: 0.8 // this makes bar width 50% of length between ticks
            }
          },
          tooltip: {
            grouped: true
        },
        legend: {
            show: true
        },
          axis: {
            // rotated: true,
            x: {
              type: 'category',
              tick: {
                rotate: 100,
                multiline: false
              },
              height: 500
            }
          }
        });
        this.loaddata = false;
      }
      this.callInitiationreports = response;
      this.db.sl();
    });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  load_total_job(jobid): void {
    debugger;
    $('#ModelshowjobsClientWise').modal('show');
    //this.myjob.clientid = data.id;
    this.db.list('getsuggestedcandidates/', { 'selectedjob': jobid, 'prsuggestionpercent': this.prsuggestionpercent }, (response): void => {
      this.gridOptionsSuggestedCandidatesCols = [
        {
          'headerName': 'Candidate Name', 'field': 'candidateName',
          sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true
        },
        { 'headerName': 'Match', 'field': 'score', 'sortable': true, 'filter': true },
        { 'headerName': 'Designation', 'field': 'currentDesignation', 'sortable': true, 'filter': true },
        { 'headerName': 'Email', 'field': 'email', 'sortable': true, 'filter': true },
        { 'headerName': 'Edu', 'field': 'qualification', 'sortable': true, 'filter': true },
        { 'headerName': 'Exp', 'field': 'ovarallExperiance', 'sortable': true, 'filter': true },
        { 'headerName': 'Mobile No', 'field': 'mobileNo', 'sortable': true, 'filter': true },
        { 'headerName': 'Salary', 'field': 'currentSalary', 'sortable': true, 'filter': true },
        { 'headerName': 'Location', 'field': 'location', 'sortable': true, 'filter': true },
        { 'headerName': 'Preferred Location', 'field': 'preferredLocation', 'sortable': true, 'filter': true }],
        // { 'headerName': 'Job Status', 'field': 'job_status', 'sortable': true, 'filter': true },
        // { 'headerName': 'Start Date', 'field': 'start_date', 'sortable': true, 'filter': true },
        // { 'headerName': 'End Date', 'field': 'end_date', 'sortable': true, 'filter': true },
        // { 'headerName': 'type', 'field': 'jobtype', 'sortable': true, 'filter': true }];
        // this.db.GenerateColDef(response);
        this.gridOptionsSuggestedCandidatesRows = response;


      //    db.sl();
    });
  }
  opensuggestionondb(jobid): void {

    this.db.list('getsuggestedcandidates/', { 'selectedjob': jobid, 'prsuggestionpercent': this.prsuggestionpercent }, (response): void => {

      $('#candidatesall').modal('show');
      this.gridOptionsSuggestedCandidates = response;

    });
  };
  public activity(data: any) {
    this.db.show('addtojob/activity/', data.ajid, (response): void => {
      this.activities = response;

    });


  }
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
    //   $scope.statuses = response;
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
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  daydiff = function (first, second) {
    first = new Date(first);
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };
  currentdate = function () {
    return new Date();
  };
  highlight = function (diff) {

    if (diff < 3) {
      return 'success';
    } else if (diff > 30) {
      return 'very-danger';
    } else if (diff > 15) {
      return 'danger';
    } else if (diff > 5) {
      return 'warning';
    } else {
      return 'default';
    }
  }
  public activityclick(data: any) {
    this.db.show('addtojob/activity/', data.ajid, (response): void => {
      this.activities = response;

    });


  }
  naukriclick(url: any): void {
debugger;
    this.jobportalurl = url;
    this.db.list('addnewjob/', { clientId: this.myjob.client_detail_id }, ((response): void => {
      debugger;
      this.jobslistforref = response;

    })
    );
    // this.db.list('smsmessagetemplate/', null, ((response): void => {
    //   this.smsmessagetemplatesforref = response;
    // }));
    // // Email-Message-Template
    // this.db.list('emailmessagetemplate/', null, ((response): void => {
    //   this.emailmessagetemplatesforref = response;
    // }));

  }
  bindNewReference(): void {
    this.db.list('in_process_referral', null, ((response): void => {
      const datainprocess = response;
      for (var i in datainprocess) {
        datainprocess[i].diff = this.daydiff(datainprocess[i].last_action_date, this.currentdate());
      }
      this.in_process_referrals = datainprocess;
      this.notification_very_danger = 0;
      this.notification_danger = 0;
      this.notification_success = 0;
      this.notification_default = 0;
      this.notification_warning = 0;
      for (var i in datainprocess) {
        var diff = datainprocess[i].diff;

        if (diff < 3) {
          this.notification_success = this.notification_success + 1;
        } else if (diff > 30) {
          this.notification_very_danger = this.notification_very_danger + 1;
        } else if (diff > 15) {
          this.notification_danger = this.notification_danger + 1;
        } else if (diff > 5) {
          this.notification_warning = this.notification_warning + 1;
        } else {

          this.notification_default = this.notification_default + 1;
        }
      }



    }), ((response): void => {

    })
    );
  }
  internaldata(): void {

    // $('').modal('show');
  };


  loadsuggestion(): void {
    debugger;
    if (this.prsuggestionpercent == null || this.prsuggestionpercent == '') {
      this.prsuggestionpercent = '30';
    }
    //$('#prsuggestionpercentselect').val();
    // db.hl();
    this.db.list('getsuggestionondashboard/', { 'prsuggestionpercent': this.prsuggestionpercent }, ((response): void => {
      this.getsuggestions = response;
      //db.sl();
    })
    );
  };
  getnotification(): void {
    this.db.list('getnotification', null, ((response): void => {
      this.notification = response;

    }), ((response): void => {

    })
    );
    this.db.list('getinterviewschedule/', null, ((response): void => {
      this.getinterviewschedules = response;
    }));
  }


  cb(start, end) {
    $('#reportrange span').html(start + ' - ' + end);
    // load data

    this.db.list('dashboardcvparsed', { 'start': start + ' 00:00', 'end': end + ' 23:59' },
      (response) => {



        const xval = ['x'];
        const cvval = ['cv'];

        for (const i in response) {
          if (true) {
            xval.push(response[i].Name);
            cvval.push(response[i].Cv);
          }
        }

        const chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',
            columns: [
              xval,
              cvval,
            ],
            type: 'bar'
          },
          axis: {
            x: {
              type: 'category',
              tick: {
                rotate: 75,
                multiline: false
              },
              height: 130
            }
          }
        });
      });
    // load data
  }

  loadcvparse() {
    const start = this.db.toYYMMDD(this.start_date_temp);
    const end = this.db.toYYMMDD(this.end_date_temp);





    this.cb(start, end);
  };


  navigateUrl(url: string): void {
    debugger;
    if (url === 'internaldatabase') {
      $('#internaldata').modal('hide');
    }
    this.router.navigate([url]);
  }

  candidateshow(data): void {

    this.currentData = data;
    this.currentData.id = this.currentData.candiateid;
  }
  onSelectionChanged(event) {
    debugger;
    this.selectednodes = event.api.getSelectedNodes();
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());
    // this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }
  onGridReady(params) {
    this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }

}
