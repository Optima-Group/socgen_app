import { Component } from '@angular/core';
import { GenericList } from '../../forms/generic/generic.list';
import { IReadService } from '../../services/common/i-read.service';
import { TableItem } from '../../model/common/table-item';
import { Param } from "app/model/common/param";
import { ColumnDefinition } from "app/model/common/column-definition";
import { AppConfig } from "app/config";
// import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from "app/theme/services";

export class GenericTableList<T extends IEntity<V>, V> extends GenericList<T, V> {

    protected tableItems: Array<TableItem<T>> = new Array<TableItem<T>>();
    protected columns: Array<ColumnDefinition> = new Array<ColumnDefinition>();
    private listFontSize: number = 9;

    // protected itemAdded(addedItem: T) {
    //     super.itemAdded(addedItem);
    //     this.doCustomProcessing();
    // }

    // protected itemUpdated(updatedItem: T) {
    //     super.itemUpdated(updatedItem);
    //     this.doCustomProcessing();
    // }

    // protected itemDeleted(deletedItem: T) {
    //     super.itemDeleted(deletedItem);
    //     this.doCustomProcessing();
    // }

    constructor(protected sortColumnEx: string, protected sortDirectionEx: string, protected detailTypeEx?: string) {
        // protected spinner?: BaThemeSpinner) {
        super(sortColumnEx, sortDirectionEx, detailTypeEx);

        this.listFontSize = AppConfig.LIST_FONT_SIZE;
        console.log(this.tableItems);
    }

    public refresh(filters: Array<Param>) {

        // console.log('columns: ' + JSON.stringify(this.columns));

        // if ((this.dynamicQuery === 'true') && (this.columns != null) && (this.params.length == 0)) {
        if ((this.dynamicQuery === 'true') && (this.columns != null)) {
            let includes: Array<string> = new Array<string>();
            this.columns.forEach((column: ColumnDefinition) => {
                if (column.include && column.include.length > 0) {
                    let i: number = 0;
                    let found: boolean = false;
                    for(i = 0; i < includes.length; i++) {
                        if (column.include.indexOf(includes[i]) == 0) {
                            found = true;
                            includes[i] = column.include;
                            break;
                        }
                    }
                    if (!found) {
                        includes.push(column.include);
                    }
                }
            });

            if (includes.length > 0) {
                let includesParamValue: string = '';

                includes.forEach((include: string) => {
                    includesParamValue = includesParamValue + include + ',';
                });

                // this.params.push(new Param('includes', includesParamValue));
                let found: boolean = false;
                this.params.forEach((param: Param) => {
                    if (param.name === 'includes') {
                        param.value = includesParamValue;
                        found = true;
                    }
                });

                if (!found) {
                    this.params.push(new Param('includes', includesParamValue));
                }
            }
        }

        super.refresh(filters);
    }

    protected doCustomProcessing() {
        // this.tableItems = new Array<TableItem<T>>();
        this.tableItems.length = 0;
        if (this.items != null) {
            this.items.forEach((item) => {
                let selected: boolean = false;

                this._selectedItems.forEach((sItem) => {
                    if (item.id === sItem.id) selected = true;
                });

                this.tableItems.push(new TableItem<T>(item, selected));
            });
        }
    }

    private selectItem(item: T) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<T>();
            this._selectedItems.push(item);

            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        }
        else if (this.rowSelection === "multiple") {

            //let found: boolean = false;
            //this.selectedItems.forEach((sItem) => {
            //    if (sItem.id === item.id) {
            //        found = true;
            //    }
            //});

            //if (!found) {
            //    this.selectedItems.push(item);
            //}

            var index: number = this._selectedItems.indexOf(item);
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) tItem.selected = true;
            });
        }

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    protected unselectItem(item: T) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<T>();
        }
        else if (this.rowSelection === "multiple") {
            let index: number = -1;
            let currentIndex: number = 0;

            this._selectedItems.forEach((sItem: T) => {
                if (sItem.id === item.id)
                {
                    index  = currentIndex;
                }
                currentIndex++;
            });

            if (index > -1)
            {
                this._selectedItems.splice(index, 1);
            }
        }

        this.tableItems.forEach((tItem) => {
            if (tItem.item.id === item.id) tItem.selected = false;
        });

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    private updateCheckState(checked: boolean) {
        if (checked) this.selectAll(); else this.unselectAll();
    }

    private selectAll() {
        this.tableItems.forEach((tItem: TableItem<T>) => {
            if (!tItem.selected) {
                this.selectItem(tItem.item);
            }
        });
    }

    private unselectAll() {
        this.tableItems.forEach((tItem: TableItem<T>) => {
            if (tItem.selected) {
                this.unselectItem(tItem.item);
            }
        });
    }

    private isAllChecked(): boolean {
        return this.tableItems.every(item => item.selected);
    }

    public get TableItems(): Array<TableItem<T>> {
        return this.tableItems;
    }
}