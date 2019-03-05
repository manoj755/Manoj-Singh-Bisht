import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from 'app/db.service';
@Component({
  selector: 'app-messagelog',
  templateUrl: './messagelog.component.html',
  styleUrls: ['./messagelog.component.scss']
})
export class MessagelogComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  messagelog = { id: 0 };
  isEdit = false;
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
      suppressSorting: true, width: 300,
      template:
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'message', field: 'message', sortable: true,
      filter: true, headerCheckboxSelection: true, checkboxSelection: true, width: 250,
    },
    { headerName: 'templateId', field: 'templateId', sortable: true, filter: true, width: 250 },
    { headerName: 'messageType', field: 'messageType', sortable: true, filter: true, width: 250 },
    { headerName: 'subject', field: 'subject', sortable: true, filter: true },
    { headerName: 'sendedTo', field: 'sendedTo', sortable: true, filter: true, width: 250 },
    { headerName: 'sendedCC', field: 'sendedCC', sortable: true, filter: true, width: 250 },
    { headerName: 'sendedBCC', field: 'sendedBCC', sortable: true, filter: true },
    { headerName: 'sendedBy', field: 'sendedBy', sortable: true, filter: true, width: 250 },
    { headerName: 'attachment', field: 'attachment', sortable: true, filter: true, width: 250 },
    { headerName: 'isSend', field: 'isSend', sortable: true, filter: true },
    { headerName: 'toBeSentDate', field: 'toBeSentDate', sortable: true, filter: true, width: 250 },
    { headerName: 'sentDate', field: 'sentDate', sortable: true, filter: true, width: 250 },
    { headerName: 'app_id', field: 'app_id', sortable: true, filter: true },

    { headerName: 'ipAddress', field: 'ipAddress', sortable: true, filter: true, width: 250 },
    { headerName: 'response', field: 'response', sortable: true, filter: true },
    { headerName: 'templateno', field: 'templateno', sortable: true, filter: true, width: 250 },
    { headerName: 'atsid', field: 'atsid', sortable: true, filter: true, width: 250 },
    { headerName: 'isSuperAdmin', field: 'isSuperAdmin', sortable: true, filter: true },
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
    this.db.list('messagelog/', {}, ((response): void => {
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
    this.messagelog = { id: 0 };
  }

  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('messagelog/', row.id, ((response): void => {

      this.isEdit = true;
      this.messagelog = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };

  messagelogupdate(): void {
    this.db.update('messagelog/', this.messagelog.id, this.messagelog, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  messagelogsave(): void {

    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('messagelog/', this.messagelog, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.messagelog = { id: 0 };


    }));

  }


}
