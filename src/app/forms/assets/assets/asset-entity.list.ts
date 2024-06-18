import { Component, ElementRef } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AppConfig } from "app/config";
import { AppData } from "app/app-data";
import { Param } from "app/model/common/param";
import { TranslateService } from "@ngx-translate/core";
import { AssetDepTotal } from "app/model/api/assets/asset-dep-total";
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";

@Component({
    selector: 'asset-entity-list',
    templateUrl: '../../assets/assets/asset-entity.list.html',
    inputs: [ 'listTemplate' ],
})
export class AssetEntityList extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    private listTemplate: string = 'ASSETENTITIES';
    private loadType: string = '';
    private totals: AssetDepTotal = null;
    private filterSearch: string;


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
}
