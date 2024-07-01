import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #httpClient = inject(HttpClient);

  constructor() {}

  findaUserByEmail(email: string) {
    return this.#httpClient.get<any>(
      `http://127.0.0.1:5001/todo-app-c9ea4/us-central1/app/user/${email}`
    );
  }
}
