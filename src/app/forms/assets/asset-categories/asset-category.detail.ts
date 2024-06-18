import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetCategory } from '../../../model/api/assets/asset-category';

@Component({
    selector: 'asset-category-detail',
    templateUrl: 'asset-category.detail.html'
})
export class AssetCategoryDetail extends GenericDetail<AssetCategory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetCategory();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}