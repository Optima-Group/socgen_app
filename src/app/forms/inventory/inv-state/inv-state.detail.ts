import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "app/forms/generic/generic.detail";
import { InvState } from "app/model/api/inventory/inv-state";

@Component({
    selector: 'inv-state-detail',
    templateUrl: 'inv-state.detail.html'
})
export class InvStateDetail extends GenericDetail<InvState, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new InvState();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}