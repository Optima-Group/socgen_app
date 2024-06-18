import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";
import { AccountHttpService } from 'app/services/http/administration/account.http.service';
import { ExpAccountList } from './exp-account.list';
import { ExpAccountHttpService } from 'app/services/http/administration/exp-account.http.service';

@Component({
    selector: 'exp-account-selection',
    templateUrl: 'exp-account.selection.html',
    providers: [ AdmCenterHttpService ]
})
export class ExpAccountSelection {

    @Input() itemSelection: string;

    @ViewChild('expAccountListModal') modal: ModalDirective;
    @ViewChild('expAccountList') public expAccountList: ExpAccountList;

    private filter: string = '';

    constructor(private expAccountHttpService: ExpAccountHttpService) {
    }

    private selectAccounts() {
        this.modal.show();
        this.expAccountList.refresh(null);
    }
}
