import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Company } from 'app/model/api/assets/company';


@Component({
    selector: 'company-detail',
    templateUrl: 'company.detail.html'
})
export class CompanyDetail extends GenericDetail<Company, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Company();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}