import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {


  sendmail = { to: '', cc: '', bcc: '', subject: '', message: '', atj_id: 0 };
  gi = { billablectc: 0, billableamount: 0, billpercentage: 0, atj_id: 0, doj: 0, designation: {}, location: {} };
  acceptedinvoices: any;
  accepted = { invoiceid: 0, invoice_item_id: 0, invoice_id: 0, atj_id: 0, gst: {}, tds: {}, servicecharge: {} };
  rejected = { invoice_id: 0, atj_id: 0, reason: {} };
  dataedit = {
    billable_ctc: 0, billabl_eamount: 0, billable_amount: 0, billingpercentage: 0, invoiceid: 0, invoice_item_id: 0,
    doj: {}, candidate_designation: {}, billing_location: {}
  };
  joinedcandidates = [];
  invoicesinprocessloading: any;
  invoicesinprocess = [];
  inprocesspaytovendorloading: any;
  inprocessrpaytovendor: any;
  rejectedpaytoprloading: any;
  rejectedpaytopr: any;
  paidtoprloading: any;
  paidtopr: any;
  joinedcandidate: any;
  inprocessrpaytoprloading: any;
  inprocessrpaytopr: any;
  topay = true;
  rejectedinvoicesloading: any;
  rejectedinvoices: any;
  joinedcandidatesloading: any;
  applications = [];
  emailid = '';
  billingpercentage = 8.33;
  isShowVendor = false;
  billpercentage = 0;
  notinfeeslab = false;
  acceptedinvoicesloading: any;
  loadingfeeslab: any;



  paidtovendorloading = false;
  paidtovendor = [];
  rejectedpaytovendorloading = false;
  rejectedpaytovendor: any;


  sendtoclients: any;

  clients_gst_list: any;

  loadinvoicecandidate: any;

  invoiceurl = '';

  invoicehtml = '';

  editinvoiceid: any;
  invoice_item_id: any;
  accepteditem: any;
  constructor(public db: DBService) { }

  ngOnInit(): void {
    this.db.list('clientdetail/', { 'gi': 'rolecreating' }, ((response): void => {
      this.applications = response;
    }));
    this.inprocessrpaytoprfn();
    this.loadjoinedcandidates();
  }



  accepttopayvendor(item): void {
    if (!$('.validate').validate('#loginform')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }
    this.db.store('acceptpaytovendor', { invoiceid: item.invoiceid }, ((response): void => {
      alert('done');
      this.inprocessrpaytovendorfn();
    }));
  };
  rejecttopayvendor(item): void {
    this.db.store('rejectpaytovendor', { invoiceid: item.invoiceid }, ((response): void => {
      alert('done');
      this.inprocessrpaytovendorfn();
    }));
  };


  loadmailid(): void {
    const appid = document.getElementById('clientemailid').nodeValue;
    this.db.list('data/emailid', { app_id: appid }, ((response): void => {

      this.emailid = response;
    }));


  }


  openpopup(item, sOptionVal): void {
    // let invoice_id = item.invoice_id;

    this.editinvoiceid = item.invoice_id;
    this.invoice_item_id = item.invoice_item_id;
    this.accepteditem = item;
    //  let sOptionVal = item.selectedbox;

    const $selectedOption = $(sOptionVal);
    $selectedOption.modal('show');
    if (sOptionVal === '#editinvoice') {
      this.db.show('billingats/', this.editinvoiceid, ((response): void => {

        this.dataedit = response[0];
        console.log(this.dataedit);
      }));
    }
  };


  fetchfeesslab(): void {

    const data = this.joinedcandidate;
    data.billablectc = this.gi.billablectc;
    this.loadingfeeslab = true;
    this.db.list('getbillableamount/', data, ((response): void => {
      this.loadingfeeslab = false;
      const datain = response;
      if (datain.result === 'notinfeeslab') {

        this.notinfeeslab = true;
        this.gi.billableamount = 0;

      } else {
        this.notinfeeslab = false;
        this.gi.billableamount = datain.result;
      }

    }), ((response): void => {
      this.loadingfeeslab = false;
    }));
  }


  fetchfeesslabedit(): void {

    const data = this.joinedcandidate;
    data.billablectc = this.dataedit.billable_ctc;
    this.loadingfeeslab = true;
    this.db.list('getbillableamount/', data, ((response): void => {
      this.loadingfeeslab = false;
      const datain = response;
      if (datain.result === 'notinfeeslab') {

        this.notinfeeslab = true;
        this.dataedit.billabl_eamount = 0;

      } else {
        this.notinfeeslab = false;
        this.dataedit.billable_amount = datain.result;
      }

    }), ((response): void => {
      this.loadingfeeslab = false;
    }));
  }

  showbillablectc(): void {

    this.gi.billablectc = this.gi.billableamount * 100 / this.billingpercentage;
  };

  showbillablectcedit(): void {

    this.dataedit.billable_ctc = this.dataedit.billable_amount * 100 / this.billingpercentage;
  };


  showbillingamount(): void {
    this.gi.billableamount = this.gi.billablectc * this.billingpercentage / 100;
  };





  showbillingamountedit(): void {
    this.dataedit.billable_amount = this.dataedit.billable_ctc * this.billingpercentage / 100;
  };
  showpercentage(): void {
    this.gi.billablectc = this.gi.billableamount * 100 / this.gi.billpercentage;
    this.gi.billableamount = this.gi.billablectc * this.gi.billpercentage / 100;
  }

  showpercentagedataedit(): void {
    this.dataedit.billable_ctc = this.dataedit.billable_amount * 100 / this.billpercentage;
    this.dataedit.billable_amount = this.dataedit.billable_ctc * this.billpercentage / 100;
  }
  saveaccepted(): void {

    this.accepted.invoice_id = this.accepteditem.invoice_id;
    this.accepted.atj_id = this.accepteditem.atj_id;
    this.db.store('saveaccepted', this.accepted, ((response): void => {
      // this.db.generatecode(response);
      this.loadinprocess();
      // $('#myModal1').modal('close');
      $('#myModal1').modal('hide');


    }));
  };

  editinvoice(): void {
    if (!$('.validate').validate('#editinvoice')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }

    this.dataedit.invoiceid = this.editinvoiceid;
    this.dataedit.invoice_item_id = this.invoice_item_id;
    this.db.store('updateinvoice', this.dataedit, ((response): void => {
      $('#editinvoice').modal('hide');
      // alert('done');
    }));
  };
  saverejected(): void {

    this.rejected.invoice_id = this.accepteditem.invoice_id;
    this.rejected.atj_id = this.accepteditem.atj_id;
    this.db.store('saverejected', this.rejected, ((response): void => {

      $('#saverejected').modal('hide');

    }));
  }
  loadinprocess(): void {
    this.invoicesinprocessloading = true;
    this.db.list('inprocesscandidates', {}, ((response): void => {
      this.invoicesinprocessloading = false;
      this.invoicesinprocess = response;

    }));
  };
  loadjoinedcandidates(): void {
    this.joinedcandidatesloading = true;
    this.db.list('joinedcandidates', {}, ((response): void => {

      this.joinedcandidates = response;
      this.joinedcandidatesloading = false;

    }));




  };
  acceptedinvoicesfn(): void {
    this.acceptedinvoicesloading = true;
    this.db.list('acceptedinvoices', {}, ((response): void => {
      this.acceptedinvoicesloading = false;
      this.acceptedinvoices = response;


    }));
  };
  rejectedinvoicesfn(): void {
    this.rejectedinvoicesloading = true;
    this.db.list('rejectedinvoices', {}, ((response): void => {
      this.rejectedinvoicesloading = false;
      this.rejectedinvoices = response;

    }));
  };
  inprocessrpaytoprfn(): void {
    this.inprocessrpaytoprloading = true;
    this.db.list('inprocessrpaytopr', {}, ((response): void => {
      this.inprocessrpaytoprloading = false;
      this.inprocessrpaytopr = response;

    }));
  };

  paidtoprfn(): void {
    this.paidtoprloading = true;
    this.db.list('paidtopr', {}, ((response): void => {
      this.paidtoprloading = false;
      this.paidtopr = response;

    }));
  };
  rejectedpaytoprfn(): void {
    this.rejectedpaytoprloading = true;
    this.db.list('rejectedpaytopr', {}, ((response): void => {
      this.rejectedpaytoprloading = false;
      this.rejectedpaytopr = response;

    }));
  };
  inprocessrpaytovendorfn(): void {
    this.inprocesspaytovendorloading = true;
    this.db.list('inprocesspaytovendor', {}, ((response): void => {
      this.inprocesspaytovendorloading = false;
      this.inprocessrpaytovendor = response;

    }));
  };

  paidtovendorfn(): void {
    this.paidtovendorloading = true;
    this.db.list('paidtovendor', {}, ((response): void => {
      this.paidtovendorloading = false;
      this.paidtovendor = response;

    }));
  };
  rejectedpaytovendorfn(): void {
    this.rejectedpaytovendorloading = true;
    this.db.list('rejectedpaytovendor', {}, ((response): void => {
      this.rejectedpaytovendorloading = false;
      this.rejectedpaytovendor = response;

    }));
  };
  sendtoclientsfn(): void {
    this.sendtoclients.invoice = this.loadinvoicecandidate.invoice_id;
    this.sendtoclients.type = 'sendemail';
    this.db.list('invoiceuse', this.sendtoclients, ((response): void => {
      this.db.addmessageandremove('Sent Message');
    }));
  };



  generateinvoicesetlet(joinedcandidate): void {

    this.joinedcandidate = joinedcandidate;


    this.db.list('clientstateswisebillingdetail/', { 'client_detail_id': this.joinedcandidate.client_id }, ((response): void => {



      try {
        this.clients_gst_list = response;
      } catch (e) {
      }

    }), ((response): void => {
      // uthis.token=responsestatusText;
    }));
  };
  generateinvoicestore(): void {
    if (!$('.validate').validate('#myModal')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }
    console.log(this.gi);

    this.gi.atj_id = this.joinedcandidate.atj_id;
    this.db.store('generateinvoice', this.gi, function (): void {
      this.joinedcandidate.is_generated = !this.joinedcandidate.is_generated;

      $('.bss-example-modal-lg').modal('hide');
      this.db.addmessageandremove('Generated Successfully');
      this.loadjoinedcandidates();

    });
  };
  loadinvoice(joinedcandidate): void {
    this.loadinvoicecandidate = joinedcandidate;

    this.invoiceurl = this.db.rooturi + 'index.php/api/invoiceuse/?invoice=' +
      this.loadinvoicecandidate.invoice_id + '&token=' + this.db.token;

    this.invoicehtml = 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>';
    this.db.list('invoiceuse', {}, ((response): void => {
      this.invoicehtml = response;
    }));
  };

}
