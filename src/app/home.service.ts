import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeData } from 'src/models/HomeData';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  homeData: HomeData = {
    users: 0,
    requests: 0,
  };
  constructor(private _httpClient: HttpClient) {}

  getHomeData(): void {
    this._httpClient
      .post<{ home_data: HomeData }>(
        `${environment.server_url}/get_home_data`,
        {}
      )
      .subscribe({
        next: (response) => {
          this.homeData = response.home_data;
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
