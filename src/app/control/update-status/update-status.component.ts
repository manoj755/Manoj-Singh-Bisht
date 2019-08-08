import { Component, OnInit, Input } from '@angular/core';
import { DBService } from '../../db.service';
import { CandidateMyJobComponent } from '../../control/candidate-my-job/candidate-my-job.component';
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
  load: CandidateMyJobComponent;
  status_id = 0;
  current_row: any;
  entityvar: any;
  currentstatusid = 0;
  allstatus = false;
  jobid: any[];
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
    debugger;
    this.currentstatusid = entity.status_id;
    // this.commentstatus.status = this.currentstatusid;
    this.currentstatusname = entity.display_name;

    this.db.list('csr/' + entity.status_id, { allstatus: this.allstatusload, jobid: entity.jobid }, (response): void => {
      $('#business').hide();
      $('#offerhide').hide();
      $('#isbot').hide();
      this.statuses = response;
      // debugger;
      $('#commentstatus').modal('show');

    });
  }

  // sendcall(entity): void {
  //   if (entity && entity.botid !== null) {
  //     this.entityvar = entity;
  //   }
  //   else {
  //     entity = this.entityvar;
  //   }
  //   const copyjob = {
  //     'candidates': entity.id,
  //     'job': entity.job_id,
  //     'manager': entity.recruiter_id
  //   };
  //   this.db.store('sendcall/', copyjob, ((response): void => {

  //     console.log(response);

  //     const addtojobmessage = 'Done';

  //     this.db.showMessage(addtojobmessage);

  //   }), ((Response): void => {
  //     this.db.showMessage('Some error occured');
  //   })
  //   );
  // }




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
    if ($('#purpose').find('option:selected').attr('isbotcall') === '1' || purpose === 1) {
      $('#isbot').show();
    } else {
      $('#isbot').hide();
    }

  };

  updatestatuscommentmyjob(showpopup): any {
    debugger;
    if (typeof showpopup === 'undefined') {
      showpopup = true;
    }

    this.commentstatus.ajid = this.current_row.ajid;
    if (this.commentstatus.date != null ) {
      this.commentstatus.date = this.db.toYYMMDD(this.commentstatus.date);
    }
    else {
      this.commentstatus.date = '2000-01-01';
    }
    // $scope.commentstatus.recruiterid=$scope.recruiterid;

    this.db.store('csr/', this.commentstatus, (response): void => {
      $('#commentstatus').modal('hide');
      // $scope.filterdrbytab();
      this.commentstatus = { ajid: 0 };
      $('.comment_status_btn_current').text(this.currentstatusnameoption);
      // $rootScope.notificationload();
      //this.loadCandidate();
      //this.sendcall(this.entityvar);
      if (showpopup) {
        this.db.showNotification('Status changed successfully.');
      }
    });
  };

  loadCandidate = function () {

    //
    let SelectedJob = ''
    if (this.isfirstload !== 1) {
      SelectedJob = this.db.SelectedCheckboxWithComma(this.jobslist);
    } else {
      SelectedJob = this.selectedjob;
    }
    SelectedJob = this.selectedjob;
    // const totalrow = this.selectednodes;
    // SelectedJob = this.db.SelectedWithComma(totalrow, 'id');
    this.globaljobid = SelectedJob;
    const Search = {
      filterdropdown: this.filterdropdown,
      process: this.process,
      mainprocess: this.mainprocess,
      searchcandidatetext: this.searchcandidatetext,
      selectedjob: SelectedJob,
      candidate: this.searchcandidate

    };
    if (this.isinterview !== undefined) {
      Search['isinterview'] = this.isinterview;
    }

    this.rowData = [];
    console.log(Search);
    this.db.list('candidatesdetailmyjob/', Search, ((response): void => {


      this.candidatedetails = response;
      this.rowData = response;
      this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
        return this.candidatedetails;
      };
      this.candidateinpopup = response;
    }));
  };


  LoadCommentData(status_id) {

  }


  //   const copyjob = {
  //     'candidates': allrow,
  //     'job': this.addnewjob.add_new_job_id,
  //     'manager': this.addnewjob.manager
  //   };
  //   this.db.store('sendcall/', copyjob, ((response): void => {

  //     console.log(response);

  //     const addtojobmessage = 'Done';

  //     this.db.showMessage(addtojobmessage);

  //   }), ((Response): void => {
  //     this.db.showMessage('Some error occured');
  //   })
  //   );

  // }


  loadmanagerid(): void {

    this.db.list('manager/', null, ((response): void => {
      this.managers = response;


    }));
  };

}
