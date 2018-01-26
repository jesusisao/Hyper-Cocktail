import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-input-screen-of-details',
  templateUrl: './input-screen-of-details.component.html',
  styleUrls: ['./input-screen-of-details.component.scss']
})

export class InputScreenOfDetailsComponent implements OnInit {

  static clickedRowindex: number;
  rows: Row[] = [];
  // newrowを使用する時はObject.assignでコピーして使うこと。そうでないと参照渡しになっちゃう。
  newrow: Row = { columnA: '', columnB: 0, columnC: '', columnD: '' };

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    InputScreenOfDetailsComponent.clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし
    for (let i = 0; i < 6; i++) {
      this.rows.push(Object.assign({}, this.newrow));
    }
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.push(Object.assign({}, this.newrow));
      return;
    }
    this.rows.splice(InputScreenOfDetailsComponent.clickedRowindex - 1, 0, Object.assign({}, this.newrow));
  }

  removeButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.pop();
      return;
    }
    this.rows.splice(InputScreenOfDetailsComponent.clickedRowindex - 1, 1);
    this.cd.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError回避のため
  }

  debugButtonClicked() {
    console.log(this.rows);
  }

  clickedRowindexUpdate(index: number) {
    InputScreenOfDetailsComponent.clickedRowindex = index;
    console.log(InputScreenOfDetailsComponent.clickedRowindex);
  }

  doEditTheLastRow(): boolean {
    if (InputScreenOfDetailsComponent.clickedRowindex === undefined) {
      return true;
    } else if (InputScreenOfDetailsComponent.clickedRowindex >= this.rows.length) {
      return true;
    }
    return false;
  }
}

export interface Row {
  columnA: string;
  columnB: number;
  columnC: string;
  columnD: string;
}
