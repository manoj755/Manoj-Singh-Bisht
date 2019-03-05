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
  update: any;
  updatedd: any;
  jobslistbyclients: any;
  myjob = { client_detail_id: 0 };
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





}
