import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-input-screen-of-details2',
  templateUrl: './input-screen-of-details2.component.html',
  styleUrls: ['./input-screen-of-details2.component.scss']
})

export class InputScreenOfDetails2Component implements OnInit {

  static clickedRowindex: number;
  private readonly defaultRowNum: number = 8; // 初期表示する行数

  rows: Row[] = []; // ここに表の中身の値が配列として入る
  // newrowを使用する時はObject.assignでコピーして使うこと。そうでないと参照渡しになっちゃう。
  newrow: Row = { columnA: '', columnB: 0, columnC: '', columnD: '' };

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    InputScreenOfDetails2Component.clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし
    for (let i = 0; i < this.defaultRowNum; i++) {
      this.rows.push(Object.assign({}, this.newrow));
    }
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.push(Object.assign({}, this.newrow));
      return;
    }
    this.rows.splice(InputScreenOfDetails2Component.clickedRowindex - 1, 0, Object.assign({}, this.newrow));
  }

  removeButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.pop();
      return;
    }
    this.rows.splice(InputScreenOfDetails2Component.clickedRowindex - 1, 1);
    this.cd.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError回避のため
  }

  debugButtonClicked() {
    console.log(this.rows);
  }

  clickedRowindexUpdate(index: number) {
    InputScreenOfDetails2Component.clickedRowindex = index;
    console.log(InputScreenOfDetails2Component.clickedRowindex);
  }

  doEditTheLastRow(): boolean {
    if (InputScreenOfDetails2Component.clickedRowindex === undefined) {
      return true;
    } else if (InputScreenOfDetails2Component.clickedRowindex >= this.rows.length) {
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
