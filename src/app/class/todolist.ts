export interface TodoListRow {
  id: number;
  task_name: string;
  description: string;
  status: string;
  is_deleted: string;
  created_at: string;
  updated_at: string;
}

export class TodoList implements TodoListRow {

  public readonly id: number;
  public readonly task_name: string;
  public readonly description: string;
  public readonly status: string;
  public readonly is_deleted: string;
  public readonly created_at: string;
  public readonly updated_at: string;

  constructor(private row: TodoListRow) {
    this.id = row.id;
    this.task_name = row.task_name;
    this.description = row.description;
    this.status = row.status;
    this.is_deleted = row.is_deleted;
    this.created_at = this.datetimeToYYYYMMdd(row.created_at);
    this.updated_at = this.datetimeToYYYYMMdd(row.updated_at);
  }

  public static getBlankRow(): TodoList {
    const blankRow: TodoListRow = {
      id: 0,
      task_name: '',
      description: '',
      status: '0',
      is_deleted: '',
      created_at: '',
      updated_at: ''
    };
    return new TodoList(blankRow);
  }

  // MySQLのdatetimeをYYYY/MM/DDに変更する。
  private datetimeToYYYYMMdd(dt: string): string {
    if (dt.trim() === '') { return ''; }
    const YYYY = dt.slice(0, 4);
    const MM = dt.slice(5, 7);
    const dd = dt.slice(8, 10);
    return YYYY + '/' + MM + '/' + dd;
  }

}
