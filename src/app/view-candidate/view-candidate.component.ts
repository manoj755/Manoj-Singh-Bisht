import { Component, OnInit, Input, Pipe, EventEmitter } from '@angular/core';
import { DBService } from 'app/db.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FormGroup, FormControl } from '@angular/forms';
// import { forEach } from '@angular/router/src/utils/collection';
const URL = 'https://localhost:4200/';

declare var $: any;
@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.scss']
})
// @Pipe({
//   name:'ViewCandidateComponent'
// })
export class ViewCandidateComponent implements OnInit {
  fileToUpload: File = null;
  currentData: any;
  updateid = 0;
  trackerjobdata: any;
  ProfileData = [];
  candidate_id = 0;
  // id= 314584;
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
  currentjobids: any;
  isname = false;
  isemail = false;
  isesalary = false;
  ismobile = false;
  isgender = false;
  isdob = false;
  iscsalary = false;
  isOrganization = false;
  isdesignation = false;
  iscountry = false;
  isstate = false;
  iscity = false;
  isclocation = false;
  isplocation = false;
  isqualification = false;
  ispnumber = false;
  ispanNo = false;
  isnationality = false;
  isvisatype = false;
  isremark = false;
  isExperiance = false;
  iscurrentdesignation = false;
  isaddress = false;
  isindustryType = false;
  isfunctionalArea = false;
  isskills = false;
  issource = false;
  isnoticeperiod = false;
  isJobData = false;

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

  // @Input()
  // set current_data(currentData: any) {
  //   debugger;
  //   if (currentData !== undefined) {
  //     this.currentData = currentData;
  //     this.currentData.candidate_id = currentData.id;
  //     if (currentData && currentData.candidate_id && currentData.candidate_id > 0) {
  //       this.globaljobid = this.db.globaljobid;

  //       this.candidateshow(currentData.candidate_id);
  //       this.currentData = {};

  //     }
  //   }
  // }

  constructor(public db: DBService, public route: ActivatedRoute) { }

  ngOnInit() {
    // this.candidateshow(this.id);
    debugger;
    this.current_data(this.route.snapshot.paramMap.get('id'));
    // this.currentjobids(this.route.snapshot.paramMap.get('jobid'));

  }

  current_data(currentData) {
    debugger;
    var arr = currentData.split(',');

    if (currentData !== undefined) {
      this.currentData = currentData;
      // this.currentData.candidate_id = currentData.id;
      if (currentData && arr[0] && arr[0] > 0) {
        this.globaljobid = arr[1];

        this.candidateshow(arr[0]);
        this.currentData = {};

      }
    }
  }

  setNotes(): void {
    debugger;
    this.candidate_id = this.updateid;
    $('#notesdetail').modal('show');
  }
  candidateshow(id) {


    debugger;
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

      // this.gettrakerdata(response.jobid,id);
      if (response.customdata == null) {
        response.customdata = [];
      } else {
        response.customdata = JSON.parse(JSON.stringify(response.customdata));

      }
      debugger
      this.candidateshowdata = response;
      // this.viewresumee();
      // $('#candidateshow').fadeIn('1000');
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
    this.isnameclcik('type');
    this.db.update('candidatedetail/', this.updateid, this.candidateshowdata, (response): void => {
      console.log(response);
      this.isnameclcik('type');
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
      'jobid': this.globaljobid
    }, function (r) {
      this.db.addmessageandremove('Added Successfully');
    });
  };

  isnameclcik(type) {
    debugger;
    this.isname = false;
    this.isemail = false;
    this.isesalary = false;
    this.ismobile = false;
    this.isgender = false;
    this.isdob = false;
    this.iscsalary = false;
    this.isOrganization = false;
    this.isdesignation = false;
    this.iscountry = false;
    this.isstate = false;
    this.iscity = false;
    this.isclocation = false;
    this.isplocation = false;
    this.isqualification = false;
    this.ispnumber = false;
    this.ispanNo = false;
    this.isnationality = false;
    this.isvisatype = false;
    this.isremark = false;
    this.isExperiance = false;
    this.iscurrentdesignation = false;
    this.isaddress = false;
    this.isindustryType = false;
    this.isfunctionalArea = false;
    this.isskills = false;
    this.issource = false;
    this.isnoticeperiod = false;
    this.isJobData = false;

    if (type == 'name') {
      this.isname = true;
    } else if (type == 'email') {
      this.isemail = true;
    } else if (type == 'mobile') {
      this.ismobile = true;
    } else if (type == 'gender') {
      this.isgender = true;
    } else if (type == 'dob') {
      this.isdob = true;
    } else if (type == 'csalary') {
      this.iscsalary = true;
    } else if (type == 'esalary') {
      this.isesalary = true;
    } else if (type == 'Organization') {
      this.isOrganization = true;
    } else if (type == 'designation') {
      this.isdesignation = true;
    } else if (type == 'country') {
      this.iscountry = true;
    } else if (type == 'state') {
      this.isstate = true;
    } else if (type == 'city') {
      this.iscity = true;
    } else if (type == 'clocation') {
      this.isclocation = true;
    } else if (type == 'plocation') {
      this.isplocation = true;
    } else if (type == 'qualification') {
      this.isqualification = true;
    } else if (type == 'pnumber') {
      this.ispnumber = true;
    } else if (type == 'panNo') {
      this.ispanNo = true;
    } else if (type == 'nationality') {
      this.isnationality = true;
    } else if (type == 'visatype') {
      this.isvisatype = true;
    } else if (type == 'remark') {
      this.isremark = true;
    } else if (type == 'Experiance') {
      this.isExperiance = true;
    } else if (type == 'currentdesignation') {
      this.iscurrentdesignation = true;
    } else if (type == 'address') {
      this.isaddress = true;
    } else if (type == 'industryType') {
      this.isindustryType = true;
    } else if (type == 'functionalArea') {
      this.isfunctionalArea = true;
    } else if (type == 'skills') {
      this.isskills = true;
    } else if (type == 'source') {
      this.issource = true;
    } else if (type == 'noticeperiod') {
      this.isnoticeperiod = true;
    } else if (type == 'jdatas') {
      this.isJobData = true;
    }
  }
  //  isemailclcik(): void{
  //   this.isname = true;
  //   this.email = false;

  //  }


}
