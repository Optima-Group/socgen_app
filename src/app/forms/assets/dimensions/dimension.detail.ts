import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AppConfig } from 'app/config';
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetType } from 'app/model/api/assets/asset-type';
import { Dimension } from 'app/model/api/administration/dimension';

@Component({
    selector: 'dimension-detail',
    templateUrl: 'dimension.detail.html',
    inputs: [ 'assetCategoryLink', 'assetCategorySelectedEvent'],
    outputs: ['assetCategoryNeeded']
})
export class DimensionDetail extends GenericDetail<Dimension, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    protected assetCategoryRequired: boolean = AppConfig.DIMENSION_REQUIRED;
    protected assetCategorySelectedEvent: EventEmitter<AssetCategory>;
    protected assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedAssetCategory: AssetCategory = null;
    private assetCategoryLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Dimension(0, '', '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((this.assetCategoryRequired) && (this.selectedAssetCategory == null)) {
            alert('Tipul de inventariere este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    private askFCitysetCategory() {
        this.assetCategoryNeeded.emit();
    }

}
