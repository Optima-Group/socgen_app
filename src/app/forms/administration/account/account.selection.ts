// import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
// import { ModalDirective } from 'ng2-bootstrap';
// import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
// import { AdmCenter } from "app/model/api/administration/adm-center";
// import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";
// import { AccountHttpService } from 'app/services/http/administration/account.http.service';
// import { AccountList } from './account.list';

// @Component({
//     selector: 'account-selection',
//     templateUrl: 'account.selection.html',
//     providers: [ AdmCenterHttpService ]
// })
// export class AccountSelection {

//     @Input() itemSelection: string;

//     @ViewChild('accountListModal') modal: ModalDirective;
//     @ViewChild('accountList') public accountList: AccountList;

//     private filter: string = '';

//     constructor(private accountHttpService: AccountHttpService) {
//     }

//     private selectAccounts() {
//         this.modal.show();
//         this.accountList.refresh(null);
//     }
// }
