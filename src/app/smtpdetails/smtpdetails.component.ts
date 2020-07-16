import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from 'app/db.service';
declare var $: any;
@Component({
  selector: 'app-smtpdetails',
  templateUrl: './smtpdetails.component.html',
  styleUrls: ['./smtpdetails.component.scss']
})
export class SmtpdetailsComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  smtp = { id: 0 };
  isEdit = false;
  isvisible = false;
  firstLoad = false;
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;

  public autoGroupColumnDef;
  private defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
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
      headerName: 'smtp Type', field: 'smtptype', sortable: true,
      filter: true, headerCheckboxSelection: true, checkboxSelection: true, width: 250,
    },
    { headerName: 'Incoming server', field: 'smtpname', sortable: true, filter: true, width: 250 },
    { headerName: 'User Name', field: 'user_name', sortable: true, filter: true, width: 250 },
    { headerName: 'Port', field: 'port', sortable: true, filter: true },
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

  LoadData() {
    this.db.list('smtpdetail/', {}, ((response) => {
      this.rowData = response;


    }));
  }
  onGridReady(params) {
    if (params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

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
    if (e) {
      if (e.event.target !== undefined) {
        let data = e.data;
        let actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
          case 'delete':
            return this.onActionDeleteClick(data);
          case 'edit':
            return this.onActionEditClick(data), this.visibleonedit();
        }
      }
    }
  }

  public onActionDeleteClick(data: any) {
    debugger;
    if (data) {
      if (confirm('Are you sure?')) {
        this.db.destroy('smtpdetail/', data.id, ((response) => {
          this.db.addmessageandremove('deleted');
          //this.LoadData();
        })
        );
      }
      console.log('View action clicked', data);
    }
  }

  back() {
    this.isEdit = false;
    this.smtp = { id: 0 };
  }

  onActionEditClick(row) {

    if (row) {
      this.isEdit = false;
      this.db.show('smtpdetail/', row.id, ((response) => {

        this.isEdit = true;
        this.smtp = response;
        if (this.firstLoad === false) {
          window.scrollTo(0, 100);
          //this.firstLoad = true;
        }
        //            for (var i in response.data) {
        //                for (var j in response.data[i]) {
        //                    this.gridOptions.columnDefs.push({field:j});
        //                }
        //                break;
        //            }


        //            this.gridTotalJobs.data = response.data;

      }));
    }

  };

  smtpupdate() {
    // if (!$('body').validate('#smtpid')) {
    //   //  $.fn.showMessage('Please fill values');
    //   return;
    // }
    this.db.update('smtpdetail/', this.smtp.id, this.smtp, ((response) => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  smtpsave() {
    // if (!$('.validate').validate('#smtpid')) {
    //   //  $.fn.showMessage('Please fill values');
    //   return;
    // }
    //this.user.profilepic=this.user.profilepic[0];
    this.db.store('smtpdetail/', this.smtp, ((response) => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.smtp = { id: 0 };


    }));

  }
  // this.isvisible=false;
  visible() {
    debugger;
    if (this.isvisible === false) {
      this.isvisible = true;
    } else {
      this.isvisible = false;
    }
  }
  visibleonedit() {
    debugger;
    if (this.isvisible === false) {
      this.isvisible = true;
    } else {
      this.isvisible = true;

    }

  }


}
