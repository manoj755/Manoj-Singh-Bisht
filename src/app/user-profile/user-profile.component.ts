import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  ProfileTabs: any;
  updateprofie: any;
  profile: any = { id: 1 };
  changepassword: any = {};
  constructor(public db: DBService) { }

  ngOnInit() {

    this.db.setProfile();
    this.LoadProfileData();


  }
  changepasswordfun(): void {
    this.db.store('changepassword/', this.changepassword, ((response): void => {
      //this.changepassword = response;
      this.db.showMessage('Added Successfully');
    }))

  }
  LoadProfileData(): void {
    this.db.list('profile/', {}, ((response): void => {
      this.profile = response;


    }));
  }
  profileupdate(): void {
    this.db.update('profile/', this.profile.id, this.profile, ((response): void => {

      this.LoadProfileData();
      this.db.showMessage('Updated Successfully');

    }));
  }


}
