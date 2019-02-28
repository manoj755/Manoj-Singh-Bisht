import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-to-job',
  templateUrl: './add-to-job.component.html',
  styleUrls: ['./add-to-job.component.scss']
})
export class AddToJobComponent implements OnInit {

  clients: any = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  constructor(private db: DBService) {

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addtojobcandidates(): void {

    alert(this.db.getIDs());

  }

}
