import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Partner } from '../../../model/api/documents/partner';
import { PartnerLocation } from 'app/model/api/documents/partner-location';

@Component({
    selector: 'partner-location-detail',
    templateUrl: 'partner-location.detail.html'
})
export class PartnerLocationDetail extends GenericDetail<PartnerLocation, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Partner();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}