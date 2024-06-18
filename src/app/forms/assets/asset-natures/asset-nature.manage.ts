import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AssetType } from 'app/model/api/assets/asset-type';
import { AssetTypeHttpService } from 'app/services/http/assets/asset-type.http.service';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { AssetNatureHttpService } from 'app/services/http/assets/asset-nature.http.service';
import { AssetTypeList } from '../asset-types/asset-type.list';
import { AppUtils } from 'app/common/app.utils';
import { AssetNatureList } from './asset-nature.list';
import { AssetNatureDetail } from './asset-nature.detail';
import { saveAs as fileSaveAs } from "file-saver";

@Component({
    selector: 'asset-nature-manage',
    templateUrl: 'asset-nature.manage.html',
    providers: [ AssetNatureHttpService, AssetTypeHttpService ]
})
export class AssetNatureManage extends GenericManage<AssetNature, number> {

    @ViewChild('assetNatureDetailModal') assetNatureDetailModal: ModalDirective;
    @ViewChild('assetNatureList') assetNatureList: AssetNatureList;
    @ViewChild('assetNatureDetail') assetNatureDetail: AssetNatureDetail;
    @ViewChild('assetTypeListModal') assetTypeListModal: ModalDirective;
    @ViewChild('assetTypeList') assetTypeList: AssetTypeList;

    private filter: string = '';
    private selectedAssetType: AssetType = null;

    constructor(
        private assetNatureHttpService: AssetNatureHttpService,
        private assetTypeHttpService: AssetTypeHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.assetNatureDetail.assetType = null;
    }

    protected editItem() {
        super.editItem();

        let assetNature: AssetNature = this.selectedItem as AssetNature;

        this.assetNatureDetail.assetType = null;
        if ((assetNature != null) && (assetNature.assetTypeId != null)) {
            this.assetTypeHttpService
                .getById(assetNature.assetTypeId)
                .subscribe((assetType: AssetType) => {
                    this.assetNatureDetail.assetType = assetType;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.assetNatureDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.assetNatureDetailModal.hide();
    }

    private onAssetNatureDetailAssetTypeNeeded() {
        this.assetNatureDetailModal.hide();
        this.selectAssetType();
    }

    private onAssetTypeListCancel() {
        this.assetTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetNatureDetailModal.show();
        }
    }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("assetTypeIds", AppUtils.getIdsList<AssetType, number>([ this.selectedAssetType ])));

        this.assetNatureList.refresh(params);
    }

    private selectAssetType() {
        this.assetTypeListModal.show();
        this.assetTypeList.refresh(null);
    }

    private setSelectedAssetType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetType = this.assetTypeList.selectedItem;
                this.assetTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetNatureDetail.assetType = this.assetTypeList.selectedItem;
                this.assetTypeListModal.hide();
                this.assetNatureDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectAssetType() {
        this.selectedAssetType = null;
        this.refresh();
    }


    // private exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('assetTypeIds', AppUtils.getIdsList<AssetType, number>([this.selectedAssetType])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetNatureHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'AssetNatures.xlsx');
            });
    }
}
