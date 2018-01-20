import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-screen-of-details',
  templateUrl: './input-screen-of-details.component.html',
  styleUrls: ['./input-screen-of-details.component.scss']
})
export class InputScreenOfDetailsComponent implements OnInit {

  static clickedRowindex: number;
  rows: Row[] = [];
  newrow: Row = NEWROW;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.rows.push(this.newrow);
    }
  }

  addButtonClicked() {
    if (InputScreenOfDetailsComponent.clickedRowindex === undefined) {
      this.rows.push(this.newrow);
      return;
    }
    this.rows.splice(InputScreenOfDetailsComponent.clickedRowindex - 1, 0, { columnA: '', columnB: 1000, columnC: '', columnD: '' });
    console.log('通過チェック');
  }

  removeButtonClicked() {
    if (InputScreenOfDetailsComponent.clickedRowindex === undefined) {
      this.rows.pop();
      return;
    }
    this.rows.splice(InputScreenOfDetailsComponent.clickedRowindex - 1, 1);
    console.log('通過チェック');
  }

  rowindexUpdate(index: number) {
    InputScreenOfDetailsComponent.clickedRowindex = index;
    console.log(InputScreenOfDetailsComponent.clickedRowindex);
  }

}

export interface Row {
  columnA: string;
  columnB: number;
  columnC: string;
  columnD: string;
}

export const NEWROW: Row = { columnA: '', columnB: 1000, columnC: '', columnD: '' };
