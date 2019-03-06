import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from 'app/db.service';
@Component({
  selector: 'app-candidatestatusupdate',
  templateUrl: './candidatestatusupdate.component.html',
  styleUrls: ['./candidatestatusupdate.component.scss']
})
export class CandidatestatusupdateComponent implements OnInit {

  smsreferrers: any;
  smscandidates: any;
  Emailreferrers: any;
  Emailcandidates: any;
  emailjobstatuses: any;
  smsjobstatuses: any;
  jobstatus: any = {};
  candidatestatuswithmsgs: any;
  constructor(private db: DBService) {
  }

  ngOnInit() {
    this.page_load();
    this.getlist();
  }

  updatestatus(row): void {

    for (const i in row) {
      if (row[i] === null) {
        row[i] = 0;
      }
    }
    console.log(row);
    this.db.store('candidatestatusupdate/', row, (r): void => {
      this.getlist();
      this.db.showMessage('Updated');
    });


  }

  page_load(): void {



    this.db.list('messagetemplatefordd/', { ta: 'rs', tt: 'SMS' }, (response): void => {

      this.smsreferrers = response;
    }, (response): void => {
      // this.token=response.statusText;
    });
    this.db.list('messagetemplatefordd/', { ta: 'cs', tt: 'SMS' }, (response): void => {

      this.smscandidates = response;
    }, (response): void => {
      // this.token=response.statusText;
    });
    this.db.list('messagetemplatefordd/', { ta: 'rs', tt: 'Email' }, (response): void => {

      this.Emailreferrers = response;
    }, (response): void => {
      // this.token=response.statusText;
    });
    this.db.list('messagetemplatefordd/', { ta: 'cs', tt: 'Email' }, (response): void => {

      this.Emailcandidates = response;
    }, (response): void => {
      // this.token=response.statusText;
    });

    this.db.list('messagetemplatefordd/', { ta: 'job_status', tt: 'Email' }, (response): void => {

      this.emailjobstatuses = response;
    }, (response): void => {
      // this.token=response.statusText;
    });
    this.db.list('messagetemplatefordd/', { ta: 'job_status', tt: 'SMS' }, (response): void => {

      this.smsjobstatuses = response;
    }, (response): void => {
      // this.token=response.statusText;
    });

    this.db.list('jobstatuschange', null, (response): void => {

      const jobstatuschangedata = response;
      for (const i in jobstatuschangedata) {
        if (jobstatuschangedata[i] !== null) {
          jobstatuschangedata[i] = jobstatuschangedata[i].toString();
        }

      }
      this.jobstatus = jobstatuschangedata;

    });

  }
  jobstatusupdate(): void {
    if (this.jobstatus === undefined) {
      // alert('please select option');
      this.db.addmessageandremove('Please select option.');

    } else {
      this.db.store('jobstatuschange', this.jobstatus, (response): void => {
        this.db.addmessageandremove('Saved successfully.');
      }, (response): void => {
        this.db.addmessageandremove('Please try again.');
      });
      // this.db.

    }

  };
  getlist(): void {

    this.db.list('candidatestatuswithmsg/', null, (response): void => {



      try {
        this.candidatestatuswithmsgs = response;
      } catch (e) {
      }

    }, (response): void => {
      // this.token=response.statusText;
    });
  };







}
