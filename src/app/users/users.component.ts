import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public Editor = ClassicEditor;
  title = 'app';
  user = { id: 0 };
  isEdit = false;
  item: any = {};
  stateobj = {};
  genders = [];
  errors = {};
  countries = [];
  channel = [];
  location = [];
  applications = [];
  roles = [];

  // usernew = {};
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;
  ProfileTabs: any;
  updateprofie: any;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    {
      headerName: 'Action', field: 'id', suppressMenu: 'true', suppressSorting: 'true',
      template: `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>Edit</button>
   <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>delete</button>`
    },
    { headerName: 'Role_Name', field: 'Role_Name', sortable: 'true', filter: 'true' },
    { headerName: 'email', field: 'email', sortable: 'true', filter: 'true' },
    { headerName: 'channel', field: 'channel', sortable: 'true', filter: 'true' },
    { headerName: 'name', field: 'name', sortable: 'true', filter: 'true' },
    { headerName: 'mobileNo', field: 'mobileNo', sortable: 'true', filter: 'true' }
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
  changepasswordfun(): void { }
  LoadData(): void {
    this.db.list('user/', {}, ((response): void => {
      this.rowData = response;
    }));

    //list
    this.db.list('country/', null, ((response): void => {
      this.countries = response;
    }));
    this.db.list('gender/', null, ((response): void => {
      this.genders = response;
    }));
    this.db.list('channel/', null, ((response): void => {
      this.channel = response;
    }));
    this.db.list('application/', null, ((response): void => {
      this.applications = response;
    }));
    this.db.list('onlysame/', null, ((response): void => {
      this.roles = response;
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
    console.log('View action clicked', data);
  }
  back(): void {
    this.isEdit = false;
    this.user = { id: 0 };
  }

  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('user/', row.id, ((response): void => {

      this.isEdit = true;
      this.user = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };
  userupdate(): void {
    this.db.update('user/', this.user.id, this.user, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }
  usersave(): void {

    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('user/', this.user, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.user = { id: 0 };


    }));

  }


}
