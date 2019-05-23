import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
  users: any;
  roles = [];
  isscroll = false;
  ishideshow = false;

  // usernew = {};
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;
  ProfileTabs: any;
  updateprofie: any;
  appid: any;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;

  // userForm = new FormGroup({
  //   Name: new FormControl('', Validators.required),
  // });


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
  onSubmit() {
    alert(JSON.stringify(this.user));
  }
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
    this.changerole(this.appid);
    this.loadmanager();
  }
  changepasswordfun(): void { }
  LoadData(): void {
    this.db.list('user/', {}, ((response): void => {
      this.rowData = response;
    }));

    //list
    this.db.list('master/country/', null, ((response): void => {
      this.countries = response;
    }));
    // this.db.list('gender/', null, ((response): void => {
    //   this.genders = response;
    // }));
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
          return this.onActionEditClick(data), this.showhideedit();
      }
    }
  }
  public onActionDeleteClick(data: any) {
    debugger;
    if (confirm('Are you sure?')) {
      this.db.destroy('user/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        //this.LoadData();
      })
      );

    }
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
      if (this.isscroll === false) {
        window.scrollTo(0, 100);
      }
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

  changerole(appid): void {
    debugger;
    // tslint:disable-next-line: radix
    this.appid = parseInt(appid);
    if (this.appid !== 0) {

      this.db.list('data/users', { app_id: this.appid }, ((response): void => {
        this.users = response;
      })
      );
    }
  }

  loadmanager(): void {
    const appid = document.getElementById('usersapp');
    this.db.list('data/users', { app_id: appid }, ((response): void => {
      this.users = response;
    })
    );
  }


  showhide(): void {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    }
else {
      this.ishideshow = false;
    }
  }

  showhideedit(): void {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    }
  }
}
