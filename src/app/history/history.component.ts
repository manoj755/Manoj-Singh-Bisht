import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { DBService } from '../db.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'app';

  columnDefs = [
    { headerName: 'Candidate Name', field: 'candidateName', sortable: true, filter: true },
    { headerName: 'Mobile', field: 'mobileNo', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'location', field: 'location', sortable: true, filter: true },
    { headerName: 'Preferred Location', field: 'preferredLocation', sortable: true, filter: true },
    { headerName: 'Current Designation', field: 'currentDesignation', sortable: true, filter: true },
    { headerName: 'Current Organization', field: 'currentOrganization', sortable: true, filter: true },
    { headerName: 'Relevant Experiance', field: 'relevantExperiance', sortable: true, filter: true },
    { headerName: 'Qualification', field: 'qualification', sortable: true, filter: true },
    { headerName: 'State', field: 'state', sortable: true, filter: true },
    { headerName: 'Current Salary', field: 'currentSalary', sortable: true, filter: true },
    { headerName: 'Expected Salary', field: 'expectedSalary', sortable: true, filter: true },
    { headerName: 'Notice Period', field: 'noticePeriod', sortable: true, filter: true },
    { headerName: 'Address', field: 'address', sortable: true, filter: true },
    { headerName: 'Browse Date', field: 'browse_date', sortable: true, filter: true },
    { headerName: 'Industry Type', field: 'industryType', sortable: true, filter: true },
  ];

  rowData: any = [];
  constructor(private db: DBService) { }

  ngOnInit() {
    this.db.list('history', {}, ((response): void => {

      this.rowData = response;
    }));

  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
