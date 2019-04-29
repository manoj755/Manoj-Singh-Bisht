import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { DBService } from '../../db.service';
declare var $: any;

@Component({
  selector: 'app-candidate-in-jobs-notification',
  templateUrl: './candidate-in-jobs-notification.component.html',
  styleUrls: ['./candidate-in-jobs-notification.component.scss']
})
export class CandidateInJobsNotificationComponent implements ICellRendererAngularComp {
  private params: any;
  private cubed: number;
  notificationjobs: any;
  allreferrence: any;
  //@Output()
  //rowdata = new EventEmitter<any>();
  row = { entity: null }
  myname = 'narender';
  constructor(public db: DBService) { }
  agInit(params: any): void {
    //debugger;
    this.params = params;
    this.row.entity = this.params.data;
    this.cubed = this.params.data.value * this.params.data.value * this.params.data.value;
  }
  // called when the cell is refreshed
  refresh(params: any): boolean {
    this.params = params;
    this.cubed = this.params.data.value * this.params.data.value * this.params.data.value;
    return true;
  }

  loadreferrence(jobid): void {
    //alert(jobid);
    let Search = {
      filterdropdown: '',
      process: 'Under Review',
      mainprocess: 1,
      searchcandidatetext: '',
      selectedjob: jobid
    };
    this.db.list('candidatesdetailmyjob/', Search, ((response): void => {


      this.notificationjobs = response;

    })
    );


  };


  activity(row): void {

    //this.rowdata.emit(row);
    $('#activity').modal('show');

  }

  comment(row): void {
    $('#commentstatus').modal('show');
  }
  candidateshow(id): void {

  }
  setupdateid(id): void {

  }
}
