import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { AppConfig } from 'app/config';
import { County } from 'app/model/api/administration/county';
import { City } from 'app/model/api/administration/city';

@Component({
    selector: 'city-detail',
    templateUrl: 'city.detail.html',
    outputs: ['countyNeeded']
})
export class CityDetail extends GenericDetail<City, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected countyNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedCounty: County;

    setItemDefaultValues() {
        this.item = new City(0, '', '', 0);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.CITY_COUNTY_REQUIRED) && (this.selectedCounty == null)) {
            alert('Orasul este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    public set county(county: County) {
        this.setCounty(county);
    }

    private setCounty(county: County) {
        this.selectedCounty = county;
        this.item.countyId = county != null ? county.id : null;
    }

    private askForCounty() {
        this.countyNeeded.emit();
    }

}
