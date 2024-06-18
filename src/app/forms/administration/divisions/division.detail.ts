import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { AppConfig } from "app/config";

@Component({
    selector: 'division-detail',
    templateUrl: 'division.detail.html'
})
export class DivisionDetail extends GenericDetail<Division, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Division(0, '', '');
    }

    protected resetForm() {
        this.detailForm.reset();
    }



    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) ) {
            alert('Regiunea este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }
}