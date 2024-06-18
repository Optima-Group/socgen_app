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
import { UomList } from '../uoms/uom.list';

@Component({
    selector: 'budget-manager-manage',
    templateUrl: 'budget-manager.manage.html',
    providers: [ BudgetManagerHttpService, UomHttpService ]
})
export class BudgetManagerManage extends GenericManage<BudgetManager, number> {

    @ViewChild('budgetManagerDetailModal') budgetManagerDetailModal: ModalDirective;
    @ViewChild('budgetManagerList') budgetManagerList: BudgetManagerList;
    @ViewChild('budgetManagerDetail') budgetManagerDetail: BudgetManagerDetail;
    @ViewChild('uomListModal') uomListModal: ModalDirective;
    @ViewChild('uomList') uomList: UomList;

    private filter: string = '';
    private selectedUom: Uom= null;

    constructor(
        private budgetManagerHttpService: BudgetManagerHttpService,
        private uomHttpService: UomHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.budgetManagerDetail.uom = null;
    }

    protected editItem() {
        super.editItem();

        let budgetManager: BudgetManager = this.selectedItem as BudgetManager;

        this.budgetManagerDetail.uom = null;
        if ((budgetManager != null) && (budgetManager.uomId != null)) {
            this.uomHttpService
                .getById(budgetManager.uomId)
                .subscribe((uom: Uom) => {
                    this.budgetManagerDetail.uom = uom;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.budgetManagerDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.budgetManagerDetailModal.hide();
    }

    private onBudgetManagerDetailUomNeeded() {
        this.budgetManagerDetailModal.hide();
        this.selectUom();
    }

    private onUomListCancel() {
        this.uomListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.budgetManagerDetailModal.show();
        }
    }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("uomIds", AppUtils.getIdsList<Uom, number>([ this.selectedUom ])));

        this.budgetManagerList.refresh(params);
    }

    private selectUom() {
        this.uomListModal.show();
        this.uomList.refresh(null);
    }

    private setSelectedUom() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedUom = this.uomList.selectedItem;
                this.uomListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.budgetManagerDetail.uom = this.uomList.selectedItem;
                this.uomListModal.hide();
                this.budgetManagerDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectUom() {
        this.selectedUom = null;
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
        params.push(new Param('uomIds', AppUtils.getIdsList<Uom, number>([this.selectedUom])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.budgetManagerHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'BudgetManagers.xlsx');
            });
    }
}
