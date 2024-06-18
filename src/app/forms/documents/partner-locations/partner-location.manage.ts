import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';

import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Param } from 'app/model/common/param';
import { PagedResult } from 'app/model/common/paged-result';
import { PartnerLocation } from 'app/model/api/documents/partner-location';
import { PartnerLocationHttpService } from 'app/services/http/documents/partner-location.http.service.';

@Component({
    selector: 'partner-location-manage',
    templateUrl: 'partner-location.manage.html',
    providers: [ PartnerHttpService ]
})
export class PartnerLocationManage extends GenericManage<PartnerLocation, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private partnerLocationHttpService: PartnerLocationHttpService, private translate: TranslateService) {
        super();
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
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

        this.partnerLocationHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<PartnerLocation>) => {

                let options = {
                    sheetid: 'partner-location',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                    name as [Denumire]
                    INTO XLSX("partner-location.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
