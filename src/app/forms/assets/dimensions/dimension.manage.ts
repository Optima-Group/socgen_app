import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AppUtils } from 'app/common/app.utils';

import { DimensionDetail as DimensionDetailUI } from 'app/forms/assets/dimensions/dimension.detail';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetCategoryHttpService } from 'app/services/http/assets/asset-category.http.service';
import { DimensionHttpService } from 'app/services/http/administration/dimension.http.service';
import { DimensionDetailHttpService } from 'app/services/http/administration/dimension-detail.http.service';
import { Dimension } from 'app/model/api/administration/dimension';
import { DimensionList } from './dimension.list';
import { AssetCategoryList } from '../asset-categories/asset-category.list';
import { DimensionDetail } from 'app/model/api/administration/dimension-detail';

@Component({
    selector: 'dimension-manage',
    templateUrl: 'dimension.manage.html',
    providers: [ AssetCategoryHttpService, DimensionHttpService, DimensionDetailHttpService ]
})
export class DimensionManage extends GenericManage<Dimension, number> {

    @ViewChild('dimensionDetailModal') dimensionDetailModal: ModalDirective;
    @ViewChild('dimensionList') dimensionList: DimensionList;
    @ViewChild('dimensionDetail') dimensionDetail: DimensionDetailUI;
    @ViewChild('assetCategoryListModal') assetCategoryListModal: ModalDirective;
    @ViewChild('assetCategoryList') assetCategoryList: AssetCategoryList;

    private filter: string = '';
    private selectedAssetCategory: AssetCategory = null;

    constructor(
        private assetCategoryHttpService: AssetCategoryHttpService,
        private dimensionHttpService: DimensionHttpService,
        private dimensionDetailHttpService: DimensionDetailHttpService,
        ) {

        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.dimensionDetail.assetCategory = null;
    }

    protected editItem() {
        super.editItem();

        let dimension: DimensionDetail = this.selectedItem as DimensionDetail;

        this.dimensionDetail.assetCategory = null;

        if (dimension != null && dimension.assetCategory != null) {
            this.assetCategoryHttpService
                .getById(dimension.assetCategory.id)
                .subscribe((assetCategory: AssetCategory) => {
                    this.dimensionDetail.assetCategory = assetCategory;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.dimensionDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.dimensionDetailModal.hide();
    }

    private onDimensionDetailAssetCategoryNeeded() {
        this.dimensionDetailModal.hide();
        this.selectAssetCategory();
    }

    private onAssetCategoryListCancel() {
        this.assetCategoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.dimensionDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));

        this.dimensionList.refresh(params);
    }

    private selectAssetCategory() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.refresh(null);
    }

    private setSelectedAssetCategory() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.dimensionDetail.assetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.dimensionDetailModal.show();
                break;
        }
    }


    private unselectAssetCategory() {
        this.selectedAssetCategory = null;
        this.refresh();
    }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.dimensionDetailHttpService.get(1, 1000000, 'length', 'asc', params, null).subscribe(
            (data: PagedResult<Dimension>) => {

                let options = {
                    sheetid: 'run-change',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id],
                                    length as [Cod],
                                    width as [Description],
                                    height as [Name]
                                    INTO XLSX('run-change.xlsx',?) FROM ?`,[ options, data.items ]);

            });
    }
}
