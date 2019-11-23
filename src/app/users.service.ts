import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url:string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createUser(username:string): Observable<void> {
    return this.http.post<void>(`${this.url}/users`, { username })
  }
}
