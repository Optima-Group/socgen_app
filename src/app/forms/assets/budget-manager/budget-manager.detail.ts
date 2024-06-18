import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { AppConfig } from 'app/config';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Uom } from 'app/model/api/assets/uom';

@Component({
    selector: 'budget-manager-detail',
    templateUrl: 'budget-manager.detail.html',
    outputs: ['uomNeeded']
})
export class BudgetManagerDetail extends GenericDetail<BudgetManager, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected uomNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedUom: Uom;

    setItemDefaultValues() {
        this.item = new BudgetManager(0, '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedUom == null)) {
            alert('Uom este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set uom(uom: Uom) {
        this.setUom(uom);
    }

    private setUom(uom: Uom) {
        this.selectedUom = uom;
        this.item.uomId = uom != null ? uom.id : null;
    }

    private askForUom() {
        this.uomNeeded.emit();
    }
}