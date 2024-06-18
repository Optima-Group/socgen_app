import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Partner } from '../../../model/api/documents/partner';

@Component({
    selector: 'partner-detail',
    templateUrl: 'partner.detail.html'
})
export class PartnerDetail extends GenericDetail<Partner, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Partner();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}