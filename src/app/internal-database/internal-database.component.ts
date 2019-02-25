import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-database',
  templateUrl: './internal-database.component.html',
  styleUrls: ['./internal-database.component.scss']
})
export class InternalDatabaseComponent implements OnInit {

  clients:any=[];
  addtojob:any={};
  sendemailmodel:any={};
  copycandidate:any={};
  myjob:any={};
  sms:any={};
  addnewjob:any={};
  profile:any={};
  store:any={};  
  emailselected:any={};   
  smsselected:any={};
  constructor() { }

  ngOnInit() {
  }

}
