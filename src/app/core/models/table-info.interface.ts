export interface TableInfoCell {
  text: string;
  link?: string;
}

export interface TableInfo {
  headers: string[];
  rows: TableInfoCell[][];
  columnWidths: string[];
}