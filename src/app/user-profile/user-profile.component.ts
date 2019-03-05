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
  profile: any = {};
  changepassword: any = {};
  constructor(public db: DBService) { }

  ngOnInit() {

    this.db.setProfile();


  }
  changepasswordfun(): void {

   }

}
