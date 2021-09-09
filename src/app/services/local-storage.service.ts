import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public username$: BehaviorSubject<string>;
  public logged_in$: BehaviorSubject<boolean>;
  public token$: BehaviorSubject<string>;
  public email$: BehaviorSubject<string>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.username$ = new BehaviorSubject(localStorage.getItem('user'));
      this.email$ = new BehaviorSubject(localStorage.getItem('email'));
      this.token$ = new BehaviorSubject(localStorage.getItem('token'));
      if (localStorage.getItem('user') !== 'null' && localStorage.getItem('user') !== null) {
        this.logged_in$ = new BehaviorSubject(true);
      } else {
        this.logged_in$ = new BehaviorSubject(false);
      }
  }

  public getUsername(): Observable<string> {
    return this.username$.asObservable();
  }

  public setUsername(username: string): void {
    this.username$.next(username);
    localStorage.setItem('user', username);
  }

  public getLoggedIn(): Observable<boolean> {
    return this.logged_in$.asObservable();
  }

  public setLoggedIn(logged_in: boolean): void {
    this.logged_in$.next(logged_in);
  }

  public getToken(): Observable<string> {
    return this.token$.asObservable();
  }

  public setToken(token: string): void {
    this.token$.next(token);
    localStorage.setItem('token', token);
  }

  public getEmail(): Observable<string> {
    return this.email$.asObservable();
  }

  public setEmail(email: string): void {
    this.email$.next(email);
    localStorage.setItem('email', email);
  }
}
