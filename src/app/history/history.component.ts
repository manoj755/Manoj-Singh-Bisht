import { Component, OnInit } from '@angular/core'; 
 
import { DBService } from 'app/db.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
   
  title = 'app';
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
    {  field: 'candidateName', sortable: true, filter: true, headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'Skills', field: 'skillSet', sortable: true, filter: true },
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
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit() {
    this.LoadHistory();
  }
  
  LoadHistory():void{
    this.db.list('history/', {  }, ((response): void => {
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
}
