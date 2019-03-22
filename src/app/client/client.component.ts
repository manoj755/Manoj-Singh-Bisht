import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public Editor = ClassicEditor;
  title = 'app';
  feeslab = [];
  client = { id: 0, feeslabtype: '', fee_slab: [] };
  fromfeesslab = 0;
  amt = 0;
  newclient: any;

  isEdit = false;
  isEditstatewise = false;
  item: any = {};
  tofeesslab = 0;
  stateobj = {};
  //gridclientStateswiseBillingDetail: any;
  states: any;
  errors = {};
  isscroll = false;
  ishideshow = false;
  ishideshowclient = false;
  updateid: any;
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
      headerName: 'Delete', field: 'id', suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type='button' data-action-type='edit'  class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'Billing Name', field: 'billingName', sortable: true, filter:
        true, headerCheckboxSelection: true, checkboxSelection: true
    },
    { headerName: 'About', field: 'about', sortable: true, filter: true },
    { headerName: 'Website', field: 'website', sortable: true, filter: true },
    { headerName: 'Address', field: 'address', sortable: true, filter: true },
    { headerName: 'Billing Period', field: 'billing_period', sortable: true, filter: true },
    { headerName: 'Invoice Currency', field: 'invoice_currency', sortable: true, filter: true },
  ];
  columnDefs2 = [
    {
      headerName: 'Delete', field: 'id', suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type='button' data-action-type='editstate' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='deletestate' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'State Name', field: 'state_name', sortable: true, filter:
        true, headerCheckboxSelection: true, checkboxSelection: true
    },
    { headerName: 'Gst', field: 'gst', sortable: true, filter: true },
    // { headerName: 'Website', field: 'website', sortable: true, filter: true },
    // { headerName: 'Address', field: 'address', sortable: true, filter: true },
    // { headerName: 'Billing Period', field: 'billing_period', sortable: true, filter: true },
    // { headerName: 'Invoice Currency', field: 'invoice_currency', sortable: true, filter: true },
  ];
  gridclientStateswiseBillingDetail = [];
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
    this.loadstatewisedetail();
  }
  loadstatewisedetail(): void {
    this.db.list('state', null, ((response): void => {
      this.states = response;
    })
    );

    this.db.list('clientstateswisebillingdetail/', { 'client_detail_id': this.client.id }, ((response): void => {
      this.gridclientStateswiseBillingDetail = response;

    })
    );



  }
  LoadData(): void {
    this.db.list('clientdetail/', {}, ((response): void => {
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

          return this.onActionEditClick(data), this.showhide();

      }
    }
  }
  public onRowClickedState(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'deletestate':
          return this.onActionDeleteClickStates(data);
        case 'editstate':
          return this.onActionEditClickStates(data);
      }
    }
  }
  public onActionDeleteClick(data: any) {
    console.log('View action clicked', data);
  }
  public onActionDeleteClickStates(data: any) {
    console.log('View action clicked', data);
  }


  back(): void {
    this.isEdit = false;
    this.client = { id: 0 };
  }
  backstate(): void {
    this.isEditclientStateswiseBillingDetail = false;
    this.clientStateswiseBillingDetail = { id: 0 };
  }

  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('clientdetail/', row.id, ((response): void => {

      this.isEdit = true;
      this.client = response;

      if (this.isscroll === false) {

        window.scroll(0, 100);

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
  onActionEditClickStates(row): void {

    this.isEditclientStateswiseBillingDetail = false;
    this.db.show('clientstateswisebillingdetail/', row.id, ((response): void => {

      this.isEditclientStateswiseBillingDetail = true;
      this.clientStateswiseBillingDetail = response;

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
    this.db.update('clientdetail/', this.client.id, this.client, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  clientsave(): void {

    // this.user.profilepic=this.user.profilepic[0];
    this.db.store('clientdetail/', this.client, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
     // this.client = { id: 0, feeslabtype: '', fee_slab: [] };


    }));

  }
  showhideclient(x, y): void {
    if (this.ishideshowclient === false && this.isscroll === false) {
      //this.isEdit = false;
      this.ishideshowclient = true;
      window.scrollBy(x, y);

    } else {
      this.ishideshowclient = false;
    }

  }
  showhide(): void {
    if (this.ishideshow === false) {

      this.ishideshow = true;
      // window.scrollTo(3000, 3000);

    }


  }

  // addfeeslab(isupdate): void {
  //   const numbers = /^[0-9]+$/;
  //   const lastAmount = 0;

  //   if (isupdate == 1) {

  //     const isPercentage = true;
  //     const Type = "%";
  //     if (this.client.feeslabtype == "Fixed") {
  //       isPercentage = false;
  //       Type = "Fixed";
  //     }


  //     if (this.isNumberorFloat($scope.fromfeesslab) && $scope.isNumberorFloat($scope.tofeesslab) && $scope.isNumberorFloat($scope.amt)) {
  //       if ($scope.fromfeesslab < $scope.tofeesslab) {
  //         if ($scope.client.fee_slab.length > 0) {
  //           angular.forEach($
  //             .client.fee_slab, function (value) {


  //             //  alert(value.toSlab);
  //             lastAmount = value.toSlab;

  //           });
  //         } else {
  //           lastAmount = -1;
  //         }

  //         //alert(lastAmount);
  //         if ($scope.fromfeesslab > lastAmount) {
  //           //alert('done');
  //           $scope.client.fee_slab.push({ fromSlab: $scope.fromfeesslab, toSlab: $scope.tofeesslab, AmountorPercentage: $scope.amt, type: Type, isPercentage: isPercentage });


  //         } else {
  //           alert('From Fees slab should be greater than 0 and last To-Fees Slab');
  //         }
  //       } else {
  //         alert('To Fees slab should be greater than From Fees Slab');
  //       }
  //     } else {
  //       alert('Wrong Input Only Numbers Allow');
  //     }






  //   } else {

  //     var isPercentage = true;
  //     var Type = "%";
  //     if ($scope.newclient.feeslabtype == "Fixed") {
  //       isPercentage = false;
  //       Type = "Fixed";
  //     }


  //     if ($scope.isNumberorFloat($scope.fromfeesslab) && $scope.isNumberorFloat($scope.tofeesslab) && $scope.isNumberorFloat($scope.amt)) {
  //       if ($scope.fromfeesslab < $scope.tofeesslab) {

  //         angular.forEach($scope.feeslab, function (value) {


  //           lastAmount = value.to;

  //         })

  //         if ($scope.fromfeesslab > lastAmount) {

  //           $scope.feeslab.push({ from: $scope.fromfeesslab, to: $scope.tofeesslab, amt: $scope.amt, type: Type, ispercentage: isPercentage });


  //         } else {
  //           alert('From Fees slab should be greater than 0 and last To-Fees Slab');
  //         }
  //       } else {
  //         alert('To Fees slab should be greater than From Fees Slab');
  //       }
  //     } else {
  //       alert('Wrong Input Only Numbers Allow');
  //     }
  //   }
  // }


}
