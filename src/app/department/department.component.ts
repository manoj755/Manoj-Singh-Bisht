import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  department = { id: 0 };
  isEdit = false;
  item: any = {};
  stateobj = {};
  errors = {};
  isEditclientStateswiseBillingDetail = false;
  clientStateswiseBillingDetail = {};
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
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'department', field: 'department', sortable: true, filter: true, headerCheckboxSelection: true,
      checkboxSelection: true
    },

    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true },
    { headerName: 'IP Address', field: 'ipAddress', sortable: true, filter: true },
  ];

  rowData = [
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
    this.LoadData();
  }

  LoadData(): void {
    this.db.list('applicationdepartment/', {}, ((response): void => {
      this.rowData = response;


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
      let data = e.data;
      let actionType = e.event.target.getAttribute('data-action-type');

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
    this.department = { id: 0 };
  }

  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('applicationdepartment/', row.id, ((response): void => {

      this.isEdit = true;
      this.department = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };

  departmentupdate(): void {
    this.db.update('applicationdepartment/', this.department.id, this.department, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  departmentsave(): void {

    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('applicationdepartment/', this.department, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.department = { id: 0 };


    }));

  }
}
