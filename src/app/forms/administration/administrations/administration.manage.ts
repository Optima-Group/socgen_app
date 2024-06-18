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
import { CostCenterList } from '../cost-centers/cost-center.list';
import { CostCenter } from 'app/model/api/administration/cost-center';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';


@Component({
    selector: 'administration-manage',
    templateUrl: 'administration.manage.html',
    providers: [ DivisionHttpService, AdministrationHttpService, AdministrationDetailHttpService ]
})
export class AdministrationManage extends GenericManage<Administration, number> {

    @ViewChild('administrationDetailModal') administrationDetailModal: ModalDirective;
    @ViewChild('administrationList') administrationList: AdministrationList;
    @ViewChild('administrationDetail') administrationDetail: AdministrationDetailUI;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionList;
    @ViewChild('costCenterListModal') costCenterListModal: ModalDirective;
    @ViewChild('costCenterList') costCenterList: CostCenterList;

    private filter: string = '';
    private selectedDivision: Division = null;
    private selectedCostCenter: CostCenter = null;

    constructor(private divisionHttpService: DivisionHttpService,
        private administrationHttpService: AdministrationHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private administrationDetailHttpService: AdministrationDetailHttpService) {

        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.administrationDetail.division = null;
        this.administrationDetail.costCenter = null;
    }

    protected editItem() {
        super.editItem();

        let administration: AdministrationDetail = this.selectedItem as AdministrationDetail;

        this.administrationDetail.division = null;
        if (administration != null && administration.division != null) {
            this.divisionHttpService
                .getById(administration.division.id)
                .subscribe((division: Division) => {
                    this.administrationDetail.division = division;
                });
        }

        this.administrationDetail.costCenter = null;
        if (administration != null && administration.costCenter != null) {
            this.costCenterHttpService
                .getById(administration.costCenter.id)
                .subscribe((costCenter: CostCenter) => {
                    this.administrationDetail.costCenter = costCenter;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.administrationDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.administrationDetailModal.hide();
    }

    private onAdministrationDetailDivisionNeeded() {
        this.administrationDetailModal.hide();
        this.selectDivision();
    }

    private onAdministrationDetailCostCenterNeeded() {
        this.administrationDetailModal.hide();
        this.selectCostCenter();
    }

    private onDivisionListCancel() {
        this.divisionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.administrationDetailModal.show();
        }
    }

    private onCostCenterListCancel() {
        this.costCenterListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.administrationDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("divisionIds", AppUtils.getIdsList<Division, number>([ this.selectedDivision ])));
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>([ this.selectedCostCenter ])));

        this.administrationList.refresh(params);
    }

    private selectDivision() {
        this.divisionListModal.show();
        this.divisionList.refresh(null);
    }

    private selectCostCenter() {
        this.costCenterListModal.show();
        this.costCenterList.refresh(null);
    }

    private setSelectedDivision() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDivision = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.administrationDetail.division = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.administrationDetailModal.show();
                break;
            default:
                break;
        }
    }

    private setSelectedCostCenter() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCostCenter = this.costCenterList.selectedItem;
                this.costCenterListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.administrationDetail.costCenter = this.costCenterList.selectedItem;
                this.costCenterListModal.hide();
                this.administrationDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectDivision() {
        this.selectedDivision = null;
        this.refresh();
    }

    private unselectCostCenter() {
        this.selectedCostCenter = null;
        this.refresh();
    }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.administrationDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Administration>) => {

                let options = {
                    sheetid: 'budget-line',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id], 
                                    code as [Cod], 
                                    name as [Description]
                                    INTO XLSX("budget-line.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }
}
