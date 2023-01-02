import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usetoken } from 'src/models/usetoken';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _getTokenUrl: string = `${environment.server_url}/get_token`;

  constructor(private _httpClient: HttpClient) {}

  redirectUrl: string = '/';

  authenticate(username: string, password: string): Observable<Usetoken> {
    let formatDate = new FormData();
    formatDate.append('username', username);
    formatDate.append('password', password);
    return this._httpClient.post<Usetoken>(this._getTokenUrl, formatDate);
  }
  isAuthenticate(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  setLocalStorage(data: any): void {
    this.removeLocalStorage('token');
    localStorage.setItem('token', data.token);
  }
  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
  clearLocalStorage(): void {
    localStorage.clear();
  }

  getAuthenticationToken(): String | null {
    return localStorage.getItem('token');
  }
}
