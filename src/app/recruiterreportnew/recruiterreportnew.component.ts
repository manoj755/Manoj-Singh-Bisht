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
  gridTotalRejectedCandidate: any;
  gridTotalProcessCandidate: any;
  user: any;
  job: any;
  loaddata = false;
  update: any;
  showchart = false;
  clientreport: any;
  clientreportpie: any;
  updatedd: any;
  jobslistbyclients: any;
  myjob = { client_detail_id: 0, job_id: 0 };
  clientdetails: any;
  gridTotalCandidate = { data: null };
  constructor(private db: DBService) { }

  ngOnInit() {
    this.getlist();
    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }
  clientchange(): void {
    this.getlistmain();
    this.getcandidatebyclient();
  }

  getlistmain(): void {

    this.db.hl();
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


      this.gridOptions.data = response;
      this.db.sl();
    }, (response): void => {
      // $scope.token=response.statusText;
      this.db.sl();
    });
  };

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

  onGridReady(event): void {

  }





}
