import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Todo } from "./todo";
import { HttpErrorHandler, HandleError } from "../http-error-handler.service";

@Injectable()
export class TodolistService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TodolistService");
  }

  getTodolist(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>("api/todolist")
      .pipe(catchError(this.handleError("getTodolist", [])));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>("api/todo", todo)
      .pipe(catchError(this.handleError("addTodo", todo)));
  }

  deleteTodo(id: number): Observable<{}> {
    const url = `api/todo/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteTodo")));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(`api/todo/${todo._id}`, todo)
      .pipe(catchError(this.handleError("updateTodo", todo)));
  }

  saveTodo(todo: Todo): Observable<{}> {
    return this.http
      .post("api/todo", todo)
      .pipe(catchError(this.handleError("saveTodo")));
  }
}
