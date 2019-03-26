import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as c3 from 'c3';
declare var $: any;
@Component({
  selector: 'app-recruiterreportnew',
  templateUrl: './recruiterreportnew.component.html',
  styleUrls: ['./recruiterreportnew.component.scss']
})
export class RecruiterreportnewComponent implements OnInit {


  // grid
  columnDefs = [
    { 'headerName': 'Recruiter', 'field': 'recruiter_Name', 'sortable': true, 'filter': true },
    {
      'headerName': 'Total Candidate', 'field': 'Total_Candidate', 'sortable': true, 'filter': true
      ,
      cellRenderer: function (param) {
        return `<button type='button' data-action-type='filtered' data-root='all' class='btn  btn-sm'>
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
      'headerName': 'Under Review', 'field': 'UnderReview', 'sortable': true, 'filter': true,
      cellRenderer: function (param) {
        return `<button type='button'  data-action-type='filtered' data-root='Under Review' ` +
          `   class='btn  btn-sm'>
        ` + param.value + `
   </button>`;
      }
    }
  ];
  rowData = [];
  // grid

  gridTotalCandidatejob = {
    data: null,

  };

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
  filtertitle = '';
  gridTotalRejectedCandidate: any;
  gridTotalProcessCandidate: any;
  gridColumnApi: any;
  gridApi: any;
  managers = [];
  user: any;
  job: any;
  loaddata = false;
  update: any;
  allids: any;
  showchart = true;
  clientreport: any;
  clientreportpie: any;
  candidate_filtered = [];
  candidate_filtered_cols = [];
  updatedd: any;
  jobslistbyclients: any;
  myjob = { rootname: '', client_detail_id: 0, job_id: 0, manager: 0, start_date: '2000-01-01', end_date: '2019-12-12' };
  clientdetails: any;
  gridTotalCandidate = { data: null };
  constructor(private db: DBService) { }

  ngOnInit() {
    this.bindmanagers();

    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });
    this.getlistmain();

  }
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');
      const dataroot = e.event.target.getAttribute('data-root');

      switch (actionType) {

        case 'filtered':
          return this.load_filtered(data, dataroot);
          break;
      }
    }
  }
  load_filtered(row, dataroot): void {
    this.filtertitle = dataroot;
    $('#ModelShowcandidateStatusWise').modal('show');

    this.myjob.manager = row.id;
    this.myjob.rootname = dataroot;


    this.db.list('candidatereqruiterstatuswiseall/', this.myjob, (response): void => {
      this.candidate_filtered_cols = [
        { 'headerName': 'Recruiter Name', 'field': 'RecruiterName', 'sortable': true, 'filter': true },
        { 'headerName': 'Candidate Name', 'field': 'candidateName', 'sortable': true, 'filter': true },
        { 'headerName': 'Email', 'field': 'email', 'sortable': true, 'filter': true },
        { 'headerName': 'Mobile No', 'field': 'mobileNo', 'sortable': true, 'filter': true },
        { 'headerName': 'Location', 'field': 'location', 'sortable': true, 'filter': true },
        { 'headerName': 'Title', 'field': 'job_title', 'sortable': true, 'filter': true },
        { 'headerName': 'Status', 'field': 'Status', 'sortable': true, 'filter': true }];// this.db.GenerateColDef(response);
      this.candidate_filtered = response;
      //
      // const Columns = [];
      // for (const i in this.candidate_filtered) {
      //   if (Columns.length === 0) {
      //     Columns.push([this.candidate_filtered[i].Status, 1]);

      //   } else {
      //     let isToadd = true;
      //     for (const k in Columns) {
      //       if (Columns[k]) {
      //         const tempdata = Columns[k];
      //         if (this.candidate_filtered[i].Status === tempdata[0]) {
      //           tempdata[1] = tempdata[1] + 1;
      //           isToadd = false;

      //         }
      //       }


      //     }
      //     if (isToadd) {
      //       Columns.push([this.candidate_filtered[i].Status, 1]);

      //     }
      //     isToadd = true;
      //   }
      // }
      //
      // let clientbarunderreviewpie3 = c3.generate({

      //   //x: 'x',
      //   bindto: '#clientbarunderreviewpie3',
      //   data: {

      //     columns: Columns,
      //     type: 'pie'
      //   },
      //   bar: {
      //     width: {
      //       ratio: 0.8 // this makes bar width 50% of length between ticks
      //     }
      //   },
      //   axis: {
      //     x: {
      //       type: 'category',
      //       tick: {
      //         rotate: 75,
      //         multiline: true
      //       },
      //       height: 150
      //     }
      //   }
      // });
      // let clientbarunderreview3 = c3.generate({
      //   //x: 'x',
      //   bindto: '#clientbarunderreview3',
      //   data: {

      //     columns: Columns,
      //     type: 'bar'
      //   },
      //   bar: {
      //     width: {
      //       ratio: 0.8 // this makes bar width 50% of length between ticks
      //     }
      //   },
      //   axis: {
      //     x: {
      //       type: 'category',
      //       tick: {
      //         rotate: 75,
      //         multiline: true
      //       },
      //       height: 150
      //     }
      //   }
      // });


      //    db.sl();
    });
  }
  bindmanagers(): void {
    this.db.list('manager/', null, ((response): void => {
      this.managers = response;
      console.log(response);

    })
    );
  }
  ddlchangeclient(): void {

    this.getcandidatebyclient();
    this.getlistmain();
  }
  clientchange(): void {
    this.getlistmain();
    this.getcandidatebyclient();
  }

  getlistmain(): void {

    this.db.hl();
    $('.chartctrl').height(500);
    this.db.list('recruiterreportApi/', this.myjob, (response): void => {
      let jobshow = false;
      if (this.myjob.job_id === 0) {
        jobshow = true;
      }

      const xval = ['x'];

      // var Total_Jobs = ['Total Jobs'];

      const Total_Candidate = ['Total'];
      const selected_Candidate = ['Selected'];
      const Rejected_Candidate = ['Rejected'];
      const In_Process_Candidate = ['In Process'];
      const UnderReview = ['Under Review'];


      for (const i in response) {
        if (response[i]) {
          if (jobshow) {
            xval.push(response[i].recruiter_Name + '( Jobs : ' + response[i].Total_Jobs + ')');
          } else {

          }
          //                Total_Jobs.push(response[i].Total_Jobs);
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
      //            if (jobshow) {
      //
      //                Columns.push(Total_Jobs);
      //            }

      Columns.push(Total_Candidate);

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

      //            for (var i in response) {
      //                for (var j in response[i]) {
      //                    $scope.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      if (this.columnDefs.length === 0 && response.length > 0) {
        // this.columnDefs = this.db.GenerateColDef(response);

      }
      this.rowData = response;
      this.db.sl();

    }, (response): void => {
      // $scope.token=response.statusText;
      this.db.sl();
    });
  };


  // grid
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  // grid

  refreshgrid(): void {



  }
  showjobsClientWise(row): void {
    this.refreshgrid();


    this.db.list('jobclientwise/', { id: row.id }, ((response): void => {

      this.gridTotalJobs.data = response;
      // $rootScope.showkeys(response, ',width:150');
      //            for (var i in response) {
      //                for (var j in response[i]) {
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
      //            for (var i in response) {
      //                for (var j in response[i]) {
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
      //            for (var i in response) {
      //                for (var j in response[i]) {
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
      //            for (var i in response) {
      //                for (var j in response[i]) {
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
      //            for (var i in response) {
      //                for (var j in response[i]) {
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
      //            for (var i in response) {
      //                for (var j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalCandidatejob.data = response;

    });

  };


  getlist(): void {

    this.db.list('clientreportApi/', null, (response): void => {


      //            for (var i in response) {
      //                for (var j in response[i]) {
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


  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());

  }



}
