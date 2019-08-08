import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import { ActivatedRoute } from '@angular/router';
import { arrRoles } from './arrRoles';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
declare var $: any;
// https://ng-select.github.io/ng-select#/tags
@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnInit {
  start_date_temp: any = new Date();

  clientsdepartment = '';
  end_date_temp: any = new Date();
  clients: any = [];
  storekey: any;
  addtojob: any = {};
  myjoblist: [];
  sendemailmodel: any = {};
  copycandidate: any = {};
  sms: any = {};
  addnewjob: any = {};
  departments = [];
  hidesavebutton = false;
  status = '  ';

  trackerlist = [];
  profile: any = {};
  searchTerm = '';
  selectedmanagerlist = [];
  jobroles = [];
  functionalArea = '';
  locations = [];
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  managers = [];
  min = 10;
  jobadd = false;
  max = 5000;
  mp: any = {};
  keyskillsset: any;
  minimumSalarythousand: any = 0;
  maximumSalarylac: any = 0;
  maximumSalarythousand: any = 0;
  location: any;
  arrRoles = [];
  isjobediting = false;
  current_job_id = 0;
  suggestionlist = [];
  locationtype = '';
  //jobtype= '';

  t = null;
  clientdetails = [];

  errormsgtag = '';

  //functionalareas = [];
  job_description_api_url = 'http://122.176.49.199:5000/jd_suggestions';
  // this.key_suggestion_api_url = 'http://122.176.49.199:5000/keyword_suggestions';
  key_suggestion_api_url = 'suggest_key_skills';
  maxexperience: any;
  filter: any;
  maxSalaryOption = [];
  searchcandidate = '';
  page = 1;

  suggestedkeyskills = [];
  myjob: any = { minimumExperience: 0, internshipdurationunit: 'Month' };
  minimumSalaryOption = [];
  minimumSalarylac = 0;
  minimumSalaryOptionink = [];
  maximumSalaryOptionink = [];
  minexperience = [];
  industries = [];
  functionalareas = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  showeditjob = false;
  a = true;
  keyskillscheck: any;
  myjobdatas: any;
  isexistjob= false;

  constructor(public db: DBService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.joblist();
    //this.showJob('id');
    this.arrRoles = arrRoles;

    $('select').addClass('noselect2 form-control');
    this.minimumSalaryOptionSet()
    this.updatemaxexperience();
    this.loadlocation();
    this.loadManagerclientdetail();
    this.applicationdepartment();
    this.settracker();
    this.updatemaxsalary();

    this.db.list('functionalarea/', null, (response): void => {

      this.functionalareas = response;
      if (this.route.snapshot.params.id) {
        this.showJob(this.route.snapshot.params.id);
      }
    });


    this.db.list('industry/', null, ((response): void => {

      this.industries = response;
    })
    );

    this.applicationdepartment();



  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.myjob.keyskills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  joblist(): void {
    //this.isLoadingJobs = true;
    this.db.list('joblist/', {}, ((response): void => {
      this.myjobdatas = response;
      //this.jobslistmain = response;
      // this.isLoadingJobs = false;

    })
    );
  }
  // myjobdata(id): void {
  //   this.db.list('addnewjob/', id, ((response): void => {
  //     this.myjobdata = response;
  //   }))
  // }


  // remove(fruit: keyskills): void {
  //   const index = this.myjob.keyskills.indexOf(fruit);

  //   if (index >= 0) {
  //     this.myjob.keyskills.splice(index, 1);
  //   }
  // }




  jobtype(): void {

    $('#internshipdiv').hide();
    $('#contract').hide();
    $('#freelence').hide();
    if (this.myjob.jobtype) {
      if (this.myjob.jobtype.$ngOptionLabel === 'Internship') {
        $('#internshipdiv').show();
      } else {
        $('#internshipdiv').hide();
      }

      if (this.myjob.jobtype.$ngOptionLabel === 'Contract') {
        $('#contract').show();
      } else {
        $('#contract').hide();
      }

      if (this.myjob.jobtype.$ngOptionLabel === 'Freelence') {
        $('#freelence').show();
      } else {
        $('#freelence').hide();
      }
    }
  }



  changefilter(val): void {

    this.filter = val;
  };
  minimumSalaryOptionSet(): void {
    for (let kk = 0; kk < 51; kk++) {
      this.minimumSalaryOption.push(kk);
    }



    this.minimumSalaryOptionink = [];

    for (let kk = 0; kk < 10; kk++) {
      const ii = 10;
      const jj = kk * ii;

      this.minimumSalaryOptionink.push(jj);

    }

    this.maximumSalaryOptionink = [];


    for (let kk = 0; kk < 10; kk++) {
      const ii = 10;
      const jj = kk * ii;

      this.maximumSalaryOptionink.push(jj);

    }


    this.minexperience = [];
    for (let jj = 0; jj < 31; jj++) {
      this.minexperience.push(jj);
    }
  }



  updatemaxsalary(): void {

    let kk = 0;
    this.maxSalaryOption = [];
    kk = this.minimumSalarylac;
    for (; kk < 51; kk++) {
      this.maxSalaryOption.push(kk);
    }
  }


  updatemaxexperience(): void {
    this.maxexperience = [];
    let j = 0;
    j = this.myjob.minimumExperience;
    for (; j < 31; j++) {
      this.maxexperience.push(j);
    }
  };



  deleteSkill(index): void {
    this.suggestedkeyskills.splice(index, 1);
    $('#helpcontainer').hide();
  }
  showJob(id): void {
    // $event.stopPropagation();
    // this.job = job;
    debugger;
    this.jobadd = false;
    this.showeditjob = true;
    this.isjobediting = true;
    if(this.isjobediting){
      this.isexistjob=true;
    }

    this.db.show('addnewjob/', id, (response): void => {
debugger;



      this.myjob = response;

      const tags = [
      ];
      const skillsetarr = this.myjob.keyskills.split(',');
      for (const k in skillsetarr) {
        if (skillsetarr[k]) {
          tags.push(skillsetarr[k]);
        }
      }

      this.myjob.keyskills = tags;
      if (this.myjob.is_client == 1) {
        this.myjob.is_client = 'Client';
      }
      else {
        this.myjob.is_client = 'Deparment';
      }


      try {
        let minSalaryLacs = null;
        let minSalaryThousand = null
        let maxSalaryLacs = null;
        let maxSalaryThousand = null;

        minSalaryLacs = this.myjob.minimumSalary / 100000;
        minSalaryLacs = Math.floor(minSalaryLacs);
        // alert('minSalary in lacs =' + minSalaryLacs + 'lakhs');
        this.myjob.minimumSalarylac = minSalaryLacs.toString();
        // document.write('minimumSalary in lacs');

        minSalaryThousand = (this.myjob.minimumSalary) - (minSalaryLacs * 100000);
        minSalaryThousand = minSalaryThousand / 1000;
        this.myjob.minimumSalarythousand = minSalaryThousand.toString();


        maxSalaryLacs = this.myjob.maximumSalary / 100000;
        maxSalaryLacs = Math.floor(maxSalaryLacs);
        // alert('minSalary in lacs =' + minSalaryLacs + 'lakhs');
        this.myjob.maximumSalarylac = maxSalaryLacs.toString();
        // document.write('minimumSalary in lacs');

        maxSalaryThousand = (this.myjob.maximumSalary) - (maxSalaryLacs * 100000);
        maxSalaryThousand = maxSalaryThousand / 1000;
        this.myjob.maximumSalarythousand = maxSalaryThousand.toString();


        this.updatemaxsalary();
        // alert('minSalary in Thousands =' + minSalaryThousand + 'thousands');



        // this.minimumSalarylac=(this.minimumSalarylac*100000)+(this.minimumSalarythousands*1000);
        //   =resultmin.tostring();
        // this.minimumSalarylac=(this.maximumSalarylac*100000)+(this.maximumSalarythousand*1000);
        //  =resultmax.tostring();


      } catch (e) {

      }
      if (this.myjob.tracker_id != null) {
        this.myjob.tracker_id = this.myjob.tracker_id.toString();
      }

      try {
        this.myjob.client_detail_id = this.myjob.client_detail_id.toString();
        this.myjob.manager_id = this.myjob.manager_id.toString();
        this.location = this.myjob.location.toString().split(',');




      } catch (e) {
        console.log(e);
      }
      // functionalareas this.functionalArea = this.myjob.functionalArea.toString();

      if (this.myjob.functionalArea != null) {
        for (const i in this.functionalareas) {
          if (this.myjob.functionalArea.toString() === this.functionalareas[i].functionalAreaName) {
            // this.functionalArea = {'id': this.functionalareas[i].id,
            // 'functionalAreaName': this.functionalareas[i].functionalAreaName,
            // 'code': this.functionalareas[i].code, 'ipAddress':
            // this.functionalareas[i].ipAddress};
            this.functionalArea = this.functionalareas[i];
            setTimeout(function () {
              this.getrole();
            }, 100);
            break;
          }


        }
      }

      // this.functionalArea=''
      try {
        this.myjob.Industry = this.myjob.industry.toString();

      } catch (e) {
        console.log(e);
      }
      this.myjob.jobRole = this.myjob.jobRole.toString();
      //
      this.changerole();
      // this.getrole();
      //
      $('#submitjob').modal('show');
    });

  };

  getrole(): void {
    debugger;
    let code = $('#fun option:selected').attr('opt');
    // let code = this.functionalArea.code;
    if (code != null) {
      code = code.replace('#', '');
      code = code.split('.')[0];
      const codeint = parseInt(code, 0);
      const arrRoleload = this.arrRoles[codeint];
      //  console.log(arrRoleload);
      this.jobroles = [];
      for (const i in arrRoleload) {
        if (i.indexOf('a') === -1) {
          this.jobroles.push({ 'val': arrRoleload[i], 'p': false });
        }
      }
    }
  };
  addNewJobupdate() {
    if (!$('.validate').validate('#submit_cv_to_panel_status')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }
    if (true) {
      debugger;
      const locations = this.location;
      let locationstr = '';
      let isfirstlocation = true;
      //const j = 0;
      for (const j in locations) {
        //  if ( locations[j]) {
        if (isfirstlocation) {
          locationstr += locations[j].$ngOptionLabel;
          isfirstlocation = false;
        }

        else {
          locationstr += ',' + locations[j].$ngOptionLabel;
        }
        // }
      }
      if (locationstr == 'undefined') {
        locationstr = this.location[0];
      }

      if (this.myjob.is_client == 'Client') {
        this.myjob.is_client = 1;
      }
      else if (this.myjob.is_client == 'Department') {
        this.myjob.is_client = 0;
      }
      debugger;
      if (this.a == true) {
        this.a = false;
        let keyskills = this.myjob.keyskills;
        this.keyskillscheck = this.myjob.keyskills;
        let keyskillstr = '';
        // if (keyskillstr == '') {
        for (const j in keyskills) {
          if (keyskills[j]) {
            keyskillstr += ',' + keyskills[j];
          }

        }

        this.myjob.keyskills = keyskillstr;
        // }
      }
      else if (this.a == false) {
        const keysk = this.keyskillscheck
        let keyskillstr2 = '';

        for (const j in keysk) {
          if (keysk[j]) {
            keyskillstr2 += ',' + keysk[j];
          }

        }

        this.myjob.keyskills = keyskillstr2;
      }
      this.myjob.location = locationstr;
      // this.myjob.functionalArea = this.functionalArea;
      //            let locations = this.location;
      //            let locationstr = '';
      //            for (let j in locations)
      //            {
      //                locationstr += locations[j] + ',';
      //            }
      //            this.myjob.location = locationstr;
      //
      //            this.myjob.functionalArea = this.functionalArea.functionalAreaName;

      this.myjob.minimumSalary = (this.myjob.minimumSalarylac * 100000) + (this.myjob.minimumSalarythousand * 1000);
      //   =resultmin.tostring();
      this.myjob.maximumSalary = (this.myjob.maximumSalarylac * 100000) + (this.myjob.maximumSalarythousand * 1000);
      //  =resultmax.tostring();
      if (this.myjob.minimumSalary > this.myjob.maximumSalary) {
        this.db.addmessageandremove('Maximum salary cannot be less then minimum salary.');
      } else {
        this.db.update('addnewjob/', this.myjob.id, this.myjob, (response): void => {

          this.db.addmessageandremove('Job Updated Successfully');

        }, (response): void => {
          // this.token=response.statusText;
          this.db.addmessageandremove('Please check if you entered wrong data.');


        });
      }
    }
  };




  bindfunctionalarea(): void {

    if (true) {
      this.current_job_id = 0;
      this.isjobediting = true;

      this.db.list('functionalarea/', null, (response): void => {

        this.functionalareas = response;
        this.showJob(this.current_job_id);

      });

      this.page = this.getParameterByName('p');
    } else {
      this.db.list('functionalarea/', null, (response): void => {

        this.functionalareas = response;


      });
    }
  }

  getParameterByName(p) {
    return p;
  }
  changerole = function () {

    setTimeout(function () {
      if ($('#role').val() === 'Internship') {
        $('#internship').show();
      } else {
        $('#internship').hide();
      }

      if ($('#role').val() === 'Contract') {
        $('#contract').show();
      } else {
        $('#contract').hide();
      }

      if ($('#role').val() === 'Freelence') {
        $('#freelence').show();
      } else {
        $('#freelence').hide();
      }
    }, 1000);
  };


  jobtitlesuggestion(): void {


    // $('#title').autocomplete({
    //   source: this.db.ServiceURL + 'jobtitlesuggestion?token=' + localStorage.Authkey + '&job_title=' + this.myjob.job_title,
    //   minLength: 2,
    //   select: function (event, ui) {

    //     // log('Selected: ' + ui.item.value + ' aka ' + ui.item.id);
    //   }
    // });


  };

  addSkill(index, skill): void {

    this.suggestedkeyskills.splice(index, 1);
    if (this.myjob.keyskills === '' || this.myjob.keyskills === undefined) {
      this.myjob.keyskills = skill;
    } else {
      this.myjob.keyskills = this.myjob.keyskills + ', ' + skill;
    }
    $('#helpcontainer').hide();
  }
  contains(currentval, suggestedkeyskills): boolean {
    return false;
  }
  error_on_invalid_tag(): void {
    this.errormsgtag = 'Duplicate skills/Length more than 40 chars are not allowed.';
    setTimeout(function () {
      this.errormsgtag = '';
    }, 5000);
  }
  loadkeyskills(newValue, istext, keyskill): void {
    debugger;
    if (this.myjob.keyskills === undefined) {
      this.myjob.keyskills = '';
    }
    let jd: any;
    if (istext) {
      jd = newValue;
    } else {
      jd = $(newValue).text();
    }
    jd = jd.replace('\n', ' ');
    let url, data;
    if (keyskill) {
      url = this.key_suggestion_api_url;
      data = { keyskills: jd };

    } else {

      url = this.job_description_api_url;
      data = { jd: jd };
    }

    console.log(jd);
    if (jd.length > 0) {
      this.suggestedkeyskills = [];
      this.db.store(url, data, function (response) {
        if ($.trim(response) !== '') {
          console.log(response);


          const newval = '';
          const laststringarr = this.myjob.keyskills.split(',');
          const resultarr = response.split(',');
          this.suggestionlist = [];
          for (const k in resultarr) {
            if (resultarr[k]) {
              this.suggestionlist.push({ 'text': resultarr[k] });
            }
          }
          for (const k in resultarr) {
            if (resultarr[k]) {
              const currentval = $.trim(resultarr[k]);
              if (currentval !== '') {
                let isfound = false;
                for (const pk in laststringarr) {
                  if (laststringarr[pk]) {
                    const currentlastval = $.trim(laststringarr[pk]);
                    if (currentlastval !== '' && currentlastval !== currentval) {
                      isfound = false;

                    } else if (currentlastval !== '' && currentlastval === currentval) {
                      isfound = true;
                      break;

                    }
                  }
                }
                if (isfound === false && currentval !== '') {
                  if (!this.contains(currentval, this.suggestedkeyskills)) {
                    this.suggestedkeyskills.push(currentval);
                  }
                }
              }
            }
          }
          //                    if (newval !== '') {
          //                        this.myjob.keyskills = this.myjob.keyskills + newval;
          //                    }
        }
      });
    }
  };


  // this.$watch(function (scope) {
  //     return scope.myjob.jobDescription;
  //   },
  //     function (newValue, oldValue) {

  //       if (loadkeyskills_timeout != null) {
  //         clearTimeout(loadkeyskills_timeout);
  //       }
  //       loadkeyskills_timeout = setTimeout(function () {
  //         this.loadkeyskills(newValue);
  //       }, 2000);
  //     }
  //   );


  settracker(): void {
    this.db.list('tracker/', null, (response) => {


      try {
        this.trackerlist = response;
        if (this.trackerlist.length > 0) {
          // console.log(this.trackerlist);
          this.myjob.tracker_id = this.trackerlist[0].id.toString();
        }
      } catch (e) {

      }

    });
  }

  setkeyskills() {
    debugger;
    setTimeout(function () {

      this.myjob.keyskills = [];
      for (const i in this.keyskillsset) {
        if (this.keyskillsset[i]) {
          this.myjob.keyskills.push(this.keyskillsset[i].text);
        }
      }
      this.myjob.keyskills = this.myjob.keyskillsdemo.toString();
      this.getkeyskills();
    }, 500);
  }

  getkeyskillssuggestion(): any {

    return this.suggestionlist;
  };


  loadlocation(): void {
    this.locationtype = 'location';
    this.locations = [];
    this.db.list('location', null, (response): void => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }
    });
  };


  loadinternationlocation(): void {
    this.locationtype = 'international';
    this.locations = [];
    this.db.list('internationallocation', null, (response) => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }
    });
  };


  callapi = function (searchquery) {
    // searchquery='http://127.0.0.1:8000/';

    if ($.trim(searchquery).length > 0 && false) {
      searchquery = 'http://122.176.49.199:5000/' + searchquery;
      this.db.get(searchquery, {}, function (response) {

        // console.log(response);
        if ($.trim(response) !== '') {
          console.log(response);

          let newval = '';
          const laststringarr = this.myjob.keyskills.split(',');
          const resultarr = response.split(',');
          for (const k in resultarr) {
            if (resultarr[k]) {
              const currentval = $.trim(resultarr[k]);
              if (currentval !== '') {
                let isfound = false;
                for (const pk in laststringarr) {
                  if (laststringarr[pk]) {
                    const currentlastval = $.trim(laststringarr[pk]);
                    if (currentlastval !== '' && currentlastval !== currentval) {
                      isfound = false;

                    } else if (currentlastval !== '' && currentlastval === currentval) {
                      isfound = true;
                      break;

                    }
                  }
                }
                if (isfound === false && currentval !== '') {

                  newval = newval + ',' + currentval;
                }
              }

            }

          }
          if (newval !== '') {
            this.myjob.keyskills = this.myjob.keyskills + newval;
          }
        }
      }, function (response) {
        // console.log(response);
        alert(response);
      });
    }
  };
  getkeyskills(): void {

    const search = this.myjob.keyskills;
    const searchquery = search;
    const searcharr = search.split(',');
    //        if (searcharr.length == 1) {
    //            searchquery = search;
    //        } else {
    //            searchquery = searcharr[searcharr.length - 1];
    //        }
    if (this.t != null) {
      clearTimeout(this.t);
    }
    this.t = setTimeout(function () {
      this.loadkeyskills(searchquery, true, true);
    }, 2000);




  };


  clearSearchTerm(): void {
    this.searchTerm = '';
  };
  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  // $element.find('input').on('keydown', function(ev) {
  //   ev.stopPropagation();
  // });


  //    this.db.list('jobrole/', null, function (response) {
  //
  //        this.jobroles = response;
  //
  //    }, function (response) {
  //        //this.token=response.statusText;
  //    });

  // $('.validate').validate('#addnewjobform');
  // $('.validate').validate('#assignCandidate');
  // $('.validate').validate('#submitjob');


  loadManagerclientdetail(): void {
    this.db.list('manager/', null, (response): void => {
      this.managers = response;
      console.log(response);

    });
    this.db.list('clientdetail/', null, (response): void => {
      this.clientdetails = response;
      console.log(response);

    });
  }

  // this.minimumSalary = this.min;
  // this.maximumSalary = this.max;




  selectedmanagerlistset(id): void {
    if (this.selectedmanagerlist.indexOf(id) > -1) {
      if (this.selectedmanagerlist.length > 0) {
        // this.selectedmanagerlist.pop(id);
      }
    } else {
      this.selectedmanagerlist.push(id);
    }

  }


  applicationdepartment(): void {
    this.db.list('applicationdepartment', {}, (response): void => {

      this.departments = response;

      setTimeout(function () {
        $('.repeatcheckbox .checkbox-material').each(function () {

          $(this).parent().find('.visible').removeClass('visible');

        });
      }, 1000);

    });
  }

  // getlist(): void {

  //   this.db.list('joblist/', {
  //     'candidate': this.searchcandidate
  //   }, ((response): void => {
  //     this.myjoblist = response;
  //     //this.bindJoblist(this.jobslistmain);
  //   }));
  // };


  // $.material.init();
  addNewJobSave(): void {

    debugger;
    this.myjob.job_status = 'Active';

    // console.log(FH.SelectedCheckbox(this.departments));
    //    if ($('.validate').validate('#addnewjobform', true)) {
    if (true) {
      const locations = this.location;
      let locationstr = '';
      for (const j in locations) {
        if (locations[j].$ngOptionLabel) {
          locationstr += locations[j].$ngOptionLabel + ',';
        }

      }
      debugger;
      // const keyskills = this.myjob.keyskills;
      // //this.storekey = '';
      // let keyskillstr = '';
      // if (this.storekey === '' || this.storekey === undefined) {
      //   // this.storekey = this.myjob.keyskills;
      //   for (const j in keyskills) {
      //     if (keyskills[j]) {
      //       keyskillstr += keyskills[j] + ',';
      //     }

      //   }
      //   this.myjob.keyskills = keyskillstr;
      //   this.storekey = keyskillstr
      // } else {
      //   this.myjob.keyskills = this.storekey;
      // }
      if (this.myjob.is_client == 'Client') {
        this.myjob.is_client = 1;
      }
      else if (this.myjob.is_client == 'Department') {
        this.myjob.is_client = 0;
      }
      const keyskills = this.myjob.keyskills;
      //this.storekey = '';
      let keyskillstr = '';
      //if (this.storekey === '' || this.storekey === undefined) {
      // this.storekey = this.myjob.keyskills;
      for (const j in keyskills) {
        if (keyskills[j]) {
          keyskillstr += keyskills[j] + ',';
        }

      }
      this.myjob.keyskills = keyskillstr;
      this.myjob.location = locationstr;
      this.myjob.start_date = this.db.toYYMMDD(this.start_date_temp);
      this.myjob.end_date = this.db.toYYMMDD(this.end_date_temp);
      this.myjob.minimumSalary = (this.myjob.minimumSalarylac * 100000) + (this.myjob.minimumSalarythousand * 1000);
      //   =resultmin.tostring();
      this.myjob.maximumSalary = (this.myjob.maximumSalarylac * 100000) + (this.myjob.maximumSalarythousand * 1000);

      // this.myjob.functionalArea = this.functionalArea.functionalAreaName;
      const topost = this.myjob;
      if (this.myjob.functionalArea !== undefined) {
        topost.functionalArea = this.myjob.functionalArea;
      } else {
        topost.functionalArea = '';
      }
      topost.departments = this.db.SelectedCheckbox(this.departments);
      // this.user.profilepic=this.user.profilepic[0];
      if (this.myjob.minimumSalary > this.myjob.maximumSalary) {
        this.db.addmessageandremove('Maximum salary cannot be less then minimum salary.');
      } else {
        this.db.store('addnewjob/', topost, (response): void => {
          this.db.addmessageandremove('Data save Successfully');
          this.hidesavebutton = true;
          for (const i in this.myjob) {
            if (this.myjob[i]) {
              this.myjob[i] = '';
            }
          }
          // this.location = '';
          //this.functionalArea = '';

          const messagejobsuccess = 'We are reviewing this job.  It helps you getting higher number of referrals'
            + '.<br/>   Meanwhile Your team can work on this job. '
            + '<br/> Job will be live on website after review ';
          this.db.showMessage(messagejobsuccess, 'Good job done !');

        });
      }
    }
  };




}
