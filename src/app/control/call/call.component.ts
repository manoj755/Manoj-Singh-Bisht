import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'app/db.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input()
  allids = [];
  clients = [];
  jobslistbyclientsaddtojob = [];
  managers = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  selectedCarId: any;
  emailselected: any = {};
  smsselected: any = {};
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  constructor(public db: DBService) {

  }

  ngOnInit() {
    this.db.list('clientdetail/', null, ((response): void => {
      this.clients = response;
      console.log(this.clients);
    }));
    this.db.list('profile/', null, ((response): void => {
      this.profile = response;
      console.log(this.profile);
    }));
    this.loadmanagerid();

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  sendcalltocandidates(): void {

    const allrow = this.allids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    const copyjob = {
      'candidates': allrow.toString(), 'job': this.addnewjob.add_new_job_id,
      'manager': this.addnewjob.manager
    };
    this.db.store('sendcall/', copyjob, ((response): void => {

      console.log(response);

      const addtojobmessage = 'Done';

      this.db.showMessage(addtojobmessage);

    }), ((Response): void => {
      this.db.showMessage('Some error occured');
    })
    );

  }
  getcandidatebyclientaddtojob(): void {

    this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id }, ((response): void => {
      this.jobslistbyclientsaddtojob = response;
    }));
  }

  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };
}
