import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const BASE_URL: string = 'http://localhost:8080/api/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: User) {
    this.httpClient.post(BASE_URL, user, httpOptions);
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${BASE_URL}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(BASE_URL);
  }

  deleteUserById(userId: string) {
    this.httpClient.delete(`${BASE_URL}/${userId}`, httpOptions);
  }

}