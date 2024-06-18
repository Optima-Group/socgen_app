import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Location } from '../../../model/api/administration/location';
import { AppConfig } from 'app/config';
import { Region } from 'app/model/api/administration/region';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { City } from 'app/model/api/administration/city';

@Component({
    selector: 'location-detail',
    templateUrl: 'location.detail.html',
    outputs: ['regionNeeded', 'admCenterNeeded', 'cityNeeded']
})
export class LocationDetail extends GenericDetail<Location, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected regionNeeded: EventEmitter<void> = new EventEmitter<void>();
    protected admCenterNeeded: EventEmitter<void> = new EventEmitter<void>();
    protected cityNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedRegion: Region;
    private selectedAdmCenter: AdmCenter;
    private selectedCity: City;

    setItemDefaultValues() {
        this.item = new Location(0, '', '',0, 0, 0, 0, 0, '','','');
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedCity == null) && (this.selectedRegion == null) && (this.selectedAdmCenter == null)) {
            alert('Regiunea si Judetul sunt obligatorii!');
        }
        else {
            super.saveItem();
        }
    }

    public set city(city: City) {
        this.setCity(city);
    }

    private setCity(city: City) {
        this.selectedCity = city;
        this.item.cityId = city != null ? city.id : null;
    }

    private askForCity() {
        this.cityNeeded.emit();
    }

    public set region(region: Region) {
        this.setRegion(region);
    }

    private setRegion(region: Region) {
        this.selectedRegion = region;
        this.item.regionId = region != null ? region.id : null;
    }

    private askForRegion() {
        this.regionNeeded.emit();
    }

    public set admCenter(admCenter: AdmCenter) {
        this.setAdmCenter(admCenter);
    }

    private setAdmCenter(admCenter: AdmCenter) {
        this.selectedAdmCenter = admCenter;
        this.item.admCenterId = admCenter != null ? admCenter.id : null;
    }

    private askForAdmCenter() {
        this.admCenterNeeded.emit();
    }
}
