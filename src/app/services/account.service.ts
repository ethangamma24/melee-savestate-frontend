import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

import { LocalStorageService } from '../services/local-storage.service';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public user: string;
  public token: string;
  public email: string;
  public logged_in: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private local_storage_service: LocalStorageService
  ) {
    this.local_storage_service.getToken().subscribe( (token) => { this.token = token });
    this.local_storage_service.getEmail().subscribe( (email) => { this.email = email });
  }

  async checkToken() {
    let user: any;
    if(this.token != 'null' && this.token != null) {
      user = await this.http.post(`/api/SaveState-Check-Token`, { "token": this.token, "email": this.email }, { responseType: 'text' }).toPromise();
      this.local_storage_service.setUsername(user);
      return user;
    } else {
      localStorage.setItem('user', 'null');
      return null;
    }
  }

  async login(email: string, password: string) {
    let login_successful: any;
    let user: any;
    let body = {
      "email": email,
      "password": password
    }
    await this.http.post(`/api/login`, body).toPromise().then( (res) => { login_successful = res; });

    if (login_successful) {
      await this.http.post(`/api/SaveState-Get-User`, body).toPromise().then( (res) => { user = res; });
      this.local_storage_service.setUsername(user.username.S);
      this.local_storage_service.setToken(user.token.S);
      this.local_storage_service.setEmail(user.email.S);
      this.local_storage_service.setLoggedIn(true);
      return login_successful;
    } else {
      return login_successful;
    }
  }

  logout() {
      this.local_storage_service.setUsername('null');
      this.local_storage_service.setToken('null');
      this.local_storage_service.setEmail('null');
      this.local_storage_service.setLoggedIn(false);
      this.router.navigate(['/login']);
  }

  async register(user: User) {
      console.log(user);
      return await this.http.post(`/api/register`, user).toPromise();
  }

  async usernameTaken(username: string) {
      let body = { "username": username }
      return await this.http.post(`/api/username-exists`, body).toPromise();
  }

  async emailTaken(email: string) {
      let body = { "email": email }
      return await this.http.post(`/api/SaveState-Email-Exists`, body).toPromise();
  }

  // getAll() {
  //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
  // }
  //
  // getById(id: string) {
  //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  // }
  //
  // update(id, params) {
  //   return this.http.put(`${environment.apiUrl}/users/${id}`, params)
  //               .pipe(map(x => {
  //                   // update stored user if the logged in user updated their own record
  //                   if (id == this.userValue.id) {
  //                       // update local storage
  //                       const user = { ...this.userValue, ...params };
  //                       localStorage.setItem('user', JSON.stringify(user));
  //
  //                       // publish updated user to subscribers
  //                       this.userSubject.next(user);
  //                   }
  //                   return x;
  //               }));
  // }
  //
  // delete(id: string) {
  //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
  //         .pipe(map(x => {
  //             // auto logout if the logged in user deleted their own record
  //             if (id == this.userValue.id) {
  //                 this.logout();
  //             }
  //             return x;
  //         }));
  // }
}
