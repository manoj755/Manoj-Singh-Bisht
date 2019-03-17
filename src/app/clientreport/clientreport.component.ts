import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as c3 from 'c3';
declare let $: any;
@Component({
  selector: 'app-clientreport',
  templateUrl: './clientreport.component.html',
  styleUrls: ['./clientreport.component.scss']
})
export class ClientreportComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  gridTotalCandidatejob = {
    data: null,

  };
  loaddata = false;
  gridTotalSelectedCandidate = {
    data: null,

  };
  gridTotalUnderReviewCandidate = {
    data: null,

  };
  gridTotalJobs = {
    data: null,

  };
  gridOptions = {
    data: null,

  };
  // grid
  columnDefs = [

    { 'headerName': 'Client Name', 'field': 'Client_Name', 'sortable': true, 'filter': true },
    {
      'headerName': 'Total_Jobs', 'field': 'Total_Jobs', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='totaljob' class='btn  btn-sm'>
     ` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Total Candidate', 'field': 'Total_Candidate', 'sortable': true, 'filter': true
      ,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='totalcandidate' class='btn  btn-sm'>
    ` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Selected Candidate', 'field': 'selected_Candidate', 'sortable': true, 'filter': true
      ,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Selected' class='btn  btn-sm'>
     ` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'Rejected Candidate', 'field': 'Rejected_Candidate', 'sortable': true, 'filter': true
      ,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Rejected' class='btn  btn-sm'>
     ` + param.value + `
</button>
`;
      }
    },
    {
      'headerName': 'In Process Candidate', 'field': 'In_Process_Candidate', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='filtered' data-root='In Process'   class='btn  btn-sm'>
      ` + param.value + `
 </button>
`;
      }
    },
    {
      'headerName': 'Interview', 'field': 'Interview', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='Interview'   class='btn  btn-sm'>
       ` + param.value + `
  </button>
 `;
      }
    },
    {
      'headerName': 'Under Review', 'field': 'UnderReview', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='filtered' data-root='Under Review' ` +
          `   class='btn  btn-sm'>
        ` + param.value + `
   </button>`;
      }
    }];
  rowData = [];
  filtertitle = '';
  // grid
  gridTotalRejectedCandidate: any;
  gridTotalProcessCandidate: any;
  user: any;
  job: any;
  GridShowCandidateTotal_Candidate = [];
  GridShowCandidateTotal_Candidate_cols = [];
  showjobsClientWiseRows = [];
  showjobsClientWiseCols = [];
  candidate_filtered = [];
  candidate_filtered_cols = [];
  update: any;
  updatedd: any;
  jobslistbyclients: any;
  myjob = { client_detail_id: 0, clientid: 0, isinterview: null, rootname: '' };
  clientdetails: any;
  gridTotalCandidate = { data: null };
  constructor(public db: DBService) { }

  ngOnInit() {
    this.getlistmain();
    this.getlist();
    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });

  }
  refreshgrid(): void {



  }
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');
      const dataroot = e.event.target.getAttribute('data-root');

      switch (actionType) {
        case 'totaljob':
          this.load_total_job(data);
          break;
        case 'totalcandidate':
          this.load_total_candidate(data);
          break;
        case 'filtered':
          return this.load_filtered(data, dataroot);
          break;
      }
    }
  }
  load_filtered(row, dataroot): void {
    this.filtertitle = dataroot;
    $('#ModelShowcandidateStatusWise').modal('show');

    this.myjob.clientid = row.id;
    this.myjob.rootname = dataroot;
    if (dataroot === 'Interview') {
      this.myjob.isinterview = 1;
      this.myjob.rootname = 'Interview';

    } else {
      this.myjob.isinterview = 0;
    }

    this.db.list('candidatestatuswiseall/', this.myjob, (response): void => {
      this.candidate_filtered_cols = this.db.GenerateColDef(response);
      this.candidate_filtered = response;
      debugger;
      const Columns = [];
      for (const i in this.candidate_filtered) {
        if (Columns.length === 0) {
          Columns.push([this.candidate_filtered[i].Status, 1]);

        } else {
          let isToadd = true;
          for (const k in Columns) {
            if (Columns[k]) {
              const tempdata = Columns[k];
              if (this.candidate_filtered[i].Status === tempdata[0]) {
                tempdata[1] = tempdata[1] + 1;
                isToadd = false;

              }
            }


          }
          if (isToadd) {
            Columns.push([this.candidate_filtered[i].Status, 1]);

          }
          isToadd = true;
        }
      }
      debugger;
      let clientbarunderreviewpie3 = c3.generate({

        //x: 'x',
        bindto: '#clientbarunderreviewpie3',
        data: {

          columns: Columns,
          type: 'pie'
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
      let clientbarunderreview3 = c3.generate({
        //x: 'x',
        bindto: '#clientbarunderreview3',
        data: {

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


      //    db.sl();
    });
  }
  load_total_job(data): void {
    $('#ModelshowjobsClientWise').modal('show');
    this.myjob.clientid = data.id;
    this.db.list('jobclientwise/', this.myjob, (response): void => {
      this.showjobsClientWiseCols = this.db.GenerateColDef(response);
      this.showjobsClientWiseRows = response;


      //    db.sl();
    });
  }
  load_total_candidate(data): void {
    $('#ModelShowCandidateTotal_Candidate').modal('show');
    this.myjob.clientid = data.id;
    this.db.list('candidateclientwise/', this.myjob, (response): void => {
      this.GridShowCandidateTotal_Candidate_cols = this.db.GenerateColDef(response);
      this.GridShowCandidateTotal_Candidate = response;

      //    db.sl();
    });
  }

  ddlchangeclient(): void {
    this.getlistmain(); this.getcandidatebyclient();
  }

  getlistmain = function () {

    this.db.hl();

    if (this.myjob.client_detail_id.length > 0) {
      this.myjob.client_detail_id_D = this.myjob.client_detail_id.toString();
    } else {
      this.myjob.client_detail_id_D = 0;
    }
    if (this.myjob.job_id && this.myjob.job_id.length > 0) {
      this.myjob.job_id_D = this.myjob.job_id.toString();
    } else {
      this.myjob.job_id_D = 0;
    }

    if (this.myjob.manager && this.myjob.manager.length > 0) {
      this.myjob.manager_D = this.myjob.manager.toString();
    } else {
      this.myjob.manager_D = 0;
    }

    this.db.list('clientreportApi/', this.myjob, (response): void => {
      let jobshow = true;
      if (this.myjob.job_id === 0) {
        jobshow = true;
      }



      // Chart Design Begin
      const xval = ['x'];

      // let Total_Jobs = ['Total Jobs'];

      const Total_Candidate = ['Total'];
      const selected_Candidate = ['Selected'];
      const Rejected_Candidate = ['Rejected'];
      const In_Process_Candidate = ['In Process'];
      const UnderReview = ['Under Review'];
      // let Interview = ['isinterview'];

      // let j=15;
      // let total=Total_Candidate;
      for (const i in response) {
        if (response[i]) {
          if (jobshow) {
            xval.push(response[i].Client_Name + '( Jobs : ' + response[i].Total_Jobs + ')');
          } else {

          }
          //                Total_Jobs.push(response[i].Total_Jobs);

          Total_Candidate.push(response[i].Total_Candidate);
          selected_Candidate.push(response[i].selected_Candidate);
          Rejected_Candidate.push(response[i].Rejected_Candidate);
          In_Process_Candidate.push(response[i].In_Process_Candidate);
          UnderReview.push(response[i].UnderReview);
        }
        // Interview.push(response[i].Interview);
      }
      const Columns = [];
      const ColumnsPie = [];
      Columns.push(xval);
      //            if (jobshow) {
      //
      //                Columns.push(Total_Jobs);
      //            }

      Columns.push(Total_Candidate);
      // debugger;
      Columns.push(selected_Candidate);
      Columns.push(Rejected_Candidate);
      Columns.push(In_Process_Candidate);
      Columns.push(UnderReview);

      ColumnsPie.push(selected_Candidate);
      ColumnsPie.push(Rejected_Candidate);
      ColumnsPie.push(In_Process_Candidate);
      ColumnsPie.push(UnderReview);



      if (this.loaddata) {
        this.clientreport.load({
          unload: true,
          columns: Columns
        });
        this.clientreportpie.load({
          unload: true,
          columns: ColumnsPie
        });
      } else {
        this.clientreport = c3.generate({
          bindto: '#clientReport',
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
        this.clientreportpie = c3.generate({
          bindto: '#clientReportpie',
          data: {

            columns: ColumnsPie,
            type: 'pie'
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
                multiline: false
              },
              height: 150
            }
          }
        });

        this.loaddata = true;
      }
      // Chart Design End

      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      if (this.columnDefs.length === 0 && response.length > 0) {
        //   this.columnDefs = this.db.GenerateColDef(response);

      }
      this.rowData = response;

      this.db.sl();
    }, function (response) {
      // this.token=response.statusText;
      this.db.sl();
    });
  };
  // grid
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  // grid
  showjobsClientWise(row): void {
    this.refreshgrid();


    this.db.list('jobclientwise/', { id: row.id }, ((response): void => {

      this.gridTotalJobs.data = response;
      // $rootScope.showkeys(response, ',width:150');
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response;

    }));

  };
  ShowCandidateClientWise(row): void {
    this.refreshgrid();

    this.db.list('candidateclientwise/', { id: row.id }, (response): void => {

      this.gridTotalCandidate.data = response;
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      this.gridTotalCandidate.data = response;

    });

  };
  RejectedCandidate(row): void {
    this.refreshgrid();

    this.db.list('rejectedCandidatewise/', { id: row.id }, (response): void => {

      this.gridTotalRejectedCandidate.data = response;
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      this.gridTotalRejectedCandidate.data = response;

    });

  };

  ProcessCandidatewise(row): void {

    this.refreshgrid();
    this.db.list('processcandidate/', { id: row.id }, (response): void => {

      this.gridTotalProcessCandidate.data = response;
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      this.gridTotalProcessCandidate.data = response;

    });

  };
  binddatatogrid(response): void {

    this.gridTotalSelectedCandidate.data = response;


  }
  ShowcandidateStatusWise(row): void {
    this.refreshgrid();

    this.db.list('candidatestatuswise/', { id: row.id }, (response): void => {
      this.binddatatogrid(response);
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }




    });

  };
  ShowcandidateStatusWiseSelected(row): void {
    this.refreshgrid();
    this.db.list('candidatestatuswiseall/', { id: row.id, 'rootname': 'Selected' }, (response): void => {

      this.binddatatogrid(response);



    });

  };
  ShowcandidateStatusWiseRejected(row): void {
    this.refreshgrid();

    this.db.list('candidatestatuswiseall/', { id: row.id, 'rootname': 'Rejected' }, (response): void => {

      this.binddatatogrid(response);



    });

  };
  ShowcandidateStatusWiseInProcess(row): void {
    this.refreshgrid();

    this.db.list('candidatestatuswiseall/', { id: row.id, 'rootname': 'In Process' }, (response): void => {

      this.binddatatogrid(response);



    });

  };
  ShowcandidateStatusWiseUnderReview(row): void {
    this.refreshgrid();

    this.db.list('candidatestatuswiseall/', { id: row.id, 'rootname': 'Under Review' }, (response): void => {

      this.binddatatogrid(response);



    });

  };

  ShowTotalCandidatejob(row): void {

    this.refreshgrid();
    this.db.list('candidatejobwise/', { id: row.id }, (response): void => {

      this.gridTotalCandidatejob.data = response;
      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalCandidatejob.data = response;

    });

  };


  getlist(): void {

    this.db.list('clientreportApi/', null, (response): void => {


      //            for (let i in response) {
      //                for (let j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      this.gridOptions.data = response;

    });
  }
  deleteThisRow(entity): void {
    console.log(entity);
  }





  usersave(): void {
    // this.user.profilepic=this.user.profilepic[0];
    this.db.store('clientreportApi/', this.user, (response): void => {
      alert('item saved');
      this.getlist();
      this.user = {};


    });
  }






  getcandidatebyclient(): void {

    this.db.list('addnewjob/', { clientId: this.myjob.client_detail_id }, (response): void => {
      this.jobslistbyclients = response;
    });
  };





}
