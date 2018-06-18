import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoListRow, TodoList } from '@app/class/todolist';
import { TodolistService } from '@app/service/todolist.service';
import { Validators, FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private static readonly defaultRowNum: number = 8; // 初期表示する行数
  private clickedRowindex: number;
  public rows: TodoList[] = []; // ここに表の中身の値が配列として保持される。

  public rowsFormGroup: FormGroup = this.fb.group({
    tasks: this.fb.array([
    ])
  });

  public pointerEvents: string;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private todolistService: TodolistService
  ) { }

  ngOnInit() {
    this.clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし
    this.initRows();
    const control = <FormArray>this.rowsFormGroup.controls['tasks'];
    control.push(this.initNewTask());
  }

  initNewTask(): FormGroup {
    return this.fb.group({
      id: [0],
      task_name: [''],
      description: [''],
      status: ['0'],
      is_deleted: [''],
      created_at: [''],
      updated_at: ['']
    });
  }

  private async initRows() {
    this.todolistService.getReqTodoList()
      .subscribe(
        res => {
          this.rows = [];
          const resRowArray: any[] = res; // まず配列に突っ込む
          resRowArray.forEach((resRow) => {
            this.rows.push(new TodoList(resRow));
          });
          this.addRowsForAppearance(this.rows.length);
          return Promise.resolve();
        },
        err => Promise.reject(err)
      );
  }

  private addRowsForAppearance(nowLength: number) {
    // 指定行未満の場合は空欄行を追加する。
    if (nowLength >= TodoListComponent.defaultRowNum) {
      // 指定行より大きいなら何もしない。
      return;
    }
    const spaceRowNum: number = TodoListComponent.defaultRowNum - nowLength;
    for (let i = 0; i < spaceRowNum; i++) {
      this.rows.push(TodoList.getBlankRow());
    }
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.push(TodoList.getBlankRow());
      return;
    }
    this.rows.splice(this.clickedRowindex - 1, 0, TodoList.getBlankRow());
  }

  hideButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.rows.pop();
      return;
    }
    this.rows.splice(this.clickedRowindex - 1, 1);
    this.cd.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError回避のため
  }

  debugButtonClicked() {
    console.log(this.rows);
    console.log('clickedRowindex:' + this.clickedRowindex);
    if (this.rows[this.clickedRowindex - 1] !== undefined) {
      console.log('clickedtask_name:' + this.rows[this.clickedRowindex - 1].task_name);
    }
  }

  async refreshButtonClicked() {
    this.pointerEvents = 'none';
    await this.initRows();
    this.pointerEvents = 'auto'; // 完了時に呼ばれる
  }

  postButtonClicked() {
    // style="pointer-events:none;"を一旦付与して、連打クリックをできなくする。
    this.pointerEvents = 'none';
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
          // 再読込作業が必要。そうでないと1度挿入した行もid=0のままのため、
          // 2度目挿入する行との見分けがつかなくなる。
          this.initRows();
        },
        err => console.error(err),
        () => this.pointerEvents = 'auto' // 完了時に呼ばれる
      );
  }

  deleteButtonClicked() {
    if (this.rows[this.clickedRowindex - 1] === undefined) { return; } // 連続でクリックしたときのための処理
    this.pointerEvents = 'none';
    const deleteRowId: string = this.rows[this.clickedRowindex - 1].id + '';
    this.todolistService.deleteReqTodoList(deleteRowId)
      .subscribe(
        res => {
          console.log(res);
          // 画面の行削除。再読込にすると今のカーソルの行から移動してしまうため。
          this.rows.splice(this.clickedRowindex - 1, 1);
          this.cd.detectChanges();
        },
        err => console.error(err),
        () => this.pointerEvents = 'auto' // 完了時に呼ばれる
      );
  }

  clickedRowindexUpdate(index: number) {
    this.clickedRowindex = index;
  }

  doEditTheLastRow(): boolean {
    if (this.clickedRowindex === undefined) {
      return true;
    } else if (this.clickedRowindex >= this.rows.length) {
      return true;
    }
    return false;
  }
}
