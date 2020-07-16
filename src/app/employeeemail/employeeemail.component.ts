import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-employeeemail',
  templateUrl: './employeeemail.component.html',
  styleUrls: ['./employeeemail.component.scss']
})
export class EmployeeemailComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  employeeemail = { id: 0 };
  isEdit = false;
  item: any = {};
  appdeparments = [];
  stateobj = {};
  applicationdepartmentid: {};
  errors = {};
  isEditclientStateswiseBillingDetail = false;
  clientStateswiseBillingDetail = {};
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
      headerName: 'Action', field: 'id', suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'name', field: 'name', sortable: true, filter: true, headerCheckboxSelection: true,
      checkboxSelection: true
    },
    { headerName: 'email', field: 'email', sortable: true, filter: true },
    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true },
    { headerName: 'IP Address', field: 'ipAddress', sortable: true, filter: true },
  ];

  rowData = [
  ];
  constructor(public db: DBService) {
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
    this.LoadData();
  }

  LoadData(): void {
    this.db.list('employeeemail/', {}, ((response): void => {
      this.rowData = response;
      // this.appdeparments = response;


    }));
    this.db.list('applicationdepartment/', {}, ((response): void => {
      //this.rowData = response;
      this.appdeparments = response;


    }));
  }
  onGridReady(params) {
    this.gridApi = params.api;
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
      this.db.destroy('employeeemail/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        //this.LoadData();
      })
      );

    }
    console.log('View action clicked', data);
  }


  back(): void {
    this.isEdit = false;
    this.employeeemail = { id: 0 };
  }

  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('employeeemail/', row.id, ((response): void => {

      this.isEdit = true;
      this.employeeemail = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };

  employeeemailupdate(): void {
    this.db.update('employeeemail/', this.employeeemail.id, this.employeeemail, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  employeeemailsave(): void {

    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('employeeemail/', this.employeeemail, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.employeeemail = { id: 0 };


    }));

  }

}
