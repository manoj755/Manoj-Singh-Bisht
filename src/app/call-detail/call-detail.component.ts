import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {
  }

}
