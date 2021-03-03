import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public async getFilesByUser(data) {
    return await this.http.post(`api/SaveState-Get-Files-By-User`, { user: data }).toPromise();
  }

}
