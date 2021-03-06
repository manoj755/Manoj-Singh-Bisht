import { Component, OnInit, Input, Pipe, EventEmitter } from '@angular/core';
import { DBService } from 'app/db.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FormGroup, FormControl } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
const URL = 'https://localhost:4200/';

declare var $: any;
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss']
})
export class UpdateCandidateComponent implements OnInit {
  fileToUpload: File = null;
  currentData: any;
  updateid = 0;
  trackerjobdata: any;
  ProfileData = [];
  candidate_id = 0;
  JobData: any;
  countries: any;
  hidetracker = false;
  candidateshowdata = {
    customdata: [], resume: '', html: '', htmlurl: '', candidateshowdata: '',
    naukri_url: '', email: '', mobileNo: '', gender: '', dob: '', currentSalary: '',
    expectedSalary: '', noticePeriod: '', currentOrganization: '', currentDesignation: '',
    state: '', city: '', location: '', preferredLocation: '', qualification: '', phoneNo: '',
    panNo: '', nationality: '', visaType: '', remark: '', ovarallExperiance: '', relevantExperiance: '',
    address: '', industryType: '', functionalArea: '', skillSet: '', source: '', candidateName: ''
  };
  globaljobid = 0;


  uploadForm = new FormGroup({
    file1: new FormControl()
  });
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
    console.log(e);
  }
  onSubmit() {
    let formdata = new FormData();
    console.log(this.uploadForm)
    formdata.append('avatar', this.filedata);
    this.db
      .post('http://api.passivereferral.com/public/', formdata, ((response): void => {

      })
      );
  }


  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);

  }

  @Input()
  set current_data(currentData: any) {
    debugger;
    if (currentData !== undefined) {
      this.currentData = currentData;
      this.currentData.candidate_id = currentData.id;
      if (currentData && currentData.candidate_id && currentData.candidate_id > 0) {
        this.globaljobid = this.db.globaljobid;

        this.candidateshow(currentData.candidate_id);
        this.currentData = {};

      }
    }
  }

  constructor(public db: DBService) { }

  ngOnInit() {

  }

  setNotes(): void {
    debugger;
    this.candidate_id = this.updateid;
    $('#notesdetail').modal('show');
  }
  candidateshow(id) {
    debugger;
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
        debugger;
        this.countries = response;
      });
    }
    if (this.globaljobid > 0) {

      this.db.list('trackerdata', {
        'candidate_id': id,
        'jobid': this.globaljobid
      }, (response): void => {
debugger
        this.ProfileData = response.ProfileData;
        this.JobData = response.JobData;
      });
    }
    this.db.list('trackerjobdata', {
      'candidate_id': id
    }, (response): void => {
      if (response.length > 0) {
        response = response[0];
      } else {
        response = {};
      }
      this.trackerjobdata = response;
    });
    debugger;
    this.db.show('candidatedetail/', id, (response): void => {
debugger;
this.candidateshowdata = response;
      if (response.customdata == null) {
        response.customdata = [];
      } else {
        response.customdata = JSON.parse(JSON.stringify(response.customdata));

      }
      this.candidateshowdata = response;




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

  uploadresume(files: FileList) {
    debugger;
    const fileToUpload: any[] = [];
    fileToUpload.push({ 'filekey': 'resume', 'file': files.item(0) });
    this.db.storeupload('candidatedetail/update/' + this.updateid, null, (re) => {
      this.db.showNotification('Resume Uploaded');
      $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadresume').modal('hide');
    }, null, fileToUpload);
  }



  saveCustomData(): void {
    debugger;
    const profiledata = {};

    for (const i in this.ProfileData) {
      if (this.ProfileData) {
        const key = this.ProfileData[i].db_name;
        const val = this.ProfileData[i].value;
        profiledata[key] = val;
      }
    }
    const jobdata = {};
    for (const i in this.JobData) {
      if (this.JobData) {
        const key = this.JobData[i].db_name;
        const val = this.JobData[i].value;
        jobdata[key] = val;
      }
    }
    debugger;
    //console.log(profiledata);
    // console.log(jobdata);
    this.db.store('trackerdatapost', {
      pdata: profiledata,
      jdata: jobdata,
      'cid': this.updateid,
      'jobid': this.db.globaljobid
    }, function (r) {
      this.db.addmessageandremove('Added Successfully');
    });
  };

}
