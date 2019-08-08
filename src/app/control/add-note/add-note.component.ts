import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'app/db.service';
declare var $: any;

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  gridCandidateNotes = [];
  CandidateNote = { candidate_id: 0 };
  message: any;
  notes = [];
  pp = '';
  updated_id: any;

  candidate_id = 0;
  @Input()
  set set_candidate_id(candidate_id: number) {
    debugger;
    //$('#notesdetail').modal('show')
    this.candidate_id = candidate_id;
    this.updated_id = candidate_id;
    if (candidate_id > 0) {
      //this.setNotes();
      this.GetNotes();

      // $('#notesdetail').modal('show');

    }
  }
  constructor(private db: DBService) { }

  ngOnInit() {

  }
  setNotes(): void {
    debugger;
    this.candidate_id = this.candidate_id;
    $('#notesdetail').modal('show');
  }
  CandidateNotesave(): void {
    // if (!$('.validate').validate('#notesdetail')) {
    //   //  $.fn.showMessage('Please fill values');
    //     return;
    //   }
    debugger;

    this.CandidateNote.candidate_id = this.updated_id;
    this.db.store('candidatenote/', this.CandidateNote, (response): void => {

      this.db.addmessageandremove('Added Successfully');

      this.message = {};
      this.CandidateNote = { candidate_id: 0 };
      this.GetNotes();

    });

  };
  GetNotes(): void {
    debugger;
    this.gridCandidateNotes = [];
    // $('#notesdetail').modal('show')
    this.db.list('candidatenote/', { candidate_id: this.candidate_id }, (response): void => {

      debugger;

      try {
        this.pp = this.db.rooturi + 'profile/';
        this.gridCandidateNotes = response;
      } catch (e) {
      }

    });

  };

}
