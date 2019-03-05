import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-recruiter-report-newhistory',
  templateUrl: './recruiter-report-newhistory.component.html',
  styleUrls: ['./recruiter-report-newhistory.component.scss']
})
export class RecruiterReportNewhistoryComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  client = { id: 0 };
  isEdit = false;
  client_detail_id: { 0 };
  job_id: { 0 };
  myjob: any = {};
  manager: {0};
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
      headerName: 'Recruiter', field: 'recruiter_Name', sortable: true, filter: true,
      headerCheckboxSelection: true, checkboxSelection: true
    },
    { headerName: 'Total_Candidate', field: 'Total_Candidate', sortable: true, filter: true },
    { headerName: 'Interrested Sourced', field: 'Interrested_sourced', sortable: true, filter: true },
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
    this.db.list('recruiterhistoryreportApi/', {}, ((response): void => {
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





  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show("clientdetail/", row.id, ((response): void => {

      this.isEdit = true;
      this.client = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  };

  clientupdate(): void {
    this.db.update("clientdetail/", this.client.id, this.client, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  clientsave(): void {

    //this.user.profilepic=this.user.profilepic[0];
    this.db.store("clientdetail/", this.client, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.client = { id: 0 };


    }));

  }
}
