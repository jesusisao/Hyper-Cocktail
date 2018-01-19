import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-screen-of-details',
  templateUrl: './input-screen-of-details.component.html',
  styleUrls: ['./input-screen-of-details.component.scss']
})
export class InputScreenOfDetailsComponent implements OnInit {

  rows: number[] = [0, 0, 0, 0, 0];
  rowindex: number;

  constructor() { }

  ngOnInit() {
  }

  // 最後に選択した行番号rowindexを持っておいて、そいつを基準に挿入したり削除したりすればいい

  addButtonClicked() {
    this.rows.push(0);
  }

  removeButtonClicked() {
    this.rows.pop();
  }

  rowindexUpdate(e) {
    console.log(e.target);
  }

}
