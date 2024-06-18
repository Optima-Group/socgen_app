import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "app/forms/generic/generic.detail";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { Account } from 'app/model/api/administration/account';

@Component({
    selector: 'account-detail',
    templateUrl: 'account.detail.html'
})
export class AccountDetail extends GenericDetail<Account, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Account();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}