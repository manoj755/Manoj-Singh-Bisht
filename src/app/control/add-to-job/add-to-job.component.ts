import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-add-to-job',
  templateUrl: './add-to-job.component.html',
  styleUrls: ['./add-to-job.component.scss']
})
export class AddToJobComponent implements OnInit {

  clients: any = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  constructor(private db: DBService) {

  }

  ngOnInit() {
  }
  addtojobcandidates(): void {

    alert(this.db.getIDs());

  }

}
