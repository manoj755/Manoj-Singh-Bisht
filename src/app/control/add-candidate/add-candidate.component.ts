import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

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
