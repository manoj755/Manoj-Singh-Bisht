import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  commentstatus = {};
  managers = [];
  currentstatusid = 0;
  currentstatusname = '';
  statuses = [];
  constructor(private db: DBService) { }

  ngOnInit() {

  }
  updatestatuscommentmyjob(): void {

  }

}
