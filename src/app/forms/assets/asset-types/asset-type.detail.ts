import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetType } from '../../../model/api/assets/asset-type';

@Component({
    selector: 'asset-type-detail',
    templateUrl: 'asset-type.detail.html'
})
export class AssetTypeDetail extends GenericDetail<AssetType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetType();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}