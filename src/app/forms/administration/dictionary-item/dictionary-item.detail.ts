import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { AppConfig } from "app/config";
import { CodeNameEntity } from "app/model/api/common/code-name-entity";
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { AssetCategory } from 'app/model/api/assets/asset-category';

@Component({
    selector: 'dictionary-item-detail',
    templateUrl: 'dictionary-item.detail.html',
    inputs: [ 'dictionaryTypeLink', 'dictionaryTypeSelectedEvent', 'assetCategoryLink', 'assetCategorySelectedEvent' ],
    outputs: ['dictionaryTypeNeeded', 'assetCategoryNeeded']
})
export class DictionaryItemDetail extends GenericDetail<DictionaryItem, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    protected dictionaryTypeRequired: boolean = AppConfig.ROOM_LOCATION_REQUIRED;
    protected dictionaryTypeSelectedEvent: EventEmitter<DictionaryType>;
    protected dictionaryTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    protected assetCategorySelectedEvent: EventEmitter<AssetCategory>;
    protected assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedDictionaryType: DictionaryType = null;
    private selectedAssetCategory: AssetCategory = null;
    private dictionaryTypeLink: boolean = false;
    private assetCategoryLink: boolean = false;

    setItemDefaultValues() {
        this.item = new DictionaryItem(0, '', '', null, null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set dictionaryType(dictionaryType: DictionaryType) {
        this.selectedDictionaryType = dictionaryType;
        this.item.dictionaryType = dictionaryType != null ? new CodeNameEntity(dictionaryType.id, dictionaryType.code, dictionaryType.name) : null;
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    private askForDictionaryType() {
        this.dictionaryTypeNeeded.emit();
    }

    private askForAssetCategory() {
        this.assetCategoryNeeded.emit();
    }

    protected saveItem() {
        if ((this.dictionaryTypeRequired) && (this.selectedDictionaryType == null)) {
            alert('Directia este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    //private get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}