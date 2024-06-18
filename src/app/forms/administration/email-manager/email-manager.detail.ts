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
import { EmailManager } from 'app/model/api/administration/email-manager';
import { EmailType } from 'app/model/api/administration/email-type';

@Component({
    selector: 'email-manager-detail',
    templateUrl: 'email-manager.detail.html',
    inputs: [ 'emailTypeLink', 'emailTypeSelectedEvent'],
    outputs: ['emailTypeNeeded']
})
export class EmailManagerDetail extends GenericDetail<EmailManager, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    protected emailTypeRequired: boolean = AppConfig.EMAIL_MANAGER_REQUIRED;
    protected emailTypeSelectedEvent: EventEmitter<DictionaryType>;
    protected emailTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedEmailType: EmailType = null;
    private emailTypeLink: boolean = false;

    setItemDefaultValues() {
        this.item = new EmailManager(0, '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set emailType(emailType: EmailType) {
        this.selectedEmailType = emailType;
        this.item.emailType = emailType != null ? new CodeNameEntity(emailType.id, emailType.code, emailType.name) : null;
    }


    private askForEmailType() {
        this.emailTypeNeeded.emit();
    }


    protected saveItem() {
        if ((this.emailTypeRequired) && (this.selectedEmailType == null)) {
            alert('Tipul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    //private get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}