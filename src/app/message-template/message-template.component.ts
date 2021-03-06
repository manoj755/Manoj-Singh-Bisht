import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from 'app/db.service';
declare var $: any;
@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  public Editor = ClassicEditor;
  title = 'app';
  message = { id: 0 };
  isEdit = false;
  isscroll = false;
  ishideshow = false;
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  public autoGroupColumnDef;
  public defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  columnDefs = [
    {
      headerName: 'Action', field: 'id', suppressMenu: true,
      suppressSorting: true, width: 350,
      template:
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'Template Type', field: 'templateType', sortable: true, filter: true, headerCheckboxSelection: true,
      checkboxSelection: true, width: 250,
    },
    { headerName: 'Template Area', field: 'templatearea', sortable: true, filter: true, width: 220 },
    { headerName: 'Template name', field: 'templatename', sortable: true, filter: true, width: 220 },
    {
      headerName: 'Template For', field: 'is_client', width: 220,
      valueGetter: function (params) {
        if (params.data.is_client === 1) {
          return 'Client';
        } else {
          return 'Department';
        }
      }
    }
    // { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
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

  LoadData() {
    this.db.list('messagetemplate/', {}, ((response) => {
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
      this.db.destroy('messagetemplate/', data.id, ((response) => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );
    }
    //console.log('View action clicked', data);
  }


  back() {
    this.isEdit = false;
    this.message = { id: 0 };
  }

  onActionEditClick(row) {

    this.isEdit = false;
    this.db.show('messagetemplate/', row.id, ((response) => {

      this.isEdit = true;
      this.message = response;

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

  messageupdate() {
    // if (!$('.validate').validate('#messagetemp')) {
    //      // $.fn.showMessage('Please fill values');
    //     return;
    //   }
    this.db.update('messagetemplate/', this.message.id, this.message, ((response) => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  messagesave() {
    //   if (!$('.validate').validate('#messagetemp')) {
    //     // $.fn.showMessage('Please fill values');
    //    return;
    //  }
    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('messagetemplate/', this.message, ((response) => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.message = { id: 0 };


    }));

  }
  showhide() {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    } else {
      this.ishideshow = false;
    }
  }
  showhideedit() {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    }

  }
}
