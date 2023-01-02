import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessLog } from 'src/models/AccessLog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccessLogService {
  constructor(private _httpClient: HttpClient) {}
  accessLogData: AccessLog[] = [];
  private _allAccessLogUrl: string = `${environment.server_url}/get_access_logs`;
  getAllAccessLog(): any {
    this._httpClient
      .post<{ access_log: AccessLog[] }>(this._allAccessLogUrl, {})
      .subscribe({
        next: (data) => {
          this.accessLogData = data.access_log;
        },
      });
  }
}
