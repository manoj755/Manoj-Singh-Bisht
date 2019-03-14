import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as c3 from 'c3';
declare var $: any;
@Component({
  selector: 'app-recruiter-report-newhistory',
  templateUrl: './recruiter-report-newhistory.component.html',
  styleUrls: ['./recruiter-report-newhistory.component.scss']
})
export class RecruiterReportNewhistoryComponent implements OnInit {

  myjob = {
    'client_detail_id': '0', 'job_id': '0', 'start_date': '2000-01-01',
    'end_date': new Date().toISOString().slice(0, 10).replace('T', ' '), 'manager': '0',
    'clientid': 0, rootname: '', cvstatus: '',
  }
  GridShowcandidateStatusWiseUnderReview = { data: null };
  GridShowcandidateStatusWiseRejected = { data: [] };
  GridShowcandidateStatusWiseInProcess = { data: null };
  GridshowjobsClientWise = { data: [] };
  GridShowcandidateStatusWiseSelected = { data: null };

  // all pop up grid  begins
  GridShowCandidateTotal_Candidate = { data: null };
  loaddata = false;
  clientreport;
  clientdetails = [];
  clientreportpie;
  managers = [];
  constructor(public db: DBService) { }
  ngOnInit() {
    this.getlistmain();
    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });
    this.db.list('manager/', null, (response): void => {
      this.managers = response;
      console.log(response);

    });
  }


  getlistmain = function () {
    $('.chartclass').height(500);
    this.db.hl();
    this.db.list('recruiterhistoryreportApi/', this.myjob, (response): void => {
      this.gridOptions.data = response;
      let jobshow = false;
      if (this.myjob.job_id === '0') {
        jobshow = true;
      }
      const xval = ['x'];

      // let  Total_Jobs = ['Total Jobs'];

      const Total_Candidate = ['Total'];
      const Did_not_pick_phone = ['Did_not_pick_phone'];
      const Call_Again = ['Call_Again'];
      const Interrested_sourced = ['Interrested_sourced'];
      const Call_Not_Picked_reminder_for_Call_back = ['Call_Not_Picked_reminder_for_Call_back'];


      for (const i in response) {
        if (response[i]) {
          if (this.jobshow) {
            xval.push(response[i].recruiter_Name + '( Jobs : ' + response[i].Total_Jobs + ')');
          } else {

          }
          //                Total_Jobs.push(response[i].Total_Jobs);
          Total_Candidate.push(response[i].Total_Candidate);
          Did_not_pick_phone.push(response[i].Did_not_pick_phone);
          Call_Again.push(response[i].Call_Again);
          Interrested_sourced.push(response[i].Interrested_sourced);
          Call_Not_Picked_reminder_for_Call_back.push(response[i].Call_Not_Picked_reminder_for_Call_back);
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

      Columns.push(Did_not_pick_phone);
      Columns.push(Call_Again);
      Columns.push(Interrested_sourced);
      Columns.push(Call_Not_Picked_reminder_for_Call_back);

      //            ColumnsPie.push(Did_not_pick_phone);
      //            ColumnsPie.push(Call_Again);
      //            ColumnsPie.push(Interrested_sourced);
      //            ColumnsPie.push(Call_Not_Picked_reminder_for_Call_back);
      //
      //

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

      //            for (let  i in response) {
      //                for (let  j in response[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }




      this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      this.db.sl();
    });
  };



  ShowCandidateTotal_Candidate(row): void {
    // this.myjob.clientid=0;
    this.myjob.manager = row.id;

    this.db.list('candidateClientWise/', this.myjob, (response): void => {

      this.GridShowCandidateTotal_Candidate.data = response;
      //  alert(response);

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  showjobsClientWise(row): void {
    this.myjob.clientid = row.id;
    this.db.list('jobclientwise/', this.myjob, (response): void => {

      this.GridshowjobsClientWise.data = response;

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  ShowcandidateStatusWiseSelected(row): void {
    this.myjob.manager = row.id;
    this.myjob.rootname = 'Selected';
    this.db.list('candidatestatuswiseall/', this.myjob, (response): void => {

      this.GridShowcandidateStatusWiseSelected.data = response;

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  ShowcandidateStatusWiseRejected(row): void {
    this.myjob.manager = row.id;
    this.myjob.rootname = 'Rejected';
    this.db.list('candidatestatuswiseall/', this.myjob, (response): void => {

      this.GridShowcandidateStatusWiseRejected.data = response;

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  ShowcandidateStatusWiseInProcess(row): void {
    // this.myjob.clientid = 0;
    this.myjob.cvstatus = 'Interrested';
    this.myjob.manager = row.id;

    this.myjob.rootname = 'In Process';
    this.db.list('candidatestatueswiseall/', this.myjob, (response): void => {

      this.GridShowcandidateStatusWiseInProcess.data = response;

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  ShowcandidateStatusWiseUnderReview(row): void {
    this.myjob.manager = row.id;
    this.myjob.rootname = 'Under Review';

    this.db.list('candidatestatuswiseall/', this.myjob, (response): void => {

      this.GridShowcandidateStatusWiseUnderReview.data = response;

      //    this.db.sl();
    }, (response): void => {
      // this.token=response.statusText;
      //      this.db.sl();
    });
  };

  // all pop up grid ends
  // DropDown Start Client/Job

  getcandidatebyclient = function () {
    this.myjob.job_id = '0';
    this.db.list('addnewjob/', { clientId: this.myjob.client_detail_id }, (response): void => {
      this.jobslistbyclients = response;
    }, (response): void => {
      // this.token=response.statusText;
    });
  };

  // DropDown Ends Client/Job





}
