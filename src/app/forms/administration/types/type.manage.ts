import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Location } from '../../../model/api/administration/location';

import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RegionHttpService } from "app/services/http/administration/region.http.service";
import { LocationDetail } from "app/forms/administration/locations/location.detail";
import { Region } from "app/model/api/administration/region";
import { AppUtils } from "app/common/app.utils";
import { LocationList } from "app/forms/administration/locations/location.list";
import { RegionList } from '../regions/region.list';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { AdmCenterList } from '../adm-centers/adm-center.list';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { saveAs as fileSaveAs } from "file-saver";
import { MasterType } from 'app/model/api/assets/master-type';
import { MasterTypeHttpService } from 'app/services/http/assets/master-type.http.service';
import { TypeHttpService } from 'app/services/http/administration/type.http.service';
import { Type } from 'app/model/api/administration/type';
import { TypeList } from './type.list';
import { TypeDetail } from './type.detail';
import { MasterTypeList } from 'app/forms/assets/master-types/master-type.list';

@Component({
    selector: 'type-manage',
    templateUrl: 'type.manage.html',
    styleUrls: ['type.manage.scss'],
    providers: [ TypeHttpService, MasterTypeHttpService ]
})
export class TypeManage extends GenericManage<Type, number> {

    @ViewChild('typeDetailModal') typeDetailModal: ModalDirective;
    @ViewChild('typeList') typeList: TypeList;
    @ViewChild('typeDetail') typeDetail: TypeDetail;
    @ViewChild('masterTypeListModal') masterTypeListModal: ModalDirective;
    @ViewChild('masterTypeList') masterTypeList: MasterTypeList;

    private filter: string = '';
    private selectedMasterType: MasterType = null;

    constructor(
        private typeHttpService: TypeHttpService,
        private masterTypeHttpService: MasterTypeHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.typeDetail.masterType = null;
    }

    protected editItem() {
        super.editItem();

        let type: Type = this.selectedItem as Type;

        this.typeDetail.masterType = null;
        if ((type != null) && (type.masterTypeId != null)) {
            this.masterTypeHttpService
                .getById(type.masterTypeId)
                .subscribe((masterType: MasterType) => {
                    this.typeDetail.masterType = masterType;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.typeDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.typeDetailModal.hide();
    }

    private onTypeDetailMasterTypeNeeded() {
        this.typeDetailModal.hide();
        this.selectMasterType();
    }

    private onMasterTypeListCancel() {
        this.masterTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.typeDetailModal.show();
        }
    }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("masterTypeIds", AppUtils.getIdsList<MasterType, number>([ this.selectedMasterType ])));

        this.typeList.refresh(params);
    }

    private selectMasterType() {
        this.masterTypeListModal.show();
        this.masterTypeList.refresh(null);
    }

    private setSelectedMasterType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedMasterType = this.masterTypeList.selectedItem;
                this.masterTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.typeDetail.masterType = this.masterTypeList.selectedItem;
                this.masterTypeListModal.hide();
                this.typeDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectMasterType() {
        this.selectedMasterType = null;
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
        params.push(new Param('masterTypeIds', AppUtils.getIdsList<MasterType, number>([this.selectedMasterType])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.typeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Types.xlsx');
            });
    }
}
