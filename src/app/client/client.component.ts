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
  clientStateswiseBillingDetail = { client_detail_id: 0 };
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

          this.onActionEditClick(data); this.showhide();
          break;

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
    this.client = { id: 0, feeslabtype: '', fee_slab: [] };
  }
  backstate(): void {
    this.isEditclientStateswiseBillingDetail = false;
    this.clientStateswiseBillingDetail = { client_detail_id: 0 };
  }
  remove(idx, isupdate): void {

    if (isupdate === 0) {

      this.feeslab.splice(idx, 1);
    } else {

      this.client.fee_slab.splice(idx, 1);
    }
  };

  onActionEditClick(row): void {

    debugger;
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
  clientStateswiseBillingDetailsave(): void {

    this.clientStateswiseBillingDetail.client_detail_id = this.client.id;
    // this.user.profilepic=this.user.profilepic[0];
    this.db.store('clientstateswisebillingdetail/', this.clientStateswiseBillingDetail, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      // this.client = { id: 0, feeslabtype: '', fee_slab: [] };


    }));

  }
  clientStateswiseBillingDetailupdate(): void {
    this.db.update('clientstateswisebillingdetail/', { 'client_detail_id': this.client.id },
      this.clientStateswiseBillingDetail, ((response): void => {

        this.LoadData();
        this.db.showMessage('Updated Successfully');

      }));
  }

  showhideclient(x, y): void {
    if (this.ishideshowclient === false && this.isscroll === false) {
      // this.isEdit = false;
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
  isNumberorFloat(val): boolean {

    val = Number(val);
    return Number(val) === val;
  };
  addfeeslab(isupdate): void {

    const numbers = /^[0-9]+$/;
    let lastAmount = 0;

    if (isupdate === 1) {

      let isPercentage = true;
      let Type = '%';
      if (this.client.feeslabtype === 'Fixed') {
        isPercentage = false;
        Type = 'Fixed';
      }


      if (this.isNumberorFloat(this.fromfeesslab) && this.isNumberorFloat(this.tofeesslab) && this.isNumberorFloat(this.amt)) {
        if (this.fromfeesslab < this.tofeesslab) {
          if (this.client.fee_slab.length > 0) {
            for (const i in this.client.fee_slab) {
              if (this.client.fee_slab[i]) {
                const value = this.client.fee_slab[i];

                //  alert(value.toSlab);
                lastAmount = value.toSlab;
              }
            }
          } else {
            lastAmount = -1;
          }

          // alert(lastAmount);
          if (this.fromfeesslab > lastAmount) {
            // alert('done');
            this.client.fee_slab.push({
              fromSlab: this.fromfeesslab,
              toSlab: this.tofeesslab, AmountorPercentage: this.amt,
              type: Type, isPercentage: isPercentage
            });


          } else {
            alert('From Fees slab should be greater than 0 and last To-Fees Slab');
          }
        } else {
          alert('To Fees slab should be greater than From Fees Slab');
        }
      } else {
        alert('Wrong Input Only Numbers Allow');
      }






    } else {

      let isPercentage = true;
      let Type = '%';
      if (this.newclient.feeslabtype === 'Fixed') {
        isPercentage = false;
        Type = 'Fixed';
      }


      if (this.isNumberorFloat(this.fromfeesslab) && this.isNumberorFloat(this.tofeesslab) && this.isNumberorFloat(this.amt)) {
        if (this.fromfeesslab < this.tofeesslab) {

          for (const fs in this.feeslab) {
            if (this.feeslab[fs]) {
              const value = this.feeslab[fs];


              lastAmount = value.to;
            }
          }
          if (this.fromfeesslab > lastAmount) {

            this.feeslab.push({ from: this.fromfeesslab, to: this.tofeesslab, amt: this.amt, type: Type, ispercentage: isPercentage });


          } else {
            alert('From Fees slab should be greater than 0 and last To-Fees Slab');
          }
        } else {
          alert('To Fees slab should be greater than From Fees Slab');
        }
      } else {
        alert('Wrong Input Only Numbers Allow');
      }
    }
  }





}
