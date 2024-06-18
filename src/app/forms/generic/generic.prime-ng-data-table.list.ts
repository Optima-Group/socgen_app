import { Component } from '@angular/core';
import { GenericTableList } from '../../forms/generic/generic.table.list';
import { TableItem } from '../../model/common/tableitem';

export class GenericPrimeNgDataTableList<T extends IEntity<V>, V> extends GenericTableList<T, V> {

    private loadData(event: any) {
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort in single sort mode
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
        //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
        //filters: Filters object having field as key and filter value, filter matchMode as value

        //let sortColumn: string = event.sortField === undefined ? this.sortColumn : event.sortField;

        let sortColumn: string = "";
        if (event.sortField === undefined) {
            sortColumn = this.sortColumn; 
        }
        else {
            sortColumn = event.sortField;
            this.sortDirection = event.sortOrder === -1 ? "desc" : "asc";
        }

        let dotIndex: number = -1;
        dotIndex = sortColumn.lastIndexOf(".");
        if (dotIndex >= 0) sortColumn = sortColumn.substring(dotIndex + 1);

        this.currentPage = (event.first / event.rows) + 1;
        this.pageSize = event.rows;
        this.sortColumn = sortColumn;

        //if (this.initialized)
        this.refreshItems();
    }
}