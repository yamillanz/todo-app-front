import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import GENERAL_CONSTANTS from '../shared/Constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private baseUrl = GENERAL_CONSTANTS.BACKEND_URL_PROD + 'tasks';

  constructor() {}

  getOne(todoId: string) {
    return this.http.get(`${this.baseUrl}/${todoId}`);
  }

  getAllByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-user/${userId}`);
  }

  getAllByUserHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-user/${userId}/history`);
  }

  updateTodo(todoId: string, todoData: any) {
    return this.http.put(`${this.baseUrl}/${todoId}`, todoData);
  }

  saveTodo(todoData: any) {
    return this.http.post(this.baseUrl, todoData);
  }

  deleteTodo(todoId: string) {
    return this.http.delete(`${this.baseUrl}/${todoId}`);
  }
}
