import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-screen-of-details',
  templateUrl: './input-screen-of-details.component.html',
  styleUrls: ['./input-screen-of-details.component.scss']
})
export class InputScreenOfDetailsComponent implements OnInit {

  static rowindex: number; // 初期値0
  rows: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnInit() {
  }

  // 最後に選択した行番号rowindexを持っておいて、そいつを基準に挿入したり削除したりすればいい

  addButtonClicked() {
    if (InputScreenOfDetailsComponent.rowindex === undefined) {
      this.rows.push(5);
    } else {
      console.log(InputScreenOfDetailsComponent.rowindex);
      this.rows.splice(InputScreenOfDetailsComponent.rowindex, 0, 9);
      console.log(this.rows);
    }
  }

  removeButtonClicked() {
    this.rows.pop();
  }

  rowindexUpdate(index: number) {
    InputScreenOfDetailsComponent.rowindex = index;
    console.log(InputScreenOfDetailsComponent.rowindex);
  }

}
