import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';

declare var $: any;
@Component({
  selector: 'app-tracker-fields',
  templateUrl: './tracker-fields.component.html',
  styleUrls: ['./tracker-fields.component.scss']
})
export class TrackerFieldsComponent implements OnInit {

  ishidereference = true;
  isEdit = false;
  trackermessage: any = {};
  trackerselected = [];
  trackerselected_temp = [];
  trackermaster = [];
  trackerdata: any;
  rowdata = [];
  tracker: any;
  search: any = { display_name: '' };

  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    {
      headerName: 'Action', field: 'id', suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type="button" data-action-type="edit" class="btn btn-success btn-sm">
         Edit
       </button>

      <button type="button" data-action-type="delete" class="btn btn-danger btn-sm">
         Delete
      </button>`},

    { headerName: 'tracker_name', field: 'tracker_name', sortable: true, filter: true },

    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true },
  ];


  constructor(private db: DBService) {
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowSelection = 'singal';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }



  ngOnInit() {
    this.loadTrackerMaster();
    this.getlist()
  }

  back(): void {
    this.isEdit = false;
    this.trackermessage = {};
    this.trackerselected = [];
  }

  makeeditable(row): void {

    this.isEdit = true;
    // previousValue = scope.model;




  }

  Edit(row): void {
    this.trackerselected = [];

    this.isEdit = true;
    this.trackermessage = row;
    const tracker_data = $.parseJSON(row.tracker_data);
    for (const k in tracker_data) {
      if (tracker_data[k]) {
        for (const j in this.trackermaster) {

          if (tracker_data[k] === this.trackermaster[j].id) {
            this.trackerselected.push(this.trackermaster[j]);
            break;
          }
        }
      }
    }



  };
  Delete(row): void {


    if (confirm('Are you sure?')) {
      this.db.destroy('tracker/', row.id, ((response): void => {

        this.db.addmessageandremove('Deleted Successfully');

        this.getlist();



      }));
    }

  };
  trackersuggest(): void {
    if (!$('#searchtracker').hasClass('loaded')) {


      const availableTags = [];
      for (const k in this.trackermaster) {
        if (this.trackermaster[k]) {
          availableTags.push(this.trackermaster[k].display_name);
        }
      }
      $('#searchtracker').autocomplete({
        source: availableTags
      });

      $('#searchtracker').addClass('loaded');
    }
    ;
  }

  loadTrackerMaster(): void {
    this.db.list('trackermaster/', null, ((response): void => {

      this.trackermaster = response;
    }));
  }

  removetracker(tracker): void {
    this.trackerselected_temp = [];
    for (const i in this.trackerselected) {
      if (this.trackerselected[i].id !== tracker.id) {
        this.trackerselected_temp.push(this.trackerselected[i]);

      }
    }



    this.trackerselected = this.trackerselected_temp;
  };
  getlist(): void {

    this.db.list('tracker/', null, ((response): void => {


      try {
        this.rowdata = response;
      } catch (e) {
      }

    }));
  }
  deleteThisRow(entity): void {
    console.log(entity);
  }



  trackersave(): void {
    //

    if (this.isEdit === false) {
      this.trackerselected = [];
    }

    for (const k in this.trackermaster) {
      if (this.trackermaster[k]) {
        this.tracker = this.trackermaster[k];
        if (this.tracker.selected) {
          // debugger;
          let isExist = false;
          for (const i in this.trackerselected) {
            if (this.trackerselected[i].id === this.tracker.id) {
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            if (this.tracker !== undefined) {
              this.trackerselected.push(this.tracker);
            }
          } else {
          }
        }
      }
    }


  }

  submittrackersave(): void {
    this.trackerdata = {};

    const liElements = []; // mySort.getElementsByTagName('li');
    //            for (var i = 0; i < liElements.length; i++) {
    //                newSortIndexes.push(liElements[i].getAttribute('data-index'));
    //            }
    for (let i = 0; i < liElements.length; i++) {


      this.trackerdata[(i + 1).toString()] = liElements[i].dataset.id;


    }
    //

    if (this.trackermessage === undefined) {
      alert('please enter tracker');

    } else {
      //            for (var i in this.trackerselected) {
      //                trackerdata[i] = this.trackerselected[i].id;
      //
      //            }
      const trackerdata = JSON.stringify(this.trackerdata);

      this.trackermessage.tracker_data = trackerdata;
      this.db.store('tracker/', this.trackermessage, ((response): void => {

        this.db.addmessageandremove('Added Successfully');
        this.getlist();



      }));
    }

  }



  showuser(id): void {

    //        this.channel.channel;
    this.db.show('tracker/', id, ((response): void => {
      this.trackermessage = response;

    }));
  }
  trackerupdate(): void {
    //
    this.trackerdata = {};

    const liElements = []; // mySort.getElementsByTagName('li');
    //            for (var i = 0; i < liElements.length; i++) {
    //                newSortIndexes.push(liElements[i].getAttribute('data-index'));
    //            }
    for (let i = 0; i < liElements.length; i++) {


      this.trackerdata[(i + 1).toString()] = liElements[i].dataset.id;


    }
    this.trackermessage.tracker_data = JSON.stringify(this.trackerdata);
    this.db.update('tracker/', this.trackermessage.id, this.trackermessage, ((response): void => {

      this.getlist();
      this.db.addmessageandremove('Updated Successfully');

    }));
  }


  onGridReady(event): void {

  }







}
