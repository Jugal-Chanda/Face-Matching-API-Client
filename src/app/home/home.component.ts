import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    this._homeService.getHomeData();
  }

  getTotalUsers(): number {
    return this._homeService.homeData.users;
  }

  getTotalRequests(): number {
    return this._homeService.homeData.requests;
  }
}
