import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Brand } from 'app/model/api/assets/brand';


@Component({
    selector: 'brand-detail',
    templateUrl: 'brand.detail.html'
})
export class BrandDetail extends GenericDetail<Brand, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Brand();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}