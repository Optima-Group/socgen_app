import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { AppConfig } from "app/config";
import { DictionaryType } from 'app/model/api/administration/dictionary-type';

@Component({
    selector: 'dictionary-type-detail',
    templateUrl: 'dictionary-type.detail.html'
})
export class DictionaryTypeDetail extends GenericDetail<DictionaryType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new DictionaryType(0, '', '');
    }

    protected resetForm() {
        this.detailForm.reset();
    }



    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) ) {
            alert('Regiunea este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }
}