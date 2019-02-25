import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
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
