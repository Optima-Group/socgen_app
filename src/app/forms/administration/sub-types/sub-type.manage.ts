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
import { TypeDetail } from './type.detail';
import { SubTypeHttpService } from 'app/services/http/administration/sub-type.http.service';
import { SubType } from 'app/model/api/administration/sub-type';
import { SubTypeList } from './sub-type.list';
import { SubTypeDetail } from './sub-type.detail';
import { TypeList } from '../types/type.list';

@Component({
    selector: 'sub-type-manage',
    templateUrl: 'sub-type.manage.html',
    styleUrls: ['sub-type.manage.scss'],
    providers: [ SubTypeHttpService, TypeHttpService ]
})
export class SubTypeManage extends GenericManage<SubType, number> {

    @ViewChild('subTypeDetailModal') subTypeDetailModal: ModalDirective;
    @ViewChild('subTypeList') subTypeList: SubTypeList;
    @ViewChild('subTypeDetail') subTypeDetail: SubTypeDetail;
    @ViewChild('typeListModal') typeListModal: ModalDirective;
    @ViewChild('typeList') typeList: TypeList;

    private filter: string = '';
    private selectedType: Type = null;

    constructor(
        private subTypeHttpService: SubTypeHttpService,
        private typeHttpService: TypeHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.subTypeDetail.type = null;
    }

    protected editItem() {
        super.editItem();

        let subType: SubType = this.selectedItem as SubType;

        this.subTypeDetail.type = null;
        if ((subType != null) && (subType.typeId != null)) {
            this.typeHttpService
                .getById(subType.typeId)
                .subscribe((type: Type) => {
                    this.subTypeDetail.type = type;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.subTypeDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.subTypeDetailModal.hide();
    }

    private onSubTypeDetailTypeNeeded() {
        this.subTypeDetailModal.hide();
        this.selectType();
    }

    private onTypeListCancel() {
        this.typeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subTypeDetailModal.show();
        }
    }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("typeIds", AppUtils.getIdsList<Type, number>([ this.selectedType ])));

        this.subTypeList.refresh(params);
    }

    private selectType() {
        this.typeListModal.show();
        this.typeList.refresh(null);
    }

    private setSelectedType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedType = this.typeList.selectedItem;
                this.typeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.subTypeDetail.type = this.typeList.selectedItem;
                this.typeListModal.hide();
                this.subTypeDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectType() {
        this.selectedType = null;
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
        params.push(new Param('typeIds', AppUtils.getIdsList<Type, number>([this.selectedType])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.subTypeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'SubTypes.xlsx');
            });
    }
}
