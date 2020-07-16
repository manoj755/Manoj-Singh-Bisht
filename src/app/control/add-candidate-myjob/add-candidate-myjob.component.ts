import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DBService } from '../../db.service';
//import { MyJobComponent } from '../../my-job/my-job.component';
//import { BehaviorSubject } from 'rxjs';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
declare var $: any;
@Component({
  selector: 'app-add-candidate-myjob',
  templateUrl: './add-candidate-myjob.component.html',
  styleUrls: ['./add-candidate-myjob.component.scss']
})
export class AddCandidateMyjobComponent implements ICellRendererAngularComp {
  private params: any;
  private cubed: number;
  @Output()
  debugger;
  rowdata = new EventEmitter<any>();
  row = { entity: null }
  sendtracker: { trackerno: {} };
  jobslist: [];
  store: { candidateName: {}, gender: {},mobileNo:{},email:{} };
  genders: [];
  myname = 'narender';
  constructor() { }
  agInit(params: any): void {
    debugger;
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

  activity(row): void {

    this.rowdata.emit(row);
    $('#activity').modal('show');

  }

  comment(row): void {
    $('#commentstatus').modal('show');
  }
  candidateshow(id): void {

  }
  setupdateid(id): void {

  }

  candidatesave = function () {

    debugger;
    this.db.store('candidatedetail/', this.store, ((response): void => {
      this.updateid = response.id;


      this.db.addmessageandremove('Candidate added successfully.');

    }));
  }
}
