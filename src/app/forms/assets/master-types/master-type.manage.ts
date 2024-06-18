import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { MasterTypeHttpService } from 'app/services/http/assets/master-type.http.service';
import { MasterType } from 'app/model/api/assets/master-type';

@Component({
    selector: 'master-type-manage',
    templateUrl: 'master-type.manage.html',
    providers: [ MasterTypeHttpService ]
})
export class MasterTypeManage extends GenericManage<MasterType, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private masterTypeHttpService: MasterTypeHttpService, private translate: TranslateService) {
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

        this.masterTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<MasterType>) => {

                let options = {
                    sheetid: 'mastertype',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql.promise(`SELECT id as [Id],
                                    code as [Code],
                                    name as [Description]
                                    INTO XLSX("mastertype.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }
}
