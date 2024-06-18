import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Model } from 'app/model/api/assets/model';


@Component({
    selector: 'model-detail',
    templateUrl: 'model.detail.html'
})
export class ModelDetail extends GenericDetail<Model, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Model();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}