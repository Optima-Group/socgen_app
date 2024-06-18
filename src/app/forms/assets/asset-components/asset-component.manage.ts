import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';

import { AppUtils } from "app/common/app.utils";

import { AssetComponentDetail as AssetComponentDetailUI } from "app/forms/assets/asset-components/asset-component.detail";
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { AssetComponentHttpService } from 'app/services/http/assets/asset-component.http.service';
import { AssetComponentDetailHttpService } from 'app/services/http/assets/asset-component-detail.http.service';
import { AssetComponent } from 'app/model/api/assets/asset-component';
import { AssetComponentList } from './asset-component.list';
import { AssetList } from '../assets/asset.list';
import { Asset } from 'app/model/api/assets/asset';
import { AssetComponentDetail } from 'app/model/api/assets/asset-component-detail';
import { AssetEntityList } from '../assets/asset-entity.list';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';
import { Employee } from 'app/model/api/administration/employee';
import { SubTypeHttpService } from 'app/services/http/administration/sub-type.http.service';
import { SubTypeList } from 'app/forms/administration/sub-types/sub-type.list';
import { SubType } from 'app/model/api/administration/sub-type';
import { saveAs as fileSaveAs } from "file-saver";


@Component({
    selector: 'asset-component-manage',
    templateUrl: 'asset-component.manage.html',
    styleUrls: ['asset-component.manage.scss'],
    providers: [ AssetHttpService, AssetComponentHttpService, AssetComponentDetailHttpService, EmployeeHttpService, SubTypeHttpService ]
})
export class AssetComponentManage extends GenericManage<AssetComponent, number> {

    @ViewChild('assetComponentDetailModal') assetComponentDetailModal: ModalDirective;
    @ViewChild('assetComponentList') assetComponentList: AssetComponentList;
    @ViewChild('assetComponentDetail') assetComponentDetail: AssetComponentDetailUI;
    @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
    @ViewChild('assetEntityList') assetEntityList: AssetEntityList;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeList;
    @ViewChild('subTypeListModal') subTypeListModal: ModalDirective;
    @ViewChild('subTypeList') subTypeList: SubTypeList;

    private filter: string = '';
    private selectedAsset: Asset = null;
    private selectedEmployee: Employee = null;
    private selectedSubType: SubType = null;
    private showExportITBtn = true;

    constructor(
        private assetHttpService: AssetHttpService,
        private employeeHttpService: EmployeeHttpService,
        private subTypeHttpService: SubTypeHttpService,
        private assetComponentHttpService: AssetComponentHttpService,
        private assetComponentDetailHttpService: AssetComponentDetailHttpService,
        ) {

        super();
    }
    

    protected addNewItem() {
        super.addNewItem();

        this.assetComponentDetail.asset = null;
        this.assetComponentDetail.employee = null;
        this.assetComponentDetail.subType = null;
    }

    protected editItem() {
        super.editItem();

        let assetComponent: AssetComponentDetail = this.selectedItem as AssetComponentDetail;

        this.assetComponentDetail.asset = null;
        this.assetComponentDetail.employee = null;
        this.assetComponentDetail.subType = null;

        if (assetComponent != null && assetComponent.asset != null) {
            this.assetHttpService
                .getById(assetComponent.asset.id)
                .subscribe((asset: Asset) => {
                    this.assetComponentDetail.asset = asset;
                });
        }

        if (assetComponent != null && assetComponent.employee != null) {
            this.employeeHttpService
                .getById(assetComponent.employee.id)
                .subscribe((employee: Employee) => {
                    this.assetComponentDetail.employee = employee;
                });
        }

        if (assetComponent != null && assetComponent.subType != null) {
            this.subTypeHttpService
                .getById(assetComponent.subType.id)
                .subscribe((subType: SubType) => {
                    this.assetComponentDetail.subType = subType;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.assetComponentDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.assetComponentDetailModal.hide();
    }

    private onAssetComponentDetailAssetNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectAsset();
    }

    private onAssetListCancel() {
        this.assetEntityListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }


    private onAssetComponentDetailEmployeeNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectEmployee();
    }

    private onEmployeeListCancel() {
        this.employeeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }

    private onAssetComponentDetailSubTypeNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectSubType();
    }

    private onSubTypeListCancel() {
        this.subTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('assetIds', AppUtils.getIdsList<Asset, number>([ this.selectedAsset ])));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));
        params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));
        this.assetComponentList.refresh(params);
    }

    private selectAsset() {
        this.assetEntityListModal.show();
        this.assetEntityList.refresh(null);
    }

    private setSelectedAsset() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAsset = this.assetEntityList.selectedItem;
                this.assetEntityListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.asset = this.assetEntityList.selectedItem;
                this.assetEntityListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    private unselectAsset() {
        this.selectedAsset = null;
        this.refresh();
    }


    private selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    private setSelectedEmployee() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.employee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    private unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }

    private selectSubType() {
        this.subTypeListModal.show();
        this.subTypeList.refresh(null);
    }

    private setSelectedSubType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.subType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    private unselectSubType() {
        this.selectedSubType = null;
        this.refresh();
    }

    private exportIT() {
        this.showExportITBtn = false;
        let params: Array<Param> = new Array<Param>();
      
        params.push(new Param('filter', this.filter));
        params.push(new Param('assetIds', AppUtils.getIdsList<Asset, number>([ this.selectedAsset ])));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));
        params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));

        this.assetComponentHttpService
            .exportIT(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Export.xlsx');
        this.showExportITBtn = true;
      });
      }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.assetComponentDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<AssetComponent>) => {

                let options = {
                    sheetid: 'Accesorii',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id],
                                    code as [Cod],
                                    name as [Denumire]
                                    INTO XLSX("Accesorii.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }
}
