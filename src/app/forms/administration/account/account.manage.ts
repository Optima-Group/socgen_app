import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { GenericManage } from "app/forms/generic/generic.manage";
import { Param } from "app/model/common/param";
import { PagedResult } from "app/model/common/paged-result";
import { AccountHttpService } from 'app/services/http/administration/account.http.service';
import { Account } from "app/model/api/administration/account";

@Component({
    selector: 'account-manage',
    templateUrl: 'account.manage.html',
    providers: [ AdmCenterHttpService ]
})
export class AccountManage extends GenericManage<Account, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private accountHttpService: AccountHttpService) {
        super();
    }

     protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.accountHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<Account>) => {

                let options = {
                    sheetid: 'centre_logistice',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    name as [Denumire] 
                    INTO XLSX("centre_logistice.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
