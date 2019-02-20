import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Config } from './Config/config';
import { Router } from '@angular/router';
import { DBService } from './db.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'PRAngular';


  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


}
