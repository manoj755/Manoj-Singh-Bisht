import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'app/db.service';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-concentrix-call',
  templateUrl: './concentrix-call.component.html',
  styleUrls: ['./concentrix-call.component.scss']
})
export class ConcentrixCallComponent implements OnInit {
  @Input()
  allids = [];
  clients = [];
  departments = [];
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
    // this.db.list('department/', null, ((response): void => {
    //   this.clients = response;
    //   console.log(this.departments);
    // }));
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
    debugger;
    const allrow = this.allids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    if ((this.addnewjob.interview_startdate === undefined)  || (this.addnewjob.interview_enddate === undefined)) {
      const copyjob = {
        'candidates': allrow.toString(),
        'job': this.addnewjob.add_new_job_id,
        'manager': this.addnewjob.manager,
         'callto': this.addnewjob.callto,
        // 'interview_startdate': this.db.toYYMMDDTT(this.addnewjob.interview_startdate),
        // 'interview_ostartdate': this.db.toYYMMDDTT(this.addnewjob.interview_ostartdate),
        // 'interview_enddate': this.db.toYYMMDDTT(this.addnewjob.interview_enddate),
        // 'interview_oenddate': this.db.toYYMMDDTT(this.addnewjob.interview_oenddate),
        // 'interview_loc': this.addnewjob.interview_loc
      };

      //debugger;
      this.db.store('sendcall/', copyjob, ((response): void => {

        //console.log(response);
        $('#calldiv').modal('hide');

        const addtojobmessage = 'Done';

        this.db.showMessage(addtojobmessage);

      }), ((Response): void => {
        this.db.showMessage('Some error occured');
      })
      );
    } else {
      const copyjob = {
        'candidates': allrow.toString(), 'job': this.addnewjob.add_new_job_id,
        'manager': this.addnewjob.manager, 'callto': this.addnewjob.callto,
        'interview_startdate': this.db.toYYMMDD(this.addnewjob.interview_startdate),
        'interview_time_start': this.db.toTT(this.addnewjob.interview_ostartdate),
        'interview_enddate': this.db.toYYMMDD(this.addnewjob.interview_enddate),
        'interview_time_end': this.db.toTT(this.addnewjob.interview_oenddate),
        'interview_loc': this.addnewjob.interview_loc
      };

      //debugger;
      this.db.store('sendcall/', copyjob, ((response): void => {

        //console.log(response);
        $('#calldiv').modal('hide');

        const addtojobmessage = 'Done';

        this.db.showMessage(addtojobmessage);

      }), ((Response): void => {
        this.db.showMessage('Some error occured');
      })
      );

    }
  }
  getcandidatebyclientaddtojob(): void {

    this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id }, ((response): void => {
      this.jobslistbyclientsaddtojob = response;
    }));
  }
  getcandidatebydepartmentaddtojob(): void {

    this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id }, ((response): void => {
      this.jobslistbyclientsaddtojob = response;
    }));
  }

  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };
  directlineupdata(): void {
    $('#directlineupdata').show();


  };
  hidedirectlineupdata(): void {
    $('#directlineupdata').hide();


  };
}
