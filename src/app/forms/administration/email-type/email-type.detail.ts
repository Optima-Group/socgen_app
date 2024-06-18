import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { AppConfig } from "app/config";
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { EmailType } from 'app/model/api/administration/email-type';

@Component({
    selector: 'email-type-detail',
    templateUrl: 'email-type.detail.html'
})
export class EmailTypeDetail extends GenericDetail<EmailType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    private enabled  = false;
    setItemDefaultValues() {
        this.item = new EmailType(0, '', '', '', false, null, null, 0, null, '', '', '');
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public edit(item: EmailType) {

        super.edit(item);
        this.enabled = item.notifyEnabled;
    }



    protected saveItem() {
        this.item.notifyEnabled = this.enabled;
        if ((AppConfig.EMAIL_TYPE_REQUIRED) ) {
            alert('Tipul este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    private setNotifyEnabled(enabled: boolean) {
        this.item.notifyEnabled = enabled;
        this.enabled = enabled;
    }

    private parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }
}