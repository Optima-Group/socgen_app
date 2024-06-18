import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { MasterType } from 'app/model/api/assets/master-type';
import { InsuranceCategory } from 'app/model/api/assets/insurance-category';


@Component({
    selector: 'insurance-category-detail',
    templateUrl: 'insurance-category.detail.html'
})
export class InsuranceCategoryDetail extends GenericDetail<InsuranceCategory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new MasterType();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}