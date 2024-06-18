import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AssetTypeList } from '../asset-types/asset-type.list';
import { AppUtils } from 'app/common/app.utils';
import { saveAs as fileSaveAs } from "file-saver";
import { BudgetManagerHttpService } from 'app/services/http/assets/budget-manager.http.service';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { BudgetManagerDetail } from './budget-manager.detail';
import { Uom } from 'app/model/api/assets/uom';
import { BudgetManagerList } from './budget-manager.list';
import { InterCompanyHttpService } from 'app/services/http/assets/inter-company.http.service';
import { PartnerHttpService } from 'app/services/http/documents/partner.http.service';
import { InterCompany } from 'app/model/api/assets/inter-company';
import { InterCompanyList } from './inter-company.list';
import { InterCompanyDetail } from './inter-company.detail';
import { PartnerList } from 'app/forms/documents/partners/partner.list';
import { Partner } from 'app/model/api/documents/partner';

@Component({
    selector: 'inter-company-manage',
    templateUrl: 'inter-company.manage.html',
    providers: [ InterCompanyHttpService, PartnerHttpService ]
})
export class InterCompanyManage extends GenericManage<InterCompany, number> {

    @ViewChild('interCompanyDetailModal') interCompanyDetailModal: ModalDirective;
    @ViewChild('interCompanyList') interCompanyList: InterCompanyList;
    @ViewChild('interCompanyDetail') interCompanyDetail: InterCompanyDetail;
    @ViewChild('partnerListModal') partnerListModal: ModalDirective;
    @ViewChild('partnerList') partnerList: PartnerList;

    private filter: string = '';
    private selectedPartner: Partner= null;

    constructor(
        private interCompanyHttpService: InterCompanyHttpService,
        private partnerHttpService: PartnerHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.interCompanyDetail.partner = null;
    }

    protected editItem() {
        super.editItem();

        let interCompany: InterCompany = this.selectedItem as InterCompany;

        this.interCompanyDetail.partner = null;
        if ((interCompany != null) && (interCompany.partnerId != null)) {
            this.partnerHttpService
                .getById(interCompany.partnerId)
                .subscribe((partner: Partner) => {
                    this.interCompanyDetail.partner = partner;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.interCompanyDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.interCompanyDetailModal.hide();
    }

    private onInterCompanyDetailPartnerNeeded() {
        this.interCompanyDetailModal.hide();
        this.selectPartner();
    }

    private onPartnerListCancel() {
        this.partnerListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.interCompanyDetailModal.show();
        }
    }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("partnerIds", AppUtils.getIdsList<Partner, number>([ this.selectedPartner ])));

        this.interCompanyList.refresh(params);
    }

    private selectPartner() {
        this.partnerListModal.show();
        this.partnerList.refresh(null);
    }

    private setSelectedPartner() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedPartner = this.partnerList.selectedItem;
                this.partnerListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.interCompanyDetail.partner = this.partnerList.selectedItem;
                this.partnerListModal.hide();
                this.interCompanyDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectPartner() {
        this.selectedPartner = null;
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
        params.push(new Param('partnerIds', AppUtils.getIdsList<Partner, number>([this.selectedPartner])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.interCompanyHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'InterCompanies.xlsx');
            });
    }
}
