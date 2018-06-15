import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoListRow, TodoList } from '@app/class/todolist';
import { TodolistService } from '@app/service/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private static clickedRowindex: number;
  private static readonly defaultRowNum: number = 8; // 初期表示する行数
  public rows: TodoList[] = []; // ここに表の中身の値が配列として保持される。

  constructor(
    private cd: ChangeDetectorRef,
    private todolistService: TodolistService
  ) { }

  ngOnInit() {
    TodoListComponent.clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし

    this.todolistService.getReqTodoList()
      .subscribe(
        res => {
          const resRowArray: any[] = res; // まず配列に突っ込む
          resRowArray.forEach((resRow) => {
            this.rows.push(new TodoList(resRow));
          });
          // 指定行未満の場合は空欄行の追加
          if (this.rows.length < TodoListComponent.defaultRowNum) {
            const spaceRowNum: number = TodoListComponent.defaultRowNum - this.rows.length;
            for (let i = 0; i < spaceRowNum; i++) {
              this.rows.push(TodoList.getBlankRow());
            }
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.push(TodoList.getBlankRow());
      return;
    }
    this.rows.splice(TodoListComponent.clickedRowindex - 1, 0, TodoList.getBlankRow());
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
    this.rows.forEach(row => {
      // 適切じゃない行はここではじく
      if (row.task_name.trim() !== '') {
        sendRows.push(Object.assign({}, row));
      }
    });
    this.todolistService.postReqTodoList(sendRows)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.error(err);
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
