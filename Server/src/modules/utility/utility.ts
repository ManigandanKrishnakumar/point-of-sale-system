import { BILLING_TABLE } from '../../constants/dao-constants/data-dictionary';
import {
  TableFilter,
  TableFilterResult,
} from '../../interfaces/common-interfaces';

export const getSearchQuery = (baseQuery: string, filterData?: TableFilter) => {
  let paramsList: Array<Object> = new Array<Object>();
  if (
    filterData != null &&
    filterData.searchData != null &&
    filterData.searchData.length > 0
  ) {
    baseQuery = baseQuery + ' WHERE';
    for (let i = 0; i < filterData.searchData.length; i++) {
      if (filterData.searchData[i].searchColumn.indexOf(' ') == -1) {
        baseQuery =
          baseQuery + ' ' + filterData.searchData[i].searchColumn + ' LIKE ?';
        if (i < filterData.searchData.length - 1) {
          baseQuery = baseQuery + ' AND';
        }
        paramsList.push('%' + filterData.searchData[i].searchString + '%');
      }
    }
  }
  baseQuery =
        baseQuery +
        ' ORDER BY ';
  if (filterData != null && filterData.sortData != null) {
    if (
      filterData.sortData.sortColumn.indexOf(' ') == -1 &&
      filterData.sortData.sortOrder.indexOf(' ') == -1
    ) {
      baseQuery =
        baseQuery +
        filterData.sortData.sortColumn +
        ' ' +
        filterData.sortData.sortOrder;
    }
  }
  else{
    baseQuery =
        baseQuery +
        BILLING_TABLE.CREATION_DATE +
        ' DESC';
  }

  let startRange: number = 0;
  let pageLength: number = 25;
  if (filterData != null && filterData.pageData != null) {
    if (filterData.pageData.startRange != null) {
      startRange = filterData.pageData.startRange;
    }
    if (filterData.pageData.pageLength != null) {
      pageLength = filterData.pageData.pageLength;
    }
  }
  baseQuery = baseQuery + ' LIMIT ?,?;';
  paramsList.push(startRange);
  paramsList.push(pageLength);
  let resultData: TableFilterResult = {
    queryString: baseQuery,
    paramsList: paramsList,
  };
  console.log(resultData);
  return resultData;
};
