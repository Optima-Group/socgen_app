import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { AppConfig } from 'app/config';
import { County } from 'app/model/api/administration/county';
import { Country } from 'app/model/api/administration/country';

@Component({
    selector: 'county-detail',
    templateUrl: 'county.detail.html',
    outputs: ['countryNeeded']
})
export class CountyDetail extends GenericDetail<County, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected countryNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedCountry: Country;

    setItemDefaultValues() {
        this.item = new County(0, '', '', 0);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.COUNTY_COUNTRY_REQUIRED) && (this.selectedCountry == null)) {
            alert('Tara este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    public set country(country: Country) {
        this.setCountry(country);
    }

    private setCountry(country: Country) {
        this.selectedCountry = country;
        this.item.countryId = country != null ? country.id : null;
    }

    private askForCountry() {
        this.countryNeeded.emit();
    }

}
