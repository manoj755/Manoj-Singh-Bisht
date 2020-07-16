import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartComponent, IPointEventArgs } from '@syncfusion/ej2-angular-charts';
import { DBService } from 'app/db.service';
import * as c3 from 'c3';
declare var $: any;

@Component({
  selector: 'app-open-email-sms-report',
  templateUrl: './open-email-sms-report.component.html',
  styleUrls: ['./open-email-sms-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OpenEmailSmsReportComponent implements OnInit {
  public myfunnelchart: object[];
  public chartLabel: Object;
  public legend: Object;
  public tooltipSetting: object;

  campaignstatisticscolumnDefs = [

    { 'headerName': 'Recruiter Name', 'field': 'user_Name', 'sortable': true, 'filter': true },
    {
      'headerName': 'Total Candidate', 'field': 'all_candidate', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Total Candidate
        ' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Open Email', 'field': 'email_open', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Open Email' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Not Open Email', 'field': 'email_not_open', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Not Open Email' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Assessment Attempted', 'field': 'Assessment_Attempted_by_email', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Assessment Attempted through email' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Assessment Attempted through Sms', 'field': 'Assessment_Attempted_by_sms', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Assessment Attempted through Sms' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Assessment Not Attempted', 'field': 'Assessment_not_Attempted', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Assessment Not Attempted' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
  ];


  RatiocolumnDefs = [

    { 'headerName': 'Recruiter Name', 'field': 'user_Name', 'sortable': true, 'filter': true },
    {
      'headerName': 'Assessment Attempted through email', 'field': 'Assessment_Attempted_by_email', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Assessment Attempted through email' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Assessment Attempted through Sms', 'field': 'Assessment_Attempted_by_sms', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Assessment Attempted through Sms' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },


  ];
  rowData = [];
  @ViewChild('chart')
  public chartObj: OpenEmailSmsReportComponent;
  data: any;
  managers: any;
  campaign: any;
  start_date: any;
  end_date: any;
  userids: any;
  rowDatas: any;
  loaddata: any;
  candidatecampignreport: any;
  candidatecampignreportpie: any;
  container: any;
  candidate_filtered_cols: { headerName: string; field: string; sortable: boolean; filter: boolean; }[];
  candidate_filtered: any;
  gridColumnApi: any;
  gridApi: any;
  filtertitle: any;
  charttype: any;
  showallresponse: any;
  emailsmschart = false;
  Ratio = false;
  Statistics = false;
  allgrid = false;
  smsgrid = false;
  constructor(public db: DBService) {

  }
  ngOnInit(): void {
    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
    }));
    this.getlistdata();
    this.Ratio = true;
  }

  getlistdata(): void {
    debugger;
    // if(){
    //   this.Ratio = true;
    //   this.Statistics = false;
    //   this.allgrid = true;
    //   this.smsgrid = false;
    //   this.emailsmschart = false;
    //   this.charttype = "Ratio chart";
    //  }

    this.data = {};
    if (this.userids == undefined) {
      this.userids = 0;
    }

    if (this.campaign == undefined) {
      this.campaign = '0';
    }
    if (this.start_date == undefined) {
      this.start_date = new Date('2020-01-01');
    }
    if (this.end_date == undefined) {
      this.end_date = new Date();
    }
    this.data = {
      'manager': this.userids, 'campaign': this.campaign, 'start_date': this.db.toYYMMDD(this.start_date), 'end_date': this.db.toYYMMDD(this.end_date)
    }
    this.db.list('openemailsmsreportApi/', this.data, (response): void => {
      debugger;
      this.rowDatas = response[0].email_not_delivered;

      const xval = ['x'];


      const total_email = ['total Send email'];
      const email_open = ['email_open'];
      const email_not_open = ['email_not_open'];
      const Assessment_Attempted_by_email = ['Assessment Attempted through email'];
      const Assessment_Attempted_by_sms = ['Assessment Attempted through Sms'];
      const total_sms = ['total_sms'];
      const Assessment_not_Attempted_by_email = ['Assessment Not Attempted through email'];
      const Assessment_not_Attempted_by_sms = ['Assessment Not Attempted through sms'];
      const Assessment_Attempted_by_both = ['Assessment Attempted through sms'];
      for (const i in response) {
        if (response[i]) {
          debugger;
          xval.push(response[i].user_Name);
          total_email.push(response[i].total_email);
          email_not_open.push(response[i].email_not_open);
          email_open.push(response[i].email_open);
          Assessment_Attempted_by_email.push(response[i].Assessment_Attempted_by_email);
          total_sms.push(response[i].total_sms);
          Assessment_Attempted_by_sms.push(response[i].Assessment_Attempted_by_sms);
          Assessment_not_Attempted_by_email.push(response[i].Assessment_not_Attempted_by_email);
          Assessment_not_Attempted_by_sms.push(response[i].Assessment_not_Attempted_by_sms);

        }
      }
      //   const Columns = [];
      //   const ColumnsPie = [];
      //   Columns.push(xval);


      //   Columns.push(all_candidate);
      //   Columns.push(email_delivered);
      //   Columns.push(email_not_delivered);
      //   Columns.push(open_email);
      //  ColumnsPie.push(open_sms);



      // if (this.loaddata) {
      //   this.candidatecampignreport.load({
      //     unload: true,
      //     columns: Columns
      //   });
      //   this.candidatecampignreportpie.load({
      //     unload: true,
      //     columns: ColumnsPie
      //   });
      // } else {
      debugger;
      if (this.charttype == 'Ratio chart' || this.charttype == undefined) {
        this.Ratio = true;
        this.Statistics = false;
        const Columns = [];
        Columns.push(Assessment_Attempted_by_email);
        Columns.push(Assessment_Attempted_by_sms);



        if (this.loaddata) {
          this.showallresponse.load({
            unload: true,
            columns: Columns
          });

        } else {
          this.showallresponse = c3.generate({
            bindto: '#showallresponse',
            data: {
              columns: Columns,
              type: 'donut',
              onclick: (d, e) => {
                debugger;
                const dataroot = d.name;
                const data = response[0];
                debugger;
                this.load_filtered(data, dataroot);
              }
            },

          });
          this.loaddata = false;

        }
      }
      else if (this.charttype == 'Campaign Statistics') {
        this.Statistics = true;
        this.Ratio = false;
        this.myfunnelchart = [
          { x: 'Assessment Not Attempted', value: response[0].Assessment_not_Attempted, text: 'Assessment Not Attempted : ' + response[0].Assessment_not_Attempted },
          { x: 'Assessment Attempted through Sms', value: response[0].Assessment_Attempted_by_sms, text: 'Assessment Attempted through Sms: ' + response[0].Assessment_Attempted_by_sms },
          { x: 'Assessment Attempted through email', value: response[0].Assessment_Attempted_by_email, text: 'Assessment Attempted through Emai: ' + response[0].Assessment_Attempted_by_email },
          { x: 'Assessment Attempted through Both', value: response[0].Assessment_Attempted_by_both, text: 'Assessment Attempted through  Both : ' + response[0].Assessment_Attempted_by_both },
          { x: 'Not Open Email', value: response[0].email_not_open, text: 'Email Not Open : ' + response[0].email_not_open },
          { x: 'Open Email', value: response[0].email_open, text: 'Email Open : ' + response[0].email_open },
          { x: 'Total Candidate', value: response[0].all_candidate, text: 'Total Candidate : ' + response[0].all_candidate }

        ];
        this.tooltipSetting = {
          enable: true,
          format: '${point.x} : <b>${point.y}</b>'
        };
        this.chartLabel = {
          visible: true,
          position: 'Inside',
          name: 'text'
        };
        this.legend = {
          visible: true,
          position: 'Bottom',
          height: '8%',
          width: '75%'
        };
      }


      this.loaddata = false;
      // }

      // if (this.columnDefs.length === 0 && response.length > 0) {
      //   // this.columnDefs = this.db.GenerateColDef(response);

      // }
      this.rowData = response;
      this.db.sl();
      //  this.showcandidatereport();

    })

  }
  print() {
    this.chartObj.print();
  }
  public pointClick(args: IPointEventArgs): void {
    // alert(args.point.x);
    debugger;
    const data = this.rowData[0];
    const dataroot = args.point.x;
    debugger;
    this.load_filtered(data, dataroot);
  };


  onGridReady(params) {
    debugger;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');
      const dataroot = e.event.target.getAttribute('data-root');
      debugger
      switch (actionType) {
        case 'filtered':
          return this.load_filtered(data, dataroot);
        //break;
      }
    }
  }

  public load_filtered(row, dataroot): void {
    debugger;
    this.filtertitle = dataroot;
    $('#ModelShowHistoryReportWise').modal('show');
    debugger;
    this.data.manager = row.id;
    debugger;
    this.data.rootname = dataroot;
    debugger;

    // this.data = {'rootname': 'No Update'}


    this.db.list('openemailsmsreportWise/', this.data, (response): void => {
      debugger;
      this.candidate_filtered_cols = [
        { 'headerName': 'Recruiter Name', 'field': 'RecruiterName', 'sortable': true, 'filter': true },
        { 'headerName': 'Candidate Name', 'field': 'candidateName', 'sortable': true, 'filter': true },
        { 'headerName': 'Email', 'field': 'email', 'sortable': true, 'filter': true },
        { 'headerName': 'Mobile No', 'field': 'mobileNo', 'sortable': true, 'filter': true },
        { 'headerName': 'is_open_mail', 'field': 'is_open_mail', 'sortable': true, 'filter': true },
        { 'headerName': 'isread', 'field': 'isread', 'sortable': true, 'filter': true },
      ];
      this.candidate_filtered = response;

    });
  }




}
