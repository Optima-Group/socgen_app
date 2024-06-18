import { ColumnHeader } from './../../../model/common/column-header';
import { ColumnDefinition } from './../../../model/common/column-definition';
import { Component, ElementRef } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AppConfig } from "app/config";
import { AppData } from "app/app-data";
import { Param } from "app/model/common/param";
import { TranslateService } from "@ngx-translate/core";
import { AssetDepTotal } from "app/model/api/assets/asset-dep-total";
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";
import { AssetCategoryTotal } from 'app/model/api/assets/asset-category-total';

@Component({
    selector: 'asset-list',
    templateUrl: '../../assets/assets/asset.list.html',
    // host: {
    //     '(document:click)': 'handleClick($event)'
    // },
    inputs: [ 'listTemplate' ],
})
export class AssetList extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    private listTemplate: string = 'ASSETS';
    private loadType: string = '';
    private totals: AssetDepTotal = null;
    private categoryTotals: AssetCategoryTotal = null;


    constructor(private translate: TranslateService, private myElement: ElementRef) {
        super('invNo', 'asc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];

        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
        this.elementRef = myElement;
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: AssetDepPagedResult) {
        this.totals = pageData.totals;
        this.categoryTotals = pageData.assetCategoryTotals;
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