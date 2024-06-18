import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetClass } from '../../../model/api/assets/asset-class';

@Component({
    selector: 'asset-class-detail',
    templateUrl: 'asset-class.detail.html'
})
export class AssetClassDetail extends GenericDetail<AssetClass, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetClass();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}