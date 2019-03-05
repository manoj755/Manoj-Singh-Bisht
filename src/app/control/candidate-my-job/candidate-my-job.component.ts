import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
declare var $: any;
@Component({
  selector: 'app-candidate-my-job',
  templateUrl: './candidate-my-job.component.html',
  styleUrls: ['./candidate-my-job.component.scss']
})
export class CandidateMyJobComponent implements ICellRendererAngularComp {
  private params: any;
  private cubed: number;
  row = { entity: null }
  myname = 'narender';
  constructor() { }
  agInit(params: any): void {
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
