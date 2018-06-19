import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoListRow, TodoList } from '@app/class/todolist';
import { TodolistService } from '@app/service/todolist.service';
import { Validators, FormGroup, FormArray, FormControl, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private static readonly _defaultRowNum: number = 8; // 初期表示する行数
  private _clickedRowindex: number;

  // 下記のような入れ子構造になっている。
  // FormGroup（全部）
  // └FormArray（やること1,やること2...）
  //   └FormGroup（id,task_name,description...）
  //     └FormControl（id）
  public rowsFormGroup: FormGroup = this.fb.group({
    tasks: this.fb.array([])
  });
  public controlOfTasks = <FormArray>this.rowsFormGroup.controls['tasks'];

  public pointerEvents: string;

  // FormBuilderはnewなFormGroupやらFormControlやらFormArrayやらを生成し、返してくれるシンタックスシュガー
  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private todolistService: TodolistService
  ) { }

  ngOnInit() {
    this._clickedRowindex = undefined; // ここで入れておかないと画面遷移後も値入りっぱなし
    this.initRows();
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  private initNewTaskForm(): FormGroup {
    return this.fb.group({
      id: [0],
      task_name: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      status: ['0', Validators.required],
      is_deleted: [''],
      created_at: [{ value: '', disabled: true }],
      updated_at: [{ value: '', disabled: true }]
    });
  }

  private getLoadedForm(row: TodoListRow): FormGroup {
    const task: FormGroup = this.initNewTaskForm();
    task.controls['id'].setValue(row.id);
    task.controls['task_name'].setValue(row.task_name);
    task.controls['description'].setValue(row.description);
    task.controls['status'].setValue(row.status);
    task.controls['is_deleted'].setValue(row.is_deleted);
    task.controls['created_at'].setValue(this.datetimeToYYYYMMdd(row.created_at));
    task.controls['updated_at'].setValue(this.datetimeToYYYYMMdd(row.updated_at));
    return task;
  }

  private async initRows() {
    this.todolistService.getReqTodoList()
      .subscribe(
        res => {
          this.clearFormArray(this.controlOfTasks); // クリア
          const resRowArray: any[] = res; // まず配列に突っ込む
          resRowArray.forEach((resRow) => {
            // ここでFormにもつっこむ
            this.controlOfTasks.push(this.getLoadedForm(<TodoListRow>resRow));
          });
          this.addRowsForAppearance(this.controlOfTasks.length);
          return Promise.resolve();
        },
        err => Promise.reject(err)
      );
  }

  // 引数が指定行未満の場合は空欄行を追加する。
  private addRowsForAppearance(nowLength: number) {
    if (nowLength < 0) { return; }
    if (nowLength >= TodoListComponent._defaultRowNum) { return; }
    const spaceRowNum: number = TodoListComponent._defaultRowNum - nowLength;
    for (let i = 0; i < spaceRowNum; i++) {
      this.controlOfTasks.push(this.initNewTaskForm());
    }
  }

  // MySQLのdatetimeをYYYY/MM/DDに変更する。
  private datetimeToYYYYMMdd(dt: string): string {
    if (dt.trim() === '') { return ''; }
    const YYYY = dt.slice(0, 4);
    const MM = dt.slice(5, 7);
    const dd = dt.slice(8, 10);
    return YYYY + '/' + MM + '/' + dd;
  }

  addButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.controlOfTasks.push(this.initNewTaskForm());
      return;
    }
    this.controlOfTasks.insert(this._clickedRowindex - 1, this.initNewTaskForm());
  }

  hideButtonClicked() {
    if (this.doEditTheLastRow()) {
      this.controlOfTasks.removeAt(this.controlOfTasks.length);
      return;
    }
    this.controlOfTasks.removeAt(this._clickedRowindex - 1);
    this.cd.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError回避のため
  }

  debugButtonClicked() {
    console.log(this.controlOfTasks);
    console.log(this.rowsFormGroup.getRawValue());
    console.log('clickedRowindex:' + this._clickedRowindex);
    if (this.controlOfTasks.value[this._clickedRowindex - 1] !== undefined) {
      console.log('clickedtask_name:' + this.controlOfTasks.value[this._clickedRowindex - 1].task_name);
      console.log('status:' + this.controlOfTasks.controls[this._clickedRowindex - 1].status);
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
    this.controlOfTasks.getRawValue().forEach(row => {
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
    console.log(this.controlOfTasks);
    if (this.controlOfTasks.value[this._clickedRowindex - 1] === undefined) { return; } // 連続でクリックしたときのための処理
    this.pointerEvents = 'none';
    const deleteRowId: string = this.controlOfTasks.value[this._clickedRowindex - 1].id + '';
    this.todolistService.deleteReqTodoList(deleteRowId)
      .subscribe(
        res => {
          console.log(res);
          // 画面の行削除。再読込にすると今のカーソルの行から移動してしまうため。
          this.controlOfTasks.removeAt(this._clickedRowindex - 1);
          this.cd.detectChanges();
        },
        err => console.error(err),
        () => this.pointerEvents = 'auto' // 完了時に呼ばれる
      );
  }

  clickedRowindexUpdate(index: number) {
    this._clickedRowindex = index;
  }

  doEditTheLastRow(): boolean {
    if (this._clickedRowindex === undefined) {
      return true;
    } else if (this._clickedRowindex >= this.controlOfTasks.length) { // 旧
      return true;
    }
    return false;
  }
}
