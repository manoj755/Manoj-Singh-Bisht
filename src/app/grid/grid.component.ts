import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  // Input: ['data','CustomBtnText','isCustomBtn','hidecol','showcol','canEdit','canDelete',],
  // Output:['editing','deleting','customevent'],
})
export class GridComponent implements OnInit {

  itemPerPage = 5;
  _canEdit = true;
  _canDelete = true;
  _isCustomBtn = false;
  _customBtnText = 'Custom';
  _data: any = [];
  _hidecol = [];
  _showcol = [];

  @Input()
  set CustomBtnText(data: string) {

    if (data) {
      this._customBtnText = data;
    } else {
      this._customBtnText = 'Custom';
    }
  }
  @Input()
  set isCustomBtn(data: boolean) {

    if (data) {
      this._isCustomBtn = data;
    }
  }
  @Input()
  set hidecol(data: any) {

    if (data) {
      this._hidecol = data;
    }
  }

  @Input()
  set showcol(data: any) {

    if (data && data.constructor === [].constructor) {
      this._showcol = data;
    }
  }
  @Input()
  set data(data: any) {
    if (isArray(data)) {
      this._data = data;
    }

  }

  @Input()
  set canEdit(data: boolean) {
    this._canEdit = data;


  }

  @Input()
  set canDelete(data: boolean) {

    this._canDelete = data;


  }
  @Output() editing = new EventEmitter();
  @Output() customevent = new EventEmitter();
  @Output() deleting = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }

  custom_event(data: any) {
    this.customevent.emit(data);
  }

  trackByFn(index: number, item: object) {
    // return item.id;
  }

  edit(data: any) {
    this.editing.emit(data);
  }

  delete(data: any) {
    if (confirm('Are you sure?')) {
      this.deleting.emit(data);
    }
  }

  transform(value): any {
    const keys = [];
    for (const key in value) {
      if (this._showcol.includes(key) || this._showcol.length === 0) {
        keys.push({ key: this.CamelCase(key), value: value[key] });
      }
    }
    return keys;
  }


  CamelCase(input) {

    let words = input.replace(/((?:[A-Z]+))/g, '!!$&').split('!!');
    for (let i = 0, len = words.length; i < len; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    input = words.join(' ');
    words = input.split('_');
    for (let i = 0, len = words.length; i < len; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ').trim();
  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
}
