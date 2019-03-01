import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import { FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-pv-get-reference',
  templateUrl: './pv-get-reference.component.html',
  styleUrls: ['./pv-get-reference.component.scss']
})
export class PvGetReferenceComponent implements OnInit {
  public Editor = ClassicEditor;
  clients = [];
  jobslistbyclientsaddtojob = [];
  managers = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  sendemail = false;
  sendsms = false;
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  selectedCarId: any;
  emailselected: any = {};
  smsmessagetemplates = [];
  emailmessagetemplates = [];
  smsselectedid = 0;
  emailselectedid = 0;
  smsselected: any = {};
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new FormControl();
  tabindex = 0;
  options: string[] = ['One', 'Two', 'Three'];
  constructor(private db: DBService) {

  }

  ngOnInit() {
    this.db.list('clientdetail/', null, ((response): void => {
      this.clients = response;
      console.log(this.clients);
    }));
    this.loadmanagerid();
    this.setDropDown();

  }

  sendMessage(): void {

    // this.user.profilepic=this.user.profilepic[0];
    const allrow = this.db.getIDs(this.db.nodetype);

    if (this.sendemail) {


      this.myjob.prmCandidateId = allrow;
      this.myjob.prmTemplateId = this.emailselected.id;
      this.myjob.jobid = this.myjob.add_new_job_id;
      this.myjob.token = localStorage.Authkey;

      this.db.store('getreference/', this.myjob, ((response): void => {

        console.log(response);
        alert('done');




      }));
    }
    if (this.sendsms) {
      this.sms.prmTemplateId = this.smsselected.id;
      this.sms.prmCandidateId = allrow;
      this.sms.jobid = this.myjob.add_new_job_id;
      this.db.store('smsgetreference/', this.sms, ((response): void => {

        console.log(response);
        alert('done');




      }));

    }
  }


  setDropDown(): void {
    this.db.list('smsmessagetemplate/', null, ((response): void => {
      this.smsmessagetemplates = response;
    }));
    // Email-Message-Template
    this.db.list('emailmessagetemplate/', null, ((response): void => {
      this.emailmessagetemplates = response;

    }));
  }
  setsms(): void {
    for (const i in this.smsmessagetemplates) {
      if (this.smsmessagetemplates[i].id === this.smsselectedid) {
        this.smsselected = this.smsmessagetemplates[i];
      }
    }
    // this.myjob.prmSubject = this.emailselected.title;
    this.sms.prmMessagge = this.smsselected.message;
  };

  setemail(): void {
    debugger;
    for (const i in this.emailmessagetemplates) {
      if (this.emailmessagetemplates[i].id === this.emailselectedid) {
        this.emailselected = this.emailmessagetemplates[i];
      }
    }

    this.myjob.prmSubject = this.emailselected.title;
    this.myjob.prmMessagge = this.emailselected.message;
  };
  smsTabs(tabindex): void {
    this.tabindex = tabindex;
    // console.log(this.tabindex);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addtojobcandidates(): void {

    const allrow = this.db.getIDs(this.db.nodetype);

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
