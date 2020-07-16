import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public Editor = ClassicEditor;
  title = 'app';
  feeslab = [];
  client = { id: 0, feeslabtype: '', fee_slab: [], process: {}, location: {}, addresses: [] };
  fromfeesslab = 0;
  amt = 0;
  lastAmount: any;
  department: {};
  process = [];
  address = {};
  location = [];
  hideclient: false;
  angular: [];
  newclient: any;
  isPercentage: false;
  isEdit = false;
  isEditstatewise = false;
  item: any = {};
  tofeesslab = 0;
  stateobj = {};
  locations: any;
  loc = false;
  // gridclientStateswiseBillingDetail: any;
  states: any;
  check = true;
  count = 0;
  errors = {};
  isscroll = false;
  ishideshow = false;
  ishideshowclient = false;
  showdepartment = false;
  showclient = true;
  updateid: any;
  // feeslab: any;
  isEditclientStateswiseBillingDetail = false;
  clientStateswiseBillingDetail = { id: 0, client_detail_id: 0 };
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
      headerName: 'Delete', field: 'id',  suppressMenu: true,
      suppressSorting: true, suppressHorizontalScroll: true,
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
    {
      headerName: 'Client/Department', field: 'is_client',
      valueGetter: function (params) {
        if (params.data.is_client === 1) {
          return 'Client';
        } else {
          return 'Department';
        }
      },
      sortable: true, filter: true
    },
    // { headerName: 'Invoice Currency', field: 'invoice_currency', sortable: true, filter: true },
  ];
  columnDefs2 = [
    {
      headerName: 'Delete', field: 'id', width: 270, suppressMenu: true,
      suppressSorting: true, suppressHorizontalScroll: true,
      template:
        `<button type='button' data-action-type='editstate' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='deletestate' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'State Name', field: 'state_name', width: 400, sortable: true, filter:
        true, headerCheckboxSelection: true, checkboxSelection: true
    },
    { headerName: 'Gst', width: 270, field: 'gst', sortable: true, filter: true },
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
    this.loadlocation();
  }

  public showdepartmentfun(event): void {
    debugger;
    const newval = event.target.value;
    if (newval === 0) {
      //if (this.showdepartment === false) {
      this.showdepartment = true;
      this.showclient = false
      //}
    }
    else {
      this.showclient = true
    }
  }

  loadlocation(): void {
    // this.locationtype = 'location';
    this.locations = [];
    this.db.list('location', null, (response): void => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }
    });
  };
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

          this.onActionEditClick(data); this.showhideclient('x', 'y');
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
    debugger;
    if (confirm('Are you sure?')) {
      this.db.destroy('clientdetail/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );
    }
    console.log('View action clicked', data);
  }
  public onActionDeleteClickStates(data: any) {

    if (confirm('Are you sure?')) {
      this.db.destroy('clientstateswisebillingdetail/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
        this.loadstatewisedetail();
      })
      );
    }
    console.log('View action clicked', data);

  }


  back(): void {
    this.isEdit = false;
    this.client = { id: 0, feeslabtype: '', fee_slab: [], process: [], location: [], addresses: [] };
  }
  backstate(): void {
    this.isEditclientStateswiseBillingDetail = false;
    this.clientStateswiseBillingDetail = { id: 0, client_detail_id: 0 };
  }
  remove(idx, isupdate): void {

    if (isupdate === 0) {

      this.feeslab.splice(idx, 1);
    } else {

      this.client.fee_slab.splice(idx, 1);
    }
  };

  onActionEditClick(row): void {


    this.isEdit = false;
    this.db.show('clientdetail/', row.id, ((response): void => {

      this.isEdit = true;
      this.client = response;
      const tags = [
      ];
      const processsetarr = this.client.process.toString().split(',');
      for (const k in processsetarr) {
        if (processsetarr[k]) {
          tags.push(processsetarr[k]);
        }
      }

      this.client.process = tags;
      debugger;
      const loc = [];
      const locationstr = this.client.location.toString().split(',');
      for (const k in locationstr) {
        if (locationstr[k]) {
          loc.push(locationstr[k]);
        }
      }

      this.client.location = loc;

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
    debugger;
    // if (typeof this.client.location !== 'string') {
    //const locstr
    this.loc = true;
    const locations = this.client.location;

    let locationstr = '';
    for (const j in locations) {
      if (locations[j].$ngOptionLabel) {
        locationstr += locations[j].$ngOptionLabel + ',';
      }

    }
    if (locationstr == '') {
      for (const j in locations) {
        if (locations[j]) {
          locationstr += locations[j] + ',';
        }
      }
    }
    // } else if (typeof this.client.location == 'string') {
    //   let loc = new Array();
    //   const locations = this.client.location;
    //   loc = locations.toString().split(',');
    //   let locationstr = '';
    //   for (const j in loc) {
    //     if (loc[j].$ngOptionLabel) {
    //       locationstr += loc[j].$ngOptionLabel + ',';
    //     }

    //   }
    this.client.location = locationstr;
    //}
    if (this.check == true) {
      this.check = false;
      const processes = this.client.process;
      let processstr = '';
      for (const i in processes) {
        if (processes[i]) {
          processstr += processes[i] + ',';
        }
      }
      this.client.process = processstr;
    } else if (this.check === false) {
      let temp = new Array();
      const string = this.client.process;
      temp = string.toString().split(',');
      const process2 = temp;
      let processstr2 = '';

      for (const j in process2) {
        if (process2[j]) {
          processstr2 += ',' + process2[j];
        }

      }
      //this.count++;
      this.client.process = processstr2;
    }
    // else if (this.count == 1) {
    //   const process3 = this.client.process;
    //   let processstr3 = '';

    //   for (const j in process3) {
    //     if (process3[j]) {
    //       processstr3 += ',' + process3[j];
    //     }

    //   }
    //   //this.count++;
    //   this.client.process = processstr3;
    // }
    this.db.update('clientdetail/', this.client.id, this.client, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  clientsave(): void {
    // if(this.hideclient === false){
    // this.client.is_client = '1';
    // }
    // this.user.profilepic=this.user.profilepic[0];
    debugger;
    const locations = this.client.location;
    let locationstr = '';
    for (const j in locations) {
      if (locations[j].$ngOptionLabel) {
        locationstr += locations[j].$ngOptionLabel + ',';
      }

    }
    this.client.location = locationstr;
    const processes = this.client.process;
    let processstr = '';
    for (const i in processes) {
      if (processes[i]) {
        processstr += processes[i] + ',';
      }
    }
    this.client.process = processstr;
    //const tpost = this.client;
    this.db.store('clientdetail/', this.client, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      // this.client = { id: 0, feeslabtype: '', fee_slab: [] };


    }));

  }
  // departmentsave(): void {

  //   // this.user.profilepic=this.user.profilepic[0];
  //   this.db.store('departmentsave/', this.client, ((response): void => {

  //     this.db.showMessage('Added Successfully');
  //     this.LoadData();
  //     // this.client = { id: 0, feeslabtype: '', fee_slab: [] };


  //   }));

  // }
  clientStateswiseBillingDetailsave(): void {
  debugger;
    this.clientStateswiseBillingDetail.client_detail_id = this.client.id;
    // this.user.profilepic=this.user.profilepic[0];
    this.db.store('clientstateswisebillingdetail/', this.clientStateswiseBillingDetail, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.loadstatewisedetail();
      // this.client = { id: 0, feeslabtype: '', fee_slab: [] };


    }));

  }
  clientStateswiseBillingDetailupdate(): void {
    this.clientStateswiseBillingDetail.client_detail_id = this.client.id;
    this.db.update('clientstateswisebillingdetail/', this.clientStateswiseBillingDetail.id,
      this.clientStateswiseBillingDetail, ((response): void => {
        this.loadstatewisedetail();
        this.LoadData();
        this.db.showMessage('Updated Successfully');

      }));
  }

  showhideclient(x, y): void {

    if (this.ishideshowclient === false && this.isscroll === false) {
      // this.isEdit = false;
      this.ishideshow = true;
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
    else {
      this.ishideshow = false;
    }


  }
  isNumberorFloat(val): boolean {

    val = Number(val);
    return Number(val) === val;
  };
  // ClientAddSave(isnotnull): void {
  //   debugger;
  //   if (isnotnull === 1) {
  //     this.client.addresses.push(
  //       {
  //         location: this.location,
  //         address: this.address
  //       }
  //     );
  //     debugger;
  //   }
  // }
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
