import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'app/db.service';

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

  candidate_id = 0;
  @Input()
  set set_candidate_id(candidate_id: number) {
    this.candidate_id = candidate_id;
    if (candidate_id > 0) {
      this.GetNotes();
    }
  }
  constructor(private db: DBService) { }

  ngOnInit() {

  }

  CandidateNotesave(): void {

    this.CandidateNote.candidate_id = this.candidate_id;
    this.db.store('candidatenote/', this.CandidateNote, (response): void => {

      this.db.addmessageandremove('Added Successfully');

      this.message = {};
      this.CandidateNote = { candidate_id: 0 };
      this.GetNotes();

    });

  };
  GetNotes(): void {
    this.gridCandidateNotes = [];
    this.db.list('candidatenote/', { candidate_id: this.candidate_id }, (response): void => {



      try {
        this.pp = this.db.rooturi + 'profile/';
        this.gridCandidateNotes = response;
      } catch (e) {
        console.info(e);
      }

    });

  };

}
