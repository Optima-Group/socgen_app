import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { MasterType } from 'app/model/api/assets/master-type';


@Component({
    selector: 'master-type-detail',
    templateUrl: 'master-type.detail.html'
})
export class MasterTypeDetail extends GenericDetail<MasterType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new MasterType();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}