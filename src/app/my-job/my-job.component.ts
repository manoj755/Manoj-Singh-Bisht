import { Component, OnInit } from '@angular/core';
import { ManagerComponent } from "../control/manager/manager.component";

import { DBService } from "../db.service";
@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {

  jobslistbyclients:any=[];
  profile:any={};
  callconversation:any={};
  jobitemselected:any={};
  activities:any=[];
  copycandidate:any={};
  cv_to_panel:any={};
  vendornew:any={};
  sendtracker:any={};
  commentstatus:any={};
  trackerdatamyjob:any={};
  jobslist:any=[];
  isLoadingJobs=false;
  $url = 'http://www.passivereferral.com/refer/';
  $urlapply = 'http://www.passivereferral.com/apply/';
  constructor(private db: DBService) { }

  ngOnInit() {
this.bindJob();
  }
  bindJob():void{
    this.isLoadingJobs=true;
    this.db.list("joblist/", {}, ((response): void => {
      this.jobslist = response;
      this.isLoadingJobs=false;

  } )
  );
  }

}
