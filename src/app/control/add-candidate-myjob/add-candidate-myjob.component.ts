import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import { MyJobComponent } from '../../my-job/my-job.component';


@Component({
  selector: 'app-add-candidate-myjob',
  templateUrl: './add-candidate-myjob.component.html',
  styleUrls: ['./add-candidate-myjob.component.scss']
})
export class AddCandidateMyjobComponent implements OnInit {
  load: MyJobComponent;
  store = {};
  updateid: any;
  countries = [];
  genders = [];
  constructor(public db: DBService) { }

  ngOnInit() {
    this.LoadDropDown();
  }

  candidatesave = function () {

    debugger;
    this.db.store('candidatedetail/', this.store, ((response): void => {
      this.updateid = response.id;


      this.db.addmessageandremove('Candidate added successfully.');

    }));
  }
  LoadDropDown(): void {
    this.db.list('master/country', {
      'gi': 'rolecreating'
    }, ((response): void => {
      this.countries = response;
    }));
    this.db.list('master/gender', {
      'gi': 'rolecreating'
    }, ((response): void => {
      this.genders = response;
    }));
  }
}
