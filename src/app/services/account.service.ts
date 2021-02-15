import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    // public get userValue(): User {
    //     return this.userSubject.value;
    // }

    async checkToken() {
      let token = localStorage.getItem('token');
      let user: any;
      if(token != null) {
        await this.http.post(`/api/SaveState-Check-Token`, { "token": token }).toPromise().then( (res) => { user = res; });
        localStorage.setItem('user', user);
        return true;
      } else {
        localStorage.setItem('user', null);
        return false;
      }
    }

    async login(email, password) {
      let login_successful;
      let user: any;
      let body = {
        "email": email,
        "password": password
      }
      await this.http.post(`/api/login`, body).toPromise().then( (res) => { login_successful = res; });

      console.log(login_successful);
      if (login_successful) {
        await this.http.post(`/api/SaveState-Get-User`, body).toPromise().then( (res) => { user = res; });
        localStorage.setItem('user', user.username.S);
        localStorage.setItem('token', user.token.S);
        return login_successful;
      } else {
        return login_successful;
      }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    async register(user: User) {
        console.log(user);
        return await this.http.post(`/api/register`, user).toPromise();
    }

    async usernameTaken(username) {
        let body = { "username": username }
        return await this.http.post(`/api/username-exists`, body).toPromise();
    }
    
    async emailTaken(email) {
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
