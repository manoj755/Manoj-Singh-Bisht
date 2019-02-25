import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router } from "@angular/router";
import { DBService } from "../db.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // new reference fields
  notification_very_danger = 0;
  notification_danger = 0;
  notification_success = 0;
  notification_default = 0;
  notification_warning = 0;
  notification:any=[];
  myjob:any=[];
  jobslistforref:any=[];
  jobportalurl:any=[];
  setjobandreferencetemp:any={};
  profile:any={};
  in_process_referrals: any = [];
  smsmessagetemplatesforref:any=[];
  emailmessagetemplatesforref:any=[];
  mp:any={};
  constructor(private router: Router, private db: DBService) { }
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

  naukriclick(url:any):void {
    debugger;
    this.jobportalurl = url;
    this.db.list("addnewjob/", {clientId: this.myjob.client_detail_id}, ((response): void => {
        this.jobslistforref = response;

    } )
    );
    this.db.list("smsmessagetemplate/", null, ((response): void => { 
        this.smsmessagetemplatesforref = response;
    }));
    //Email-Message-Template
    this.db.list("emailmessagetemplate/", null,((response): void => { 
        this.emailmessagetemplatesforref = response;
    }));
}
  bindNewReference(): void {
    this.db.list('in_process_referral', null, ((response): void => {
      var datainprocess = response;
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
  internaldata():void {

    // $('').modal('show');
};
  getnotification(): void {
    this.db.list('getnotification', null, ((response): void => {
      this.notification =response;

    }), ((response): void => {

    })
    );
  }

  navigateUrl(url: string): void {
    this.router.navigate([url]);
  }
  ngOnInit() {
    this.db.setProfile();
    this.bindNewReference();
    this.getnotification();
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

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
