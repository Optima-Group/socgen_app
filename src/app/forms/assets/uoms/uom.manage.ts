import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';

import { Uom } from 'app/model/api/assets/uom';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';

@Component({
    selector: 'uom-manage',
    templateUrl: 'uom.manage.html',
    providers: [ UomHttpService ]
})
export class UomManage extends GenericManage<Uom, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

     private filter: string = '';

    constructor(private uomHttpService: UomHttpService, private translate: TranslateService) {
        super();
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

 private exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.uomHttpService.get(1, 100000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Uom>) => {

                let options = {
                    sheetid: 'clients',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                            code as [Cod],
                            name as [Description]
                            INTO XLSX("Clients.xlsx", ?) FROM ?`, [ options, data.items ]);
            });

    }
}
