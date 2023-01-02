import { Component, OnInit } from '@angular/core';
import { AccessLogService } from '../access-log.service';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css'],
})
export class AccessLogComponent implements OnInit {
  constructor(private _accessLogService: AccessLogService) {}

  page = 1;
  pageSize = 10;
  collectionSize = this._accessLogService.accessLogData.length;

  ngOnInit(): void {
    this._accessLogService.getAllAccessLog();
  }

  getAccessLog() {
    return this._accessLogService.accessLogData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  getNumberOFRecords() {
    return this._accessLogService.accessLogData.length;
  }
}
