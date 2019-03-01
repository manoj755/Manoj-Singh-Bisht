import { Component, OnInit } from '@angular/core';
import { DBService } from '../db.service';
@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit {

  jobslistbyclients: any = [];
  profile: any = {};
  callconversation: any = {};
  jobitemselected: any = {};
  activities: any = [];
  copycandidate: any = {};
  cv_to_panel: any = {};
  vendornew: any = {};
  sendtracker: any = {};
  commentstatus: any = {};
  trackerdatamyjob: any = {};
  jobslist: any = [];
  isLoadingJobs = false;
  $url = 'http://www.passivereferral.com/refer/';
  $urlapply = 'http://www.passivereferral.com/apply/';
  constructor(private db: DBService) { }

  ngOnInit() {
    this.bindJob();
  }
  bindJob(): void {
    this.isLoadingJobs = true;
    this.db.list('joblist/', {}, ((response): void => {
      this.jobslist = response;
      this.isLoadingJobs = false;

    })
    );
  }

}
