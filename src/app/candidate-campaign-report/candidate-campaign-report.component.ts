import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { ChartComponent, IPointEventArgs } from '@syncfusion/ej2-angular-charts';
import { DBService } from 'app/db.service';
import * as c3 from 'c3';
import * as d3 from 'd3';
declare var $: any;
// Exporting(Highcharts);
// funnel(Highcharts);

@Component({
  selector: 'app-candidate-campaign-report',
  templateUrl: './candidate-campaign-report.component.html',
  styleUrls: ['./candidate-campaign-report.component.scss']
})

export class CandidateCampaignReportComponent implements OnInit {
  // name = `Angular! v${VERSION.full}`;
  // @ViewChild("container", { read: ElementRef }) container: ElementRef;
  loaddata = false;
  public myfunnelchart: object[];
  public chartLabel: Object;
  public legend: Object;
  public tooltipSetting: object;
  columnDefs = [
    { 'headerName': 'Recruiter Name', 'field': 'user_Name', 'sortable': true, 'filter': true },
    {
      'headerName': 'All Candidate', 'field': 'all_candidate', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='All' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Interested Assessment Attempted Candidate', 'field': 'Interested_Assessment_Attempted', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Interested Assessment Attempted' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },

    {
      'headerName': 'Interested Assessment Not Attempted Candidate', 'field': 'Interested_Assessment_Not_Attempted', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Interested Assessment Not Attempted' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },

    {
      'headerName': 'Not Interested Candidate', 'field': 'Not_Interested', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Not Interested' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'No Response Candidate', 'field': 'No_Response', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='No Response' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
  ];
  rowData = [];
  @ViewChild('ModelShowCandidatecampaignprint')
  public chartObj: CandidateCampaignReportComponent;
  candidatecampignreport: any;
  candidatecampignreportpie: any;
  rowDatas: any;
  managers: any;
  userids: any;
  gridApi: any;
  gridColumnApi: any;
  filtertitle: any;
  data: any;
  candidate_filtered_cols: { headerName: string; field: string; sortable: boolean; filter: boolean; }[];
  candidate_filtered: any;
  campaign: any;
  start_date: any;
  end_date: any;
  constructor(public db: DBService) { }

  ngOnInit() {
    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
    }));
    this.getlistdata();
    this.showcandidatereport();
  }


  getlistdata(): void {
    debugger;

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
    this.db.list('candidatecampignreportApi/', this.data, (response): void => {
      debugger;
      this.rowDatas = response[0].Interested;

      const xval = ['x'];

      const Interested_Assessment_Not_Attempted = ['Interested_Assessment_Not_Attempted'];
      const all_candidate = ['all_candidate'];
      const Interested_Assessment_Attempted = ['Interested_Assessment_Attempted candidate'];
      const No_Response = ['No_Response'];
      const Not_Interested = ['Not_Interested'];




      for (const i in response) {
        if (response[i]) {
          debugger;
          xval.push(response[i].user_Name);
          all_candidate.push(response[i].all_candidate);
          Interested_Assessment_Not_Attempted.push(response[i].Interested_Assessment_Not_Attempted);
          Interested_Assessment_Attempted.push(response[i].Interested_Assessment_Attempted);
          No_Response.push(response[i].No_Response);
          Not_Interested.push(response[i].Not_Interested);
          // link_opne.push(response[i].link_opne);
        }
      }
      const Columns = [];
      const ColumnsPie = [];
      Columns.push(xval);


      // Columns.push(Reject);
      Columns.push(all_candidate);
      Columns.push(Interested_Assessment_Not_Attempted);
      Columns.push(No_Response);
      Columns.push(Interested_Assessment_Attempted);
      Columns.push(Not_Interested);
      // Columns.push(link_opne);
      // ColumnsPie.push(all_candidate);



      if (this.loaddata) {
        this.candidatecampignreport.load({
          unload: true,
          columns: Columns
        });
        this.candidatecampignreportpie.load({
          unload: true,
          columns: ColumnsPie
        });
      } else {
        this.candidatecampignreport = c3.generate({
          bindto: '#candidatecampignreport',
          data: {
            x: 'x',
            columns: Columns,
            type: 'bar'
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
                rotate: 75,
                multiline: true
              },
              height: 150
            }
          }
        });

        this.myfunnelchart = [
          { x: 'No Response', value: response[0].No_Response, text: 'No Response Candidate  : ' + response[0].No_Response },
          { x: 'Not Interested', value: response[0].Not_Interested, text: 'Not Interested Candidate: ' + response[0].Not_Interested },
          { x: 'Interested Assessment Not Attempted', value: response[0].Interested_Assessment_Not_Attempted, text: 'Interested Assessment Not Attempted : ' + response[0].Interested_Assessment_Not_Attempted },
          { x: 'Interested Assessment Attempted', value: response[0].Interested_Assessment_Attempted, text: 'Interested Assessment  Attempted : ' + response[0].Interested_Assessment_Attempted },

          // {x: 'All Candidate', value: response[0].all_candidate, text:  'All Candidate : ' + response[0].all_candidate}

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
          width: '60%'
        };

        this.loaddata = false;
      }

      if (this.columnDefs.length === 0 && response.length > 0) {

      }
      this.rowData = response;
      this.db.sl();
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
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');
      const dataroot = e.event.target.getAttribute('data-root');
      debugger;
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
    $('#ModelShowCandidatecampaignWise').modal('show');
    debugger;


    this.data.manager = row.id;
    debugger;

    // this.data.clientstatus = row.clientstatus;
    this.data.rootname = dataroot;
    debugger;

    // this.data = {'rootname': 'No Update'}


    this.db.list('candidatecampaignreportwise/', this.data, (response): void => {
      debugger;
      this.candidate_filtered_cols = [
        { 'headerName': 'Recruiter Name', 'field': 'RecruiterName', 'sortable': true, 'filter': true },
        { 'headerName': 'Candidate Name', 'field': 'candidateName', 'sortable': true, 'filter': true },
        { 'headerName': 'Email', 'field': 'email', 'sortable': true, 'filter': true },
        { 'headerName': 'Mobile No', 'field': 'mobileNo', 'sortable': true, 'filter': true },
        { 'headerName': 'Location', 'field': 'location', 'sortable': true, 'filter': true },
        { 'headerName': 'Status', 'field': 'disposition', 'sortable': true, 'filter': true },
      ];
      this.candidate_filtered = response;

    });
  }
  showcandidatereport(): void {
    // Total_Candidate.push(response[i].Total_Candidate);

    // const Columns = [];
    // Columns.push(all_candidate);

    // Highcharts.chart(this.container.nativeElement, {

    //   chart: {
    //      type: 'funnel'
    //  },
    //  title: {
    //      text: 'Hii'
    //  },
    //  plotOptions: {
    //      series: {
    //          dataLabels: {
    //             // enabled: true,
    //             format: '<b>{point.name}</b> ({point.y:,.0f})',
    //              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
    //             //  softConnector: true
    //          },
    //          center: ['50%', '50%'],
    //          neckWidth: '30%',
    //          neckHeight: '35%',
    //          width: '60%'
    //      }
    //  },
    // //  legend: {
    // //      enabled: false
    // //  },
    //  series: [{
    //      name: 'Unique users',
    //      data: [
    //          ['Website visits', 15],
    //          ['Downloads', 14],
    //          ['Requested price list', 9],
    //          ['Invoice sent', 7],
    //          ['Finalized', 4]
    //      ]
    //  }]

    //      });



  }


}
