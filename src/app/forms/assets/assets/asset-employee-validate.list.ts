import { ColumnHeader } from './../../../model/common/column-header';
import { ColumnDefinition } from './../../../model/common/column-definition';
import { Component, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AppConfig } from "app/config";
import { AppData } from "app/app-data";
import { Param } from "app/model/common/param";
import { TranslateService } from "@ngx-translate/core";
import { AssetDepTotal } from "app/model/api/assets/asset-dep-total";
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";
import { TableItemEmployee } from 'app/model/common/table-item-employee';
import * as _ from 'underscore'
import { time } from 'console';

@Component({
    selector: 'asset-employee-validate-list',
    templateUrl: '../../assets/assets/asset-employee-validate.list.html',
    // host: {
    //     '(document:click)': 'handleClick($event)'
    // },
    inputs: [ 'listTemplate' ],
    outputs: [ 'listAtferViewInit' ]
})
export class AssetEmployeeValidateList extends GenericTableList<any, number> implements AfterViewInit {
    public query = '';
    public filteredList = [];
    public elementRef;
    private listTemplate: string = 'EMPLOYEEVALIDATES';
    private loadType: string = '';
    private totals: AssetDepTotal = null;
    private allowLabel: string = '-';

    @Output() protected listAtferViewInit: EventEmitter<void> = new EventEmitter<null>();

    constructor(private translate: TranslateService, private myElement: ElementRef) {
        super('invNo', 'asc', 'inventory');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        //this.resetColumnDefinitions(AppData.ColumnDefinitions[this.listTemplate]);


        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
        this.elementRef = myElement;
    }

    ngAfterViewInit(): void {
        //console.log("employee validate afterviewinit");
        this.listAtferViewInit.emit(null);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: AssetDepPagedResult) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== ''){
            this.filteredList = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

    public select(item){
        this.query = item;
        this.filteredList = [];
        if(item != null){
            this.tableItems = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            })
        }
    }

    private onAllowLabelUpdate(tableItem) {
       tableItem.item.isMinus = !!tableItem.item.isMinus;
       // tableItem.selected = !tableItem.selected;
       this.updateCheckStateEmp(true);
    }

    private onAllowUpdate(tableItem) {
        tableItem.item.isMinus = true;
        tableItem.selected = true;
     }

     private onNotAllowUpdate(tableItem) {
        tableItem.item.isMinus = false;
        tableItem.selected = false;
     }

     private updateCheckStateEmp(checked: boolean) {
        if (checked) this.selectAllEmp(); else this.unselectAllEmp();
    }
    

    private selectAllEmp() {
        // alert(this.tableItems.length);
        this.tableItems.forEach((tItem) => {

             // alert(JSON.stringify(tItem.item.invNo));

            // if (!tItem.selected) {
            //     this.selectItemEmp(tItem.item);
            // } 
            this.selectItemEmp(tItem.item);
        });
    }

    private unselectAllEmp() {
        this.tableItems.forEach((tItem) => {
            if (tItem.selected) {
                this.unselectItem(tItem.item);
            }
        });
    }

    private isAllCheckedEmp(): boolean {
        return this.tableItems.every(item => item.selected);
    }

    private selectItemEmp(item) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<any>();
            this._selectedItems.push(item);
            
            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        }
        else if (this.rowSelection === "multiple") {


             var index : number = _.indexOf(this._selectedItems, item);

        //    var index = -1;
        //         for (var i = 0; i < this._selectedItems.length; ++i) {
        //             if (this._selectedItems[i].id === item.id) {
        //                 index = i;
        //                 break;
        //             }
        //         }
        //         console.log(index);

             //alert(index);

           
            
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) tItem.selected = true;
                // if (tItem.item.id === item.id) tItem.item.isMinus = true;
            });
        }

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    protected unselectItem(item) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<any>();
        }
        else if (this.rowSelection === "multiple") {
            let index: number = -1;
            let currentIndex: number = 0;

            this._selectedItems.forEach((sItem) => {
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
            // if (tItem.item.id === item.id) tItem.item.isMinus = false;
        });

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

//    public handleClick(event){
//         let clickedComponent = event.target;
//         let inside = false;
//         do {
//             if (clickedComponent === this.elementRef.nativeElement) {
//                 inside = true;
//             }
//            clickedComponent = clickedComponent.parentNode;
//         } while (clickedComponent);
//          if(!inside){
//              this.filteredList = [];
//              this.totalItems = this.tableItems.length;
//              if(this.query == ''){
//                 this.refresh(null);
//              }
//          }
//      }


    //   getSum(column) : number {

    //     let sum = 0;
    //     for(let i = 0; i < this.tableItems.length; i++) {
    //         sum += this.tableItems[i][column];
    //     }
    //     return sum;
    // }


}


// import { Component } from '@angular/core';
// import { GenericTableList } from '../../generic/generic.table.list';

// import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';

// @Component({
//     selector: 'asset-list',
//     templateUrl: 'asset.list.html'
// })
// export class AssetList extends GenericTableList<AssetSimpleDetail, number> {
//     constructor() {
//         super('assetName', 'asc');
//     }
// }
