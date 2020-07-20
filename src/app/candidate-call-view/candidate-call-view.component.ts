import { Component, OnInit } from '@angular/core';
import { CandidateCallDatailsComponent } from 'app/control/candidate-call-datails/candidate-call-datails.component';
import { DBService } from 'app/db.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-candidate-call-view',
  templateUrl: './candidate-call-view.component.html',
  styleUrls: ['./candidate-call-view.component.scss']
})
export class CandidateCallViewComponent implements OnInit {
  selectednodes = [];
  allids = [];
  callids = [];
  searchcandidate: any;
  jobslistmain: any;
  isLoadingJobs: boolean;
  jobslist: any;
  locationname: any;
  locationcount: any;
  candidatesearch: any;
  avgreting: any;
  jobsdata: any;
  rating: number;
  isinterview: number;
  jobitemselected: any;
  mainprocessnewvar: any;
  childprocessnewvar: any;
  gridheader: string;
  selectedjob: any;
  process: any;
  item: any = { start_date_temp: new Date('2019-01-01'), end_date_temp: new Date() };
  mainprocess: number;
  ShowCandidates = false;
  gridColumnApi: any;
  gridApi: any;
  gridOptionsloadcandidatesInPopUp: any = {};
  callconversation: any = {};
  conversationsobj: any[];
  checkconversations: any;
  conversations: any;
  candidate_id = 0;
  onCommentClick: any;
  currentData: {};
  showlocation = true;
  locationtype: string;
  locations: any[];
  Averages = true;
  pskills = false;
  sskills = false;
  tskills = false;
  formatLabel(value: number) {
    if (value >= 91) {
      return 'any';
    }
    else {
      return Math.round(value) + 'day';
    }

    return value;
  }

  constructor(public db: DBService, public route: ActivatedRoute) { }
  columnDefs = [
    {
      headerName: 'activity', sortable: false, filter: true, headerCheckboxSelection: true, checkboxSelection: true,
      field: 'id', cellRendererFramework: CandidateCallDatailsComponent, autoHeight: true,
      width: 940, cellStyle: { "white-space": "normal !important;" }
    },

  ];

  rowData = [
  ];
  ngOnInit() {
    debugger;
    this.loadlocation();
    const data = this.route.snapshot.paramMap.get('jobid');
    var arr = data.split('&');
    const jobid = arr[0];
    const mainprocess = "My Candidates";
    const childprocess = arr[1];
    let candidatesearch = arr[2];
    // this.candidatesearch= arr[2];;
    this.bindJob(jobid);
    this.filterdrbytab(mainprocess, childprocess, jobid);

  }


  bindJob(jobid): void {
    this.db.list('getJobdata/', { 'jobid': jobid }, ((response): void => {
      this.jobsdata = response;

    })
    );
  }


  rateingshow(): void {
    debugger;
    if (this.rating == 0) {
      this.Averages = true;
      this.pskills = false;
      this.sskills = false;
      this.tskills = false;
    } else if (this.rating == 1) {
      this.Averages = false;
      this.pskills = true;
      this.sskills = false;
      this.tskills = false;
    }
    else if (this.rating == 2) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = true;
      this.tskills = false;
    }
    else if (this.rating == 3) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = false;
      this.tskills = true;
    }
  }


  loadlocation(): void {
    this.locationtype = 'location';
    this.locations = [];
    this.locationcount = [];
    this.locationname = [];
    const jid = this.route.snapshot.paramMap.get('jobid');
    var arr = jid.split('&');
    const jobid = arr[0];
    debugger;
    this.db.list('getlocationbycall', { 'jobid': jobid }, (response): void => {
      debugger;
      // this.locations =  response;
      //  if(response[0]) {
      const data = response[0];
      for (const j in data) {
        if (data[j]) {
          this.locationname.push(data[j].location);
        }


      }

      debugger;
      this.locations;
      const datacount = response[1];
      for (const i in datacount) {
        if (datacount[i]) {
          this.locationcount.push(datacount[i].count);
        }
      }

      for (const t in datacount) {
        if (datacount[t]) {
          this.locations.push(this.locationname[t]) //+ '(' + this.locationcount[t] + ')');
        }
      }
      // }

    });
  };


  filterdrbytab(mainprocess?, childprocess?, jobid?): void {
    debugger;
    this.isinterview = 9;
    if (childprocess === 'isinterview') {
      childprocess = 'all';
      this.isinterview = 1;
    }

    // this.jobitemselected = jobitem;
    if (mainprocess == null) {
      mainprocess = this.mainprocessnewvar;
    }
    if (childprocess == null) {
      childprocess = this.childprocessnewvar;
    }
    this.mainprocessnewvar = mainprocess;
    this.childprocessnewvar = childprocess;
    if (childprocess === 'allcalledcandidate') {
      this.gridheader = 'All';
    } else if (childprocess === 'calledinterested') {
      this.gridheader = 'Interested';
    } else if (childprocess === 'callednotinterested') {
      this.gridheader = 'Not Interested';
    } else if (childprocess === 'callbackrequest') {
      this.gridheader = 'Call Back Request';
    } else if (childprocess === 'incompletecall' || childprocess === 'tocall') {
      this.gridheader = 'No Status/Incomplete Call';
    } else if (childprocess === 'couldnotconnect') {
      this.gridheader = 'Could not Connect';
    }
    if (jobid != null) {
      this.selectedjob = jobid;
    }
    this.process = childprocess;
    if (mainprocess === 'My Referrals') {
      this.mainprocess = 1;
      //            $('#1b .nav li').removeClass('active');
      //            $('#1b .nav li').eq(0).addClass('active');
    } else {
      //            $('#2b .nav li').removeClass('active');
      //            $('#2b .nav li').eq(0).addClass('active');
      this.mainprocess = 0;
    }
    this.filterbyJob();
  } filterbyJob(): void {

    this.loadCandidate();
    this.ShowCandidates = true;
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {
        case 'conversation':
          return this.conversation(data);
        case 'openpopup':
          return this.openpopup(data.call_id);
        case 'activity':
        //   return this.activityclick(data);
        case 'comment':
          return this.onCommentClick(data);
        case 'notes':
          return this.onNotesClick(data);
        case 'candidateshow':
          return this.oncandidateshowClick(data);

      }
    }
  }
  openpopup(id): void {
    window.open(this.db.http_or_https + '://api.passivereferral.com/recording/?id='
      + id, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=400,height=150');
  }


  public oncandidateshowClick(data: any) {


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }
  public onNotesClick(data: any) {
    // debugger;
    this.candidate_id = data.id;
  }



  conversation(entity): void {
    debugger;

    this.callconversation = entity;
    $('#player').html('<iframe src="' + this.db.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');

    this.conversationsobj = [];
    // this.callconversation=entity;
    this.db.show('calldetail/', entity.call_id, ((response): void => {
      debugger;
      this.checkconversations = response.conversation;
      debugger;
      if (this.checkconversations == "array" || this.checkconversations == null) {
        this.db.showMessage('Conversations Not Available');
      } else {
        this.conversations = JSON.parse(response.conversation);
        debugger;
        for (const con in this.conversations) {
          if (true) {
            if (this.conversations['audio']) {
              this.conversationsobj.push({
                //key: Object.keys(con).toString(),

                key: con.split('__')[0],
                value: this.conversations[con].text,
                start_speaking: this.conversations[con].start_speaking,
                end_speaking: this.conversations[con].end_speaking,
                start_transcribe: this.conversations[con].start_transcribe,
                end_transcribe: this.conversations[con].end_transcribe,
                audio: this.conversations[con].audio,
                text: this.conversations[con].text,
                // start_speaking: this.conversations[con].start_speaking,
                //            start_speaking: this.conversations[con].start_speaking,

              })
            }
            else if (this.conversations[con].text != null) {
              this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
            }
            else {
              // this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
              this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con] })
            }
          }
        }
        $('#conversation').modal('show');
      }
    })
    );

  };



  loadCandidate = function () {
    debugger;
    if (this.expto == undefined) {
      this.expto = 50;
    }
    if (this.expfrom == undefined) {
      this.expfrom = 0;
    }
    this.location;
    this.freshness;

    let SelectedJob = ''
    if (this.isfirstload !== 1) {
    } else {
      SelectedJob = this.selectedjob;
    }
    SelectedJob = this.selectedjob;

    this.globaljobid = SelectedJob;
    if (this.filterdropdown == undefined) {
      this.filterdropdown = null;
    }
    if (this.searchcandidatetext == undefined) {
      this.searchcandidatetext = null;
    }

    if (this.searchcandidate == undefined) {
      const data = this.route.snapshot.paramMap.get('jobid');
      var arr = data.split('&');
      const candidate = arr[2];
      this.searchcandidate = candidate;
    }
    debugger;

    if (this.location != undefined) {

      if (this.location.length > 0) {
        this.location = this.location.toString();
      } else {
        this.location = 'all';
      }
      this.location = this.location.toString();
    } else {
      this.location = 'all';
    }
    const Search = {
      process: this.process,
      mainprocess: this.mainprocessnewvar,
      noticp: this.noticp,
      Experiencefrom: this.expfrom,
      Average: this.avgreting,
      thirdskill: this.tskill,
      secondskill: this.sskill,
      firstskill: this.pskill,
      Experienceto: this.expto,
      location: this.location,
      salaryto: this.salaryto,
      salaryfrom: this.salaryfrom,
      selectedjob: SelectedJob,
      candidate: this.searchcandidate,
      isinterview: this.isinterview,
      start_date: this.db.toYYMMDD(this.item.start_date_temp),
      end_date: this.db.toYYMMDD(this.item.end_date_temp)
    };

    $('#conversation').on('hidden.bs.modal', function () {
      $('#player').html('');
    });





    this.rowData = [this.rowHeight = 200];
    console.log(Search);
    this.db.list('callcandidatesdetailmyjob/', Search, ((response): void => {
      debugger;
      // this.gridOptionsloadcandidatesInPopUp.columnDefs = this.columnDefs;
      this.jobcount = response[0];
      this.candidatedetails = response;
      this.rowData = response;

      this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
        return this.candidatedetails;
      };
      this.candidateinpopup = response;

    })

    );
  };

  exportdat() {
    this.gridApi.exportDataAsCsv();
  }

  onSelectionChanged(event) {
    debugger;
    this.selectednodes = event.api.getSelectedNodes();
    this.allids = this.db.extractIDsData(event.api.getSelectedNodes());
    this.callids = this.db.extractCallId(event.api.getSelectedNodes());
    // this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }

}
