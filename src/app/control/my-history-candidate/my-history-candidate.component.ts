import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
declare var $: any;

@Component({
  selector: 'app-my-history-candidate',
  templateUrl: './my-history-candidate.component.html',
  styleUrls: ['./my-history-candidate.component.scss']
})
export class MyHistoryCandidateComponent  implements ICellRendererAngularComp {
  private params: any;
  private cubed: number;
  @Output()
  debugger;
  rowdata = new EventEmitter<any>();
  row = { entity: null }
  myname = 'manoj';
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
    // $('#activity').modal('show');

  }

  // comment(row): void {
  //   $('#commentstatus').modal('show');
  // }
  candidateshow(id): void {

  }
  setupdateid(id): void {

  }
}
