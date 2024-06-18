import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../generic/generic.manage';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { AccMonthHttpService } from 'app/services/http/accounting/acc-month.http.service';
import { InventoryDetailHttpService } from 'app/services/http/inventory/inventory-detail.http.service';
import { Inventory } from 'app/model/api/inventory/inventory';
import { InventoryList } from './inventory.list';
import { AccMonthList } from '../accounting/acc-month.list';
import { AccMonth } from 'app/model/api/accounting/acc-month';
import { Param } from 'app/model/common/param';
import { AppUtils } from 'app/common/app.utils';
import { PagedResult } from 'app/model/common/paged-result';
import { InventoryDetail as InventoryDetailUI } from './inventory.detail';
import { InventoryDetail } from 'app/model/api/inventory/inventory-detail';



@Component({
    selector: 'inventory.manage',
    templateUrl: 'inventory.manage.html',
    providers: [ AccMonthHttpService, InventoryHttpService, InventoryDetailHttpService ]
})
export class InventoryManage extends GenericManage<Inventory, number> {

    @ViewChild('inventoryDetailModal') inventoryDetailModal: ModalDirective;
    @ViewChild('inventoryList') inventoryList: InventoryList;
    @ViewChild('inventoryDetail') inventoryDetail: InventoryDetailUI;
    @ViewChild('accMonthListModal') accMonthListModal: ModalDirective;
    @ViewChild('accMonthList') accMonthList: AccMonthList;


    private filter: string = '';
    private selectedAccMonth: AccMonth = null;

    constructor(
        private accMonthHttpService: AccMonthHttpService,
        private inventoryHttpService: InventoryHttpService,
        private inventoryDetailHttpService: InventoryDetailHttpService) {

        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.inventoryDetail.accMonth = null;
    }

    protected editItem() {
        super.editItem();

        let inventory: InventoryDetail = this.selectedItem as InventoryDetail;


        this.inventoryDetail.accMonth = null;
        if (inventory != null && inventory.accMonth != null) {
            this.accMonthHttpService
                .getById(inventory.accMonth.id)
                .subscribe((accMonth: AccMonth) => {
                    this.inventoryDetail.accMonth = accMonth;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.inventoryDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.inventoryDetailModal.hide();
    }

    private onInventoryDetailAccMonthNeeded() {
        this.inventoryDetailModal.hide();
        this.selectAccMonth();
    }

    private onAccMonthListCancel() {
        this.accMonthListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.inventoryDetailModal.show();
        }
    }

    private disableAccMonth(){
        this.inventoryHttpService
        .disable()
        .subscribe(() => {
        });
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('accMonthIds', AppUtils.getIdsList<AccMonth, number>([ this.selectedAccMonth ])));

        this.inventoryList.refresh(params);
    }

    private selectAccMonth() {
        this.accMonthListModal.show();
        this.accMonthList.refresh(null);
    }

    private setSelectedAccMonth() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAccMonth = this.accMonthList.selectedItem;
                this.accMonthListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.inventoryDetail.accMonth = this.accMonthList.selectedItem;
                this.accMonthListModal.hide();
                this.inventoryDetailModal.show();
                break;
            default:
                break;
        }
    }
    private unselectAccMonth() {
        this.selectedAccMonth = null;
        this.refresh();
    }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.inventoryDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Inventory>) => {

                let options = {
                    sheetid: 'inventare',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id],
                                    code as [Cod],
                                    name as [Denumire],
                                    accMonth->description as [Cod Cladire],
                                    location->name as [Cladire],
                                    admCenter->code as [Cod Unitate Logistica],
                                    admCenter->name as [Unitate Logistica]
                                    INTO XLSX("camere.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}

