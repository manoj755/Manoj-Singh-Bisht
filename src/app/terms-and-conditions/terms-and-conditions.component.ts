import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from '../db.service';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  public Editor = ClassicEditor;
  applications: any;
  appmodel: {};
  profile: any;
  applicatio: { id: 0 };
  application: any;
  constructor(public db: DBService) { }

  ngOnInit() {
    this.loadapplication();
    debugger;


  }

  loadapplication(): void {
    debugger;
    const app = {
      // appid:app.id;

    }
    this.db.list('gettermsandcondition/', {}, ((response): void => {
      //this.applications = response;
      this.applications = response;
      this.appmodel = response;
      this.application = response[0];
    })
    );
    this.db.list('profile/', {}, ((response): void => {
      this.profile = response;
    })
    );
    // if (this.profile.app_id === this.applications.id) {


  }
  savetermsandcoditions(): void {

    debugger;
    // const appid = {
    //   id: ,
    // }
    this.db.update('updatetermsandcondition/', this.application.id, this.appmodel, ((response): void => {
      this.db.showMessage('Updated Successfully');
    })
    );
  }
}
//}
