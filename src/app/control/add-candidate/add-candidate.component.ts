import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
declare var $: any;

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  store = { candidateName: '', gender: '', mobileNo: '', email: '' };
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
      debugger;
      this.updateid = response.id;

      $('#addcandidate').modal('hide');
      this.loadInternalData()
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
