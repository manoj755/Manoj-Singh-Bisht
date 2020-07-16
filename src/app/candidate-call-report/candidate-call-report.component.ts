import { Component, OnInit, ViewChild, ElementRef,VERSION } from '@angular/core';

import { ChartComponent, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

import { DBService } from 'app/db.service';
import * as c3 from 'c3';
import * as d3 from 'd3';
declare var $: any;

@Component({
  selector: 'app-candidate-call-report',
  templateUrl: './candidate-call-report.component.html',
  styleUrls: ['./candidate-call-report.component.scss']
})
export class CandidateCallReportComponent implements OnInit {
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
      'headerName': 'Interested Complete', 'field': 'Interested_Complete', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Interested Complete' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': ' Interested InComplete ', 'field': 'Interested_InComplete', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Interested InComplete' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },

    {
      'headerName': 'No Responce', 'field': 'No_Response', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='No Response' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Not Intrested ', 'field': 'Not_Interested', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Not Intrested' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'No Status', 'field': 'No_status', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='No status' class='btn  btn-sm'>
` + param.value + `
</button>
`;
      }
    },
  ];
  rowData =[];
  @ViewChild('ModelShowCallcampaignprint')
  public chartObj: CandidateCallReportComponent;
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


getlistdata(): void{
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
    'manager' :this.userids,'campaign' : this.campaign, 'start_date': this.db.toYYMMDD(this.start_date), 'end_date': this.db.toYYMMDD(this.end_date)
   }
  this.db.list('candidatecallreportApi/',this.data, (response): void => {
    debugger;
    this.rowDatas = response[0].Interested;
debugger;
  this.myfunnelchart = [
    {x: 'No status', value: response[0].No_status, text: 'No status  : ' + response[0].No_status},
    {x: 'No Response', value: response[0].No_Response, text: 'No Response: ' + response[0].No_Response},
    {x: 'Not Intrested', value: response[0].Not_Interested, text: 'Not Intrested : ' + response[0].Not_Interested},
    {x: 'Interested InComplete', value: response[0].Interested_InComplete, text: 'Interested InComplete : ' + response[0].Interested_InComplete},
    {x: 'Interested Complete', value: response[0].Interested_Complete, text: 'Interested Complete : ' + response[0].Interested_Complete},
  ];
  this.tooltipSetting ={
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
  // }

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
  $('#ModelShowCandidatecallWise').modal('show');
  debugger;


  this.data.manager = row.id;
  debugger;

  // this.data.clientstatus = row.clientstatus;
  this.data.rootname = dataroot;
debugger;

  // this.data = {'rootname': 'No Update'}


  this.db.list('candidatecallreportwise/', this.data, (response): void => {
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
  showcandidatereport(): void{
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

