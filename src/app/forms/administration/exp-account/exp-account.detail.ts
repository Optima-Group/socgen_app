import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "app/forms/generic/generic.detail";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { Account } from 'app/model/api/administration/account';
import { ExpAccount } from 'app/model/api/administration/exp-account';

@Component({
    selector: 'exp-account-detail',
    templateUrl: 'exp-account.detail.html'
})
export class ExpAccountDetail extends GenericDetail<ExpAccount, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Account();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}