import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private baseUrl =
    'http://127.0.0.1:5001/todo-app-c9ea4/us-central1/app/tasks';

  constructor() {}

  getOne(todoId: string) {
    return this.http.get(`${this.baseUrl}/${todoId}`);
  }

  getAllByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-user/${userId}`);
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
