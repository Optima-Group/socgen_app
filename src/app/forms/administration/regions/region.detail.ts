import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "app/forms/generic/generic.detail";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { Region } from 'app/model/api/administration/region';

@Component({
    selector: 'region-detail',
    templateUrl: 'region.detail.html'
})
export class RegionDetail extends GenericDetail<Region, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AdmCenter(0, '', '', null, null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}