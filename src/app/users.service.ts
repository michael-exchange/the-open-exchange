import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url:string = 'http://localhost:3000'
  user:string
  pin:string

  constructor(private http: HttpClient) { }

  createUser(user:string, pin:string): Observable<void> {
    return this.http.post<void>(`${this.url}/users`, { user, pin })
  }

  verifyUser(user:string, pin:string): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/users`, { user, pin })
  }

  setCredentials(user:string, pin:string): void {
    this.user = user;
    this.pin = pin;
  }

  getUser(): string {
    return this.user;
  }

  getPin(): string {
    return this.pin;
  }
}
