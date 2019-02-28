import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DBService } from 'app/db.service'; 
@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  public Editor = ClassicEditor;
  title = 'app';
  message={id:0};
  isEdit=false;
  private smsselected={};
  private emailselected={};
  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  columnDefs = [
    {  headerName: 'Delete', field: 'id', suppressMenu: true,
    suppressSorting: true,
    template:
      `<button type="button" data-action-type="edit" class="btn btn-success btn-sm">
         Edit
       </button>

      <button type="button" data-action-type="delete" class="btn btn-danger btn-sm">
         Delete
      </button>`},
    {  field: 'templateType', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'templateType', field: 'templateType', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Mobile', field: 'mobileNo', sortable: true, filter: true },
    { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
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
  
  LoadData():void{
    this.db.list('messagetemplate/', {  }, ((response): void => {
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
        let actionType = e.event.target.getAttribute("data-action-type");

        switch(actionType) {
            case "delete":
                return this.onActionDeleteClick(data);
            case "edit":
                return this.onActionEditClick(data);
        }
    }
}

public onActionDeleteClick(data: any){
    console.log("View action clicked", data);
}

 
back():void {
  this.isEdit = false;
  this.message = {id:0};
}

onActionEditClick  (row):void {

  this.isEdit = false;
  this.db.show("messagetemplate/", row.id,  ((response):void=> {
      
      this.isEdit = true;
      this.message = response;
//            for (var i in response.data) {
//                for (var j in response.data[i]) {
//                    this.gridOptions.columnDefs.push({field:j});
//                }
//                break;
//            }


//            this.gridTotalJobs.data = response.data;

  } ));

};

messageupdate():void {
  this.db.update("messagetemplate/", this.message.id, this.message,  ((response):void=> {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

  }));
}

messagesave() :void{
  
      //this.user.profilepic=this.user.profilepic[0];
     this.db.store("messagetemplate/", this.message,((response):void=> {

      this.db.showMessage('Added Successfully');
          this.LoadData();
          this.message = {id:0};


      }));
  
}
}
