import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public async downloadFile(data) {
    return await this.http.post(`api/SaveState-Download-File`, data).toPromise();
  }

}
