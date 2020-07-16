import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  channel = { id: 0, display_name: {}, type: {}, user_name: {}, password: {} };
  isEdit = false;
  item: any = {};
  isEditchannel = false;
  stateobj = {};
  genders = [];
  errors = {};
  countries = [];
  // channel = [];
  location = [];
  applications = [];
  roles = [];

  // usernew = {};
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  columnDefs = [
    {
      headerName: 'Action', width: 420, field: 'id', suppressMenu: 'true', suppressSorting: 'true',
      template: `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>Edit</button>
   <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>delete</button>`
    },
    { headerName: 'Channel Name', width: 420, field: 'display_name', sortable: 'true', filter: 'true' },
    { headerName: 'Login ID', width: 420, field: 'user_name', sortable: 'true', filter: 'true' },
  ];
  rowData = [];

  constructor(public db: DBService) {
    this.defaultColDef = {
      editable: 'true',
      enableRowGroup: 'true',
      enablePivot: 'true',
      sortable: 'true',
      resizable: 'true',
      filter: 'true',
      enableValue: 'true',

    };
    this.rowSelection = 'single';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';


  }




  ngOnInit() {
    this.LoadData();
  }
  LoadData(): void {
    this.db.list('channel/', {}, ((response): void => {
      this.rowData = response;
    }));




  }
  onGridReady(params) {
    this.gridApi = params.gridApi;
    this.gridColumnApi = params.columnApi;
  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    console.log(event.api.getSelectedNodes());
    const rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
  }
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'delete':
          return this.onActionDeleteClick(data);
        case 'edit':
          return this.onActionEditClick(data);
      }
    }
  }
  public onActionDeleteClick(data: any) {
    debugger;
    if (confirm('Are you sure?')) {
      this.db.destroy('channel/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );

    }
    console.log('View action clicked', data);
  }
  back(): void {
    this.isEdit = false;
    this.channel = { id: 0, display_name: {}, type: {}, user_name: {}, password: {} };
  }

  onActionEditClick(row): void {

    this.isEdit = false;

    this.db.show('channel/', row.id, ((response): void => {

      this.isEdit = true;
      this.channel = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };
  channelupdate(): void {
    this.db.update('channel/', this.channel.id, this.channel, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }
  channelsave(): void {

    // this.user.profilepic=this.user.profilepic[0];
    this.db.store('channel/', this.channel, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.channel = { id: 0, display_name: {}, type: {}, user_name: {}, password: {} };



    }));

  }




}
