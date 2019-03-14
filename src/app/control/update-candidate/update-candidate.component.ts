import { Component, OnInit, Input, Pipe } from '@angular/core';
import { DBService } from 'app/db.service';
declare var $: any;
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss']
})
export class UpdateCandidateComponent implements OnInit {

  currentData: any;
  updateid = 0;
  trackerjobdata: any;
  ProfileData: any = [];
  candidate_id = 0;
  JobData: any;
  countries: any;
  candidateshowdata = { customdata: [], resume: '', html: '', htmlurl: '' };
  globaljobid = 0;
  @Input()
  set current_data(currentData: any) {
    if (currentData !== undefined) {
      this.currentData = currentData;
      this.currentData.candidate_id = currentData.id;
      if (currentData && currentData.candidate_id && currentData.candidate_id > 0) {
        this.globaljobid = this.currentData.id;
        this.candidateshow(currentData.candidate_id);

      }
    }
  }

  constructor(public db: DBService) { }

  ngOnInit() {

  }

  setNotes(): void {
    this.candidate_id = this.updateid;
    $('#notesdetail').modal('show');
  }
  candidateshow(id) {
    $('#candidateshow').modal('show');
    this.updateid = id;
    this.trackerjobdata = {};
    this.ProfileData = [];
    this.JobData = {};
    $('#resumeview').attr('src', 'http://employer.passivereferral.com/in.html');
    if (this.countries === undefined) {
      this.db.list('master/country', {
        'gi': 'rolecreating'
      }, (response): void => {
        this.countries = response;
      });
    }
    if (this.globaljobid > 0) {
      debugger;
      this.db.list('trackerdata', {
        'candidate_id': id,
        'jobid': this.globaljobid
      }, (response): void => {

        this.ProfileData = response.ProfileData;
        this.JobData = response.JobData;
      });
    }
    this.db.list('trackerjobdata', {
      'candidate_id': id
    }, (response): void => {
      this.trackerjobdata = response;
    });
    this.db.show('candidatedetail/', id, (response): void => {
      this.candidateshowdata = response;
      this.candidateshowdata.customdata = JSON.parse(JSON.stringify(this.candidateshowdata.customdata));
      $('#candidateshow').fadeIn('1000');
      if (this.candidateshowdata.resume != null) {
        if (this.candidateshowdata.resume.indexOf('docx') === - 1) {
          $('#resumeview').attr('src',
            'https://docs.google.com/gview?url=http://api.passivereferral.com/resumes/' +
            this.candidateshowdata.resume + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true');
        } else {
          $('#resumeview').attr('src',
            'https://view.officeapps.live.com/op/embed.aspx?src=http://api.passivereferral.com/resumes/' + this.candidateshowdata.resume);
        }


      }
      if (this.candidateshowdata.htmlurl != null) {
        $('#htmlresumeview').attr('src',
          'http://api.passivereferral.com/cvhtml/' + this.candidateshowdata.htmlurl);
        // document.getElementById('htmlresumeview').contentWindow.document.body.innerHTML=this.candidateshowdata.cvhtml;
      }
    });
  };

  updatecandidate(): void {
    this.db.update('candidatedetail/', this.updateid, this.candidateshowdata, (response): void => {
      console.log(response);
      alert('thanks');
    });
  }

}