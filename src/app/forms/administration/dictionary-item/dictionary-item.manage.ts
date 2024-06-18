import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';

import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { DivisionList } from "app/forms/administration/divisions/division.list";
import { AdministrationDetail as AdministrationDetailUI } from "app/forms/administration/administrations/administration.detail";
import { DivisionHttpService } from "app/services/http/administration/division.http.service";
import { AdministrationList } from "app/forms/administration/administrations/administration.list";
import { AppUtils } from "app/common/app.utils";
import { DictionaryTypeHttpService } from 'app/services/http/administration/dictionary-type.http.service';
import { DictionaryItemHttpService } from 'app/services/http/administration/dictionary-item.http.service';
import { DictionaryItemDetailHttpService } from 'app/services/http/administration/dictionary-item-detail.http.service';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { DictionaryTypeList } from '../dictionary-type/dictionary-type.list';
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { DictionaryItemList } from './dictionary-item.list';

import { DictionaryItemDetail as DictionaryItemDetailUI } from "app/forms/administration/dictionary-item/dictionary-item.detail";
import { DictionaryItemDetail } from '../../../model/api/administration/dictionary-item-detail';
import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetCategoryHttpService } from 'app/services/http/assets/asset-category.http.service';

@Component({
    selector: 'dictionary-item-manage',
    templateUrl: 'dictionary-item.manage.html',
    providers: [ DictionaryTypeHttpService, DictionaryItemHttpService, DictionaryItemDetailHttpService, AssetCategoryHttpService ]
})
export class DictionaryItemManage extends GenericManage<DictionaryItem, number> {

    @ViewChild('dictionaryItemDetailModal') dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemList') dictionaryItemList: DictionaryItemList;
    @ViewChild('dictionaryItemDetail') dictionaryItemDetail: DictionaryItemDetailUI;
    @ViewChild('dictionaryTypeListModal') dictionaryTypeListModal: ModalDirective;
    @ViewChild('dictionaryTypeList') dictionaryTypeList: DictionaryTypeList;
    @ViewChild('assetCategoryListModal') assetCategoryListModal: ModalDirective;
    @ViewChild('assetCategoryList') assetCategoryList: AssetCategoryList;

    private filter: string = '';
    private selectedDictionaryType: DictionaryType = null;
    private selectedAssetCategory: AssetCategory = null;

    constructor(private dictionaryTypeHttpService: DictionaryTypeHttpService, private dictionaryItemHttpService: DictionaryItemHttpService,
        private dictionaryItemDetailHttpService: DictionaryItemDetailHttpService, private assetCategoryHttpService: AssetCategoryHttpService, ) {

        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.dictionaryItemDetail.dictionaryType = null;
    }

    protected editItem() {
        super.editItem();

        let dictionaryItem: DictionaryItemDetail = this.selectedItem as DictionaryItemDetail;

        this.dictionaryItemDetail.dictionaryType = null;
        this.dictionaryItemDetail.assetCategory = null;

        if (dictionaryItem != null) {
            this.dictionaryTypeHttpService
                .getById(dictionaryItem.dictionaryType.id)
                .subscribe((dictionaryType: DictionaryType) => {
                    this.dictionaryItemDetail.dictionaryType = dictionaryType;
                });
        }

        if (dictionaryItem != null) {
            this.assetCategoryHttpService
                .getById(dictionaryItem.assetCategory.id)
                .subscribe((assetCategory: AssetCategory) => {
                    this.dictionaryItemDetail.assetCategory = assetCategory;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.dictionaryItemDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.dictionaryItemDetailModal.hide();
    }

    private onDictionaryItemDetailDictionaryTypeNeeded() {
        this.dictionaryItemDetailModal.hide();
        this.selectDictionaryType();
    }

    private onDictionaryTypeListCancel() {
        this.dictionaryTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.dictionaryItemDetailModal.show();
        }
    }

    private onAssetCategoryDetailAssetCategoryNeeded() {
        this.dictionaryItemDetailModal.hide();
        this.selectAssetCategory();
    }

    private onAssetCategoryListCancel() {
        this.assetCategoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.dictionaryItemDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("dictionaryTypeIds", AppUtils.getIdsList<DictionaryType, number>([ this.selectedDictionaryType ])));

        this.dictionaryItemList.refresh(params);
    }

    private selectDictionaryType() {
        this.dictionaryTypeListModal.show();
        this.dictionaryTypeList.refresh(null);
    }

    private selectAssetCategory() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.refresh(null);
    }

    private setSelectedDictionaryType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDictionaryType = this.dictionaryTypeList.selectedItem;
                this.dictionaryTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.dictionaryItemDetail.dictionaryType = this.dictionaryTypeList.selectedItem;
                this.dictionaryTypeListModal.hide();
                this.dictionaryItemDetailModal.show();
                break;
        }
    }

    private setSelectedAssetCategory() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.dictionaryItemDetail.assetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.dictionaryItemDetailModal.show();
                break;
        }
    }

    private unselectDictionaryType() {
        this.selectedDictionaryType = null;
        this.refresh();
    }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.dictionaryItemDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<DictionaryItem>) => {

                let options = {
                    sheetid: 'items',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id], 
                                    code as [Code], 
                                    name as [Description]
                                    INTO XLSX("items.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }
}
