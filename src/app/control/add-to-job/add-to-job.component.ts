import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'app/db.service';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-add-to-job',
  templateUrl: './add-to-job.component.html',
  styleUrls: ['./add-to-job.component.scss']
})
export class AddToJobComponent implements OnInit {
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
  assign = false;
  unassign = false;
  @Input()
  allids = [];
  @Input()
  callids = [];
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  jobslistbyclientsaddtojobs: any;
  constructor(public db: DBService) {

  }

  ngOnInit() {
    this.assign = true;
    this.unassign = false;
    this.db.list('clientdetail/', null, ((response): void => {
      this.clients = response;
      console.log(this.clients);
    }));
    this.loadmanagerid();

  }

  assigncandidate(): void{
    this.assign = true;
    this.unassign = false;
  }
  unassigncandidate(): void{
    this.assign = false;
    this.unassign = true ;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addtojobcandidates(): void {
    // if (!$('.validate').validate('#addtojob')) {
    //   //  $.fn.showMessage('Please fill values');
    //     return;
    //   }
    debugger
    const allrow = this.allids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    const copyjob = {
      'candidates': allrow.toString(), 'job': this.addnewjob.add_new_job_id,
      'manager': this.addnewjob.manager
    };
    this.db.store('copyjob/', copyjob, ((response): void => {

      console.log(response);
      $('#addtojob').modal('hide');

      let addtojobmessage = '';
      if (response.alreadyexists > 0) {
        addtojobmessage = response.alreadyexists + ' Candidate(s) already in pipeline.';
      } else {
        addtojobmessage = 'Candidate Added Successfully';


      }
      this.db.showMessage(addtojobmessage);
      this.afteraddtojob();

    })
    );
    // ((Response): void => {
    //   this.db.showMessage('Some error occured');
    // })
    // );

  }
  afteraddtojob(): void {
    debugger;
    if (this.callids.length > 0 ) {
      const allrow = this.allids;
      const callid = this.callids;
      const job_id = this.addnewjob.add_new_job_id;

      const data = { 'candidateid': allrow.toString(), 'callid': callid.toString(), 'job_id': job_id };
      this.db.store('candidateaddtojob/', data, (response): void => {
        this.db.showMessage('Candidate remove from callhistory');
      }
      );
    }
  }

  assignjob(): void {
    debugger;
    const assignjob = {
      'managers': [this.addnewjob.manager],
      'jobs': [this.addnewjob.add_new_job_id],
      'assigndate':"OneDay"

    };
    this.db.store('assignjob/', assignjob, ((response): void => {
      this.addtojobcandidates();
      console.log(response);
      this.getcandidatebyclientaddtojob();
      this.db.addmessageandremove('job successfully asssign for ToDay');
    }));
  };


  getcandidatebyclientaddtojob(): void {
  debugger;
    this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id, managerId: this.addnewjob.manager }, ((response): void => {
      debugger;
      this.jobslistbyclientsaddtojob = response[0];
      this.jobslistbyclientsaddtojobs = response[1];
    }));
  }

  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };
  // filterListCareUnit(val) {
  //   console.log(val);
  //   this.jobslistbyclientsaddtojobs = this.jobslistbyclientsaddtojobs.filter((unit) => unit.label.indexOf(val) > -1);
  // }

}
