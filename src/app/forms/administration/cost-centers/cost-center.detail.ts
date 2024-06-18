import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../../generic/generic.detail';

import { CostCenter } from '../../../model/api/administration/cost-center';
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AppConfig } from "app/config";

@Component({
    selector: 'cost-center-detail',
    templateUrl: 'cost-center.detail.html',
    outputs: ['admCenterNeeded']
})
export class CostCenterDetail extends GenericDetail<CostCenter, number> {

    protected admCenterNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedAdmCenter: AdmCenter = null;

    private askForAdmCenter() {
        this.admCenterNeeded.emit();
    }

    setItemDefaultValues() {
        this.item = new CostCenter(0, '', '');
    }

    public set admCenter(admCenter: AdmCenter) {
        this.selectedAdmCenter = admCenter;
        this.item.admCenterId = admCenter != null ? admCenter.id : null;
    }

    protected saveItem() {
        if ((AppConfig.COSTCENTER_ADMCENTER_REQUIRED) && (this.selectedAdmCenter == null)) {
            alert('Centrul logistic este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }
}