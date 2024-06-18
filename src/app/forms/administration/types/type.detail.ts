import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Location } from '../../../model/api/administration/location';
import { AppConfig } from 'app/config';
import { Region } from 'app/model/api/administration/region';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { MasterType } from 'app/model/api/assets/master-type';
import { Type } from 'app/model/api/administration/type';

@Component({
    selector: 'type-detail',
    templateUrl: 'type.detail.html',
    outputs: ['masterTypeNeeded']
})
export class TypeDetail extends GenericDetail<Type, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected masterTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedMasterType: MasterType;

    setItemDefaultValues() {
        this.item = new Type(0, '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedMasterType == null)) {
            alert('Master Type este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set masterType(masterType: MasterType) {
        this.setMasterType(masterType);
    }

    private setMasterType(masterType: MasterType) {
        this.selectedMasterType = masterType;
        this.item.masterTypeId = masterType != null ? masterType.id : null;
    }

    private askForMasterType() {
        this.masterTypeNeeded.emit();
    }

}
