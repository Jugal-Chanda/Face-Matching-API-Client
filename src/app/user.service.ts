import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Observable } from 'rxjs';
import { ExcelExportService } from './excel-export.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: User[] = [];
  constructor(private _httpClient: HttpClient) {}
  private _getusersUrl: string = `${environment.server_url}/get_users`;
  private _addUserUrl: string = `${environment.server_url}/create_user`;
  private _updateUserUrl: string = `${environment.server_url}/update_user`;

  getUsers(): void {
    this._httpClient.post<{ users: [] }>(this._getusersUrl, {}).subscribe({
      next: (data) => {
        this.userData = data.users;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addUser(data: any): Observable<any> {
    let formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('valid_until', data.valid_for_days);
    formData.append('expires_at', data.expires_at);
    return this._httpClient.post<any>(this._addUserUrl, formData);
  }

  updateUser(data: any): Observable<any> {
    let formData = new FormData();
    formData.append('id', data.id);
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('valid_until', data.valid_for_days);
    formData.append('expires_at', data.expires_at);
    return this._httpClient.post<any>(this._updateUserUrl, formData);
  }
}
