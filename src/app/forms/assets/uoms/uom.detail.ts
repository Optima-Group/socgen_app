import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Uom } from 'app/model/api/assets/uom';

@Component({
    selector: 'uom-detail',
    templateUrl: 'uom.detail.html'
})
export class UomDetail extends GenericDetail<Uom, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Uom();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}