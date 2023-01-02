import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor(private fileSaver: FileSaverService) {}
  EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  EXCEL_EXTENSION = '.xlsx';

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE,
    });
    this.fileSaver.save(
      data,
      fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION
    );
  }
}
