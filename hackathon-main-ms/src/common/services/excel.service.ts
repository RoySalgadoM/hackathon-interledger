import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../common/logger/logger.service';

import * as xl from 'excel4node';

export interface ExcelColumn {
  key: string;
  header: string;
  width?: number;
}

export interface ExcelConfig {
  worksheetName: string;
  columns: ExcelColumn[];
  data: any[];
  filename: string;
}

@Injectable()
export class ExcelService {
  constructor(private readonly loggerService: LoggerService) {}
  generateExcel(config: ExcelConfig): Promise<Buffer | null> {
    return new Promise((resolve) => {
      try {
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet(config.worksheetName);

        // Set column widths
        config.columns.forEach((column, index) => {
          ws.column(index + 1).setWidth(column.width || 20);
        });

        // Create header style
        const styleHeader = wb.createStyle({
          alignment: {
            horizontal: ['center'],
            vertical: ['center'],
            wrapText: true
          },
          font: {
            color: '#FFFFFF',
            size: 12
          },
          fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#000000',
            fgColor: '#000000'
          }
        });

        // Create row style
        const styleRow = wb.createStyle({
          font: {
            size: 10
          }
        });

        // Add headers
        config.columns.forEach((column, index) => {
          ws.cell(1, index + 1)
            .string(column.header)
            .style(styleHeader);
        });

        // Add data rows
        let rowIndex = 2;
        config.data.forEach((item) => {
          config.columns.forEach((column, colIndex) => {
            const value = this.getNestedValue(item, column.key);
            ws.cell(rowIndex, colIndex + 1)
              .string(String(value || ''))
              .style(styleRow);
          });
          rowIndex++;
        });

        wb.writeToBuffer()
          .then((buffer: Buffer) => {
            resolve(buffer);
          })
          .catch((error: any) => {
            this.loggerService.printError(`Error generating Excel :: ${error}`);
            resolve(null);
          });
      } catch (error) {
        this.loggerService.printError(`Error generating Excel :: ${error}`);
        resolve(null);
      }
    });
  }

  async createCustomExcel(
    uuid: string,
    config: ExcelConfig
  ): Promise<Buffer | null> {
    return await this.generateExcel(config);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  }
}
