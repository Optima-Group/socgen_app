import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { TranslateService } from '@ngx-translate/core';
import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { AppUtils } from "app/common/app.utils";
import { CostCenterList } from "app/forms/administration/cost-centers/cost-center.list";
import { CostCenterDetail } from "app/forms/administration/cost-centers/cost-center.detail";
import { AppConfig } from "app/config";
import { saveAs as fileSaveAs } from "file-saver";
//import { TabsComponent } from "app/forms/common/tabs.component";

@Component({
    selector: 'cost-center-manage',
    templateUrl: 'cost-center.manage.html',
    //providers: [ CostCenterHttpService, AdmCenterHttpService ]
    providers: [ AdmCenterHttpService ]
})
export class CostCenterManage extends GenericManage<CostCenter, number> {

    @ViewChild('costCenterDetail') public costCenterDetail: CostCenterDetail;
    @ViewChild('costCenterList') public costCenterList: CostCenterList;
    @ViewChild('costCenterDetailModal') costCenterDetailModal: ModalDirective;
    @ViewChild('admCenterListModal') admCenterListModal: ModalDirective;
    @ViewChild('admCenterList') public admCenterList: AdmCenterList;

    private filter: string = '';
    private selectedAdmCenter: AdmCenter = null;
    //private btnClass: string = 'btn-xs';
    private btnClass(): string {
        return 'btn-xs';
    }

    private get buttonSize(): string { return AppConfig.BUTTON_SIZE; }
    private get textBoxHeight(): number { return AppConfig.TEXTBOX_HEIGHT; }

    public static get USE_REGION(): boolean { return false; }

    constructor(private costCenterHttpService: CostCenterHttpService, 
                private admCenterHttpService: AdmCenterHttpService, 
                private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.costCenterDetail.admCenter = null;
    }

    protected editItem() {
        super.editItem();

        let costCenter: CostCenter = this.selectedItem as CostCenter;

        this.costCenterDetail.admCenter = null;
        if (costCenter != null) {
            this.admCenterHttpService
                .getById(costCenter.admCenterId)
                .subscribe((admCenter: AdmCenter) => {
                    this.costCenterDetail.admCenter = admCenter;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.costCenterDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.costCenterDetailModal.hide();
    }

    private selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>([this.selectedAdmCenter])));

        return params;
    }

    private refresh() {
        let params: Array<Param> = null;

        params = this.getFilters();
        this.costCenterList.refresh(params);
    }

    private onCostCenterDetailAdmCenterNeeded() {
        this.costCenterDetailModal.hide();
        this.selectAdmCenter();
    }

    private onAdmCenterListCancel() {
        this.admCenterListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    private setSelectedAdmCenters() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAdmCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.admCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.costCenterDetailModal.show();
                break;
        }
    }

    private unselectAdmCenter() {
        this.selectedAdmCenter = null;
        this.refresh();
    }

    public get useAdmCenter(): boolean {
        return AppConfig.USE_ADM_CENTER;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.costCenterHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'cost_centers.xlsx');
            });
    }

//     @ViewChild('costCenter') aboutTemplate;
//     @ViewChild(TabsComponent) tabsComponent;

//   onOpen() {
//     this.tabsComponent.openTab(
//       'CostCenter',
//       this.aboutTemplate, 
//       {},
//       true
//     );
//   }
}
