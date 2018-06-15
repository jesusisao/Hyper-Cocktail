import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Http, URLSearchParams } from '@angular/http';
import { TodoListRow } from '@app/class/todolist';
import 'rxjs/add/operator/finally';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private http: Http) { }

  getReqTodoList(): Observable<any> {
    const params = new URLSearchParams();
    // 本来はここで引数セット
    // params.set('paramA', aaaaa);
    return this.http // ここが関数へのreturn
      .get('/todolist', {
        search: params
      })
      .pipe(
        map(res => res.json() || {}),
        catchError(err => throwError(err.statusText))
      );
  }

  postReqTodoList(sendRows: TodoListRow[]): Observable<any> {
    return this.http // ここが関数へのreturn
      .post('/todolist', sendRows)
      .pipe(
        map(res => res.json() || {}),
        catchError(err => throwError(err.statusText))
      );
  }

  deleteReqTodoList(id: string): Observable<any> {
    return this.http // ここが関数へのreturn
      .delete('/todolist/' + id)
      .pipe(
        map(res => res.json() || {}),
        catchError(err => throwError(err.statusText))
      );
  }
}
