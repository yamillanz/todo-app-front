import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GENERAL_CONSTANTS from '../shared/Constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #httpClient = inject(HttpClient);
  private baseUrl = GENERAL_CONSTANTS.BACKEND_URL + 'users';

  constructor() {}

  findaUserByEmail(email: string) {
    return this.#httpClient.get<any>(`${this.baseUrl}/${email}`);
  }

  saveUser(user: any) {
    return this.#httpClient.post<any>(this.baseUrl, { email: user });
  }
}
