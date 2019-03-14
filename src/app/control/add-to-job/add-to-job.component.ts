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
  @Input()
  allids = [];
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
    this.loadmanagerid();

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addtojobcandidates(): void {
    if (!$('.validate').validate('#addtojob')) {
      //  $.fn.showMessage('Please fill values');
        return;
      }
    const allrow = this.allids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    const copyjob = {
      'candidates': allrow, 'job': this.addnewjob.add_new_job_id,
      'manager': this.addnewjob.manager
    };
    this.db.store('copyjob/', copyjob, ((response): void => {

      console.log(response);

      let addtojobmessage = '';
      if (response.alreadyexists > 0) {
        addtojobmessage = response.alreadyexists + ' Candidate(s) already in pipeline.';
      } else {
        addtojobmessage = 'Assign Candidate Successfully';

      }
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
