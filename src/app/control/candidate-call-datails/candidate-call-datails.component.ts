import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
declare var $: any;

@Component({
  selector: 'app-candidate-call-datails',
  templateUrl: './candidate-call-datails.component.html',
  styleUrls: ['./candidate-call-datails.component.scss']
})
export class CandidateCallDatailsComponent  implements ICellRendererAngularComp {
  private params: any;
  private cubed: number;
  @Output()
  rowData = new EventEmitter<any>();
  row = { entity: null }
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

    this.rowData.emit(row);
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

