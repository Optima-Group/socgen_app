import { Component } from '@angular/core';
import { GenericTableList } from '../../forms/generic/generic.table.list';
import { GridOptions } from "ag-grid/main";

export class GenericAgGridList<T extends IEntity<V>, V> extends GenericTableList<T, V> {

    protected gridOptions: GridOptions = <GridOptions>{};
    protected columnDefs: any[] = null;

    protected itemAdded(addedItem: T) {
        super.itemAdded(addedItem);
        this.refreshGrid();
    }

    protected itemUpdated(updatedItem: T) {
        super.itemUpdated(updatedItem);
        this.refreshGrid();
    }

    protected itemDeleted(deletedItem: T) {
        super.itemDeleted(deletedItem);
        this.refreshGrid();
    }

    refreshGrid() {
        var newItemList: Array<T> = [];
        if (this.items) {
            this.items.forEach((item) => {
                newItemList.push(item);
            });
        }
        this.items = newItemList;
    }

    private onSelectionChanged($event) {
        this.selectedItems = this.gridOptions.api.getSelectedRows();

        //if (String(this.notifyOnChange) === "true") {
        if (this.notifyOnChange) {
            this.notifyCurrentSelection();
        }
    }
}