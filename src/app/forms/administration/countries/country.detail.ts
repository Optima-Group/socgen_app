import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from 'app/forms/generic/generic.detail';
import { Country } from 'app/model/api/administration/country';

@Component({
    selector: 'country-detail',
    templateUrl: 'country.detail.html'
})
export class CountryDetail extends GenericDetail<Country, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Country();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}