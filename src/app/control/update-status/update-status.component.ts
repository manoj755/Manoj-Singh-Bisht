import { Component, OnInit, Input } from '@angular/core';
import { DBService } from '../../db.service';
import { BehaviorSubject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  commentstatus: any = {};
  showowner = false;
  managers = [];
  status_id = 0;
  current_row: any;
  entityvar: any;
  currentstatusid = 0;
  allstatus = false;
  ajid = 0;
  currentstatusnameoption = '';
  currentstatusname = '';
  @Input()
  set set_status_row(row: any) {
    if (row && row.status_id) {
      this.status_id = row.status_id;
      this.comment(row);
      this.current_row = row;
    }
  }
  @Input()
  allstatusload = 0;
  statuses = [];
  constructor(public db: DBService) {


  }

  ngOnInit() {
    this.loadmanagerid();

  }

  bindStatus(): void {



  }

  comment(entity): void {
    if (entity) {
      this.entityvar = entity;
    } else {
      entity = this.entityvar;
    }
    if (this.allstatus) {
      this.allstatusload = 1;
    } else {
      this.allstatusload = 0;
    }

    if (this.commentstatus.noemailset) {
      this.commentstatus.noemail = 1;
    } else {
      this.commentstatus.noemail = 0;
    }


    if (entity.recruiter_id == null) {
      this.showowner = true;
    } else {
      this.showowner = false;
    }
    this.ajid = entity.ajid;
    console.log(entity);
    this.currentstatusid = entity.status_id;
    this.currentstatusname = entity.display_name;
    this.db.list('csr/' + entity.status_id, { allstatus: this.allstatusload }, (response): void => {
      $('#business').hide();
      $('#offerhide').hide();
      this.statuses = response;
      $('#commentstatus').modal('show');

    });
  }

  purposechange(): void {
    // alert('purposechange');

    let purpose = 0;
    for (const i in this.statuses) {
      if (this.statuses[i].id === parseInt(this.commentstatus.status, 0)) {
        purpose = this.statuses[i].isinterview;
        this.currentstatusnameoption = this.statuses[i].DisplayName;
        break;
      }
    }
    if ($('#purpose').find('option:selected').attr('isinterview') === '2' || purpose === 2) {
      $('#offerhide').show();
    } else {
      $('#offerhide').hide();
    }

    if ($('#purpose').find('option:selected').attr('isinterview') === '1' || purpose === 1) {
      $('#business').show();
    } else {
      $('#business').hide();
    }

  };

  updatestatuscommentmyjob(showpopup): any {
    if (typeof showpopup === 'undefined') {
      showpopup = true;
    }

    this.commentstatus.ajid = this.current_row.ajid;
    // $scope.commentstatus.recruiterid=$scope.recruiterid;
    debugger;
    this.db.store('csr/', this.commentstatus, (response): void => {
      $('#commentstatus').modal('hide');
      // $scope.filterdrbytab();
      this.commentstatus = { ajid: 0 };
      $('.comment_status_btn_current').text(this.currentstatusnameoption);
      // $rootScope.notificationload();
      // $scope.loadCandidate();
      if (showpopup) {
        this.db.showNotification('Status changed successfully.');
      }
    });
  };

  LoadCommentData(status_id) {

  }





  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };

}
