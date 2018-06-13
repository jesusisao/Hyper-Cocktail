import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private static clickedRowindex: number;
  private static readonly defaultRowNum: number = 8; // 初期表示する行数
  public rows: TodoListRow[] = []; // ここに表の中身の値が配列として保持される。

  // newrowを使用する時はObject.assignでコピーして使うこと。そうでないと参照渡しになっちゃう。
  // tslint:disable-next-line:max-line-length
  private readonly newrow: TodoListRow = { id: 0, task_name: '', description: '', status: '0', is_deleted: '', created_at: '', updated_at: '' };

  constructor(private cd: ChangeDetectorRef, private http: Http) { }

  ngOnInit() {
    TodoListComponent.clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし

    this.http.get('/todolist', {
      params: {}
    })
      .pipe(map(res => res.json()))
      .subscribe(
        res => {
          const resArray: any[] = res; // まず配列に突っ込む
          resArray.forEach((json) => {
            this.rows.push({
              id: json.id,
              task_name: json.task_name,
              description: json.description,
              status: json.status,
              is_deleted: json.is_deleted,
              created_at: this.datetimeToYYYYMMdd(json.created_at),
              updated_at: this.datetimeToYYYYMMdd(json.updated_at)
            });
          });
          // 指定行未満の場合は空欄行の追加
          if (this.rows.length < TodoListComponent.defaultRowNum) {
            const spaceRowNum: number = TodoListComponent.defaultRowNum - this.rows.length;
            for (let i = 0; i < spaceRowNum; i++) {
              this.rows.push(Object.assign({}, this.newrow));
            }
          }
        },
        err => {
          console.error(err);
        }
      );

  }

  // MySQLのdatetimeをYYYY/MM/DDに変更する。
  private datetimeToYYYYMMdd(dt: string): string {
    const YYYY = dt.slice(0, 4);
    const MM = dt.slice(5, 7);
    const dd = dt.slice(8, 10);
    return YYYY + '/' + MM + '/' + dd;
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.push(Object.assign({}, this.newrow));
      return;
    }
    this.rows.splice(TodoListComponent.clickedRowindex - 1, 0, Object.assign({}, this.newrow));
  }

  removeButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.pop();
      return;
    }
    this.rows.splice(TodoListComponent.clickedRowindex - 1, 1);
    this.cd.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError回避のため
  }

  debugButtonClicked() {
    console.log(this.rows);
  }

  postButtonClicked() {
    const sendRows: TodoListRow[] = [];
    this.rows.forEach(val => {
      // 適切じゃない行はここではじく
      if (val.task_name.trim() !== '') {
        sendRows.push(Object.assign({}, val));
      }
    });
    this.http.post('/todolist', sendRows)
      .subscribe(
        res => {
          console.log('OK.');
        },
        err => {
          console.log('NG.');
        }
      );
  }

  clickedRowindexUpdate(index: number) {
    TodoListComponent.clickedRowindex = index;
  }

  doEditTheLastRow(): boolean {
    if (TodoListComponent.clickedRowindex === undefined) {
      return true;
    } else if (TodoListComponent.clickedRowindex >= this.rows.length) {
      return true;
    }
    return false;
  }
}

export interface TodoListRow {
  id: number;
  task_name: string;
  description: string;
  status: string;
  is_deleted: string;
  created_at: string;
  updated_at: string;
}
