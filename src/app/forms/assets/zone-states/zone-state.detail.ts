import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "../../generic/generic.detail";
import { ZoneState } from 'app/model/api/assets/zone-state';


@Component({
    selector: 'zone-state-detail',
    templateUrl: 'zone-state.detail.html'
})
export class ZoneStateDetail extends GenericDetail<ZoneState, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new ZoneState();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}