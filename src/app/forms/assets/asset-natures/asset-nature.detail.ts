import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { AppConfig } from 'app/config';

@Component({
    selector: 'asset-nature-detail',
    templateUrl: 'asset-nature.detail.html',
    outputs: ['assetTypeNeeded']
})
export class AssetNatureDetail extends GenericDetail<AssetNature, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected assetTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedAssetType: AssetType;

    setItemDefaultValues() {
        this.item = new AssetNature(0, '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedAssetType == null)) {
            alert('Asset Type este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set assetType(assetType: AssetType) {
        this.setAssetType(assetType);
    }

    private setAssetType(assetType: AssetType) {
        this.selectedAssetType = assetType;
        this.item.assetTypeId = assetType != null ? assetType.id : null;
    }

    private askForAssetType() {
        this.assetTypeNeeded.emit();
    }
}