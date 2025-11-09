declare module 'excel4node' {
  export interface StyleOptions {
    font?: {
      color?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
    fill?: {
      type?: string;
      patternType?: string;
      bgColor?: string;
      fgColor?: string;
    };
    alignment?: {
      horizontal?: string[];
      vertical?: string[];
      wrapText?: boolean;
    };
  }
  export interface Cell {
    string(v: string): Cell;
    number(v: number): Cell;
    date(v: Date): Cell;
    style(s: any): Cell;
  }
  export interface Worksheet {
    cell(r: number, c: number): Cell;
    column(c: number): { setWidth(n: number): void };
  }
  export class Workbook {
    addWorksheet(name: string): Worksheet;
    createStyle(opts: StyleOptions): any;
    writeToBuffer(): Promise<Buffer>;
  }
}
