/**
 * Response format to be sent to UI
 */
export class ResponseObject {
  success: boolean = false;
  data?: Array<Object> | Object;
  error?: any;
}

export class SortData {
  sortColumn: string = '';
  sortOrder: string = '';
}

export interface SearchData {
  searchColumn: string;
  searchString: string;
}

export interface PageData {
  startRange?: number;
  pageLength?: number;
}

export class TableFilter {
  searchData?: Array<SearchData>;
  sortData?: SortData;
  pageData?: PageData;
}

export interface ItemData {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface TableFilterResult {
  queryString: string;
  paramsList: Array<Object>;
}
