import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { AppConfig } from 'app/config';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Uom } from 'app/model/api/assets/uom';
import { Partner } from 'app/model/api/documents/partner';
import { InterCompany } from 'app/model/api/assets/inter-company';

@Component({
    selector: 'inter-company-detail',
    templateUrl: 'inter-company.detail.html',
    outputs: ['partnerNeeded']
})
export class InterCompanyDetail extends GenericDetail<InterCompany, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected partnerNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedPartner: Partner;

    setItemDefaultValues() {
        this.item = new Partner();
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedPartner == null)) {
            alert('Partner este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set partner(partner: Partner) {
        this.setPartner(partner);
    }

    private setPartner(partner: Partner) {
        this.selectedPartner = partner;
        this.item.partnerId = partner != null ? partner.id : null;
    }

    private askForPartner() {
        this.partnerNeeded.emit();
    }
}