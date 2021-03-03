import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  public async getFilesByCharacter(data) {
    return await this.http.post(`api/SaveState-Get-Files-By-Character`, data).toPromise();
  }

  public async getFilesByPopularity() {
    return await this.http.post(`api/SaveState-Get-Files-By-Popularity`, {}).toPromise();
  }

  public async downloadFile(data) {
    let params = new HttpParams().set('url', data);
    return await this.http.get(`api/SaveState-Download-File`, { responseType: 'blob', params: params }).toPromise();
  }

}
