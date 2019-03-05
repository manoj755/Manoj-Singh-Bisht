import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input()
  activities = [];



  constructor() { }

  ngOnInit() {

  }


  vote(agreed: boolean) {
  }

}
