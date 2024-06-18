import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { AssetClass } from '../../../model/api/assets/asset-class';

import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';

@Component({
    selector: 'asset-class-manage',
    templateUrl: 'asset-class.manage.html',
    providers: [ AssetClassHttpService ]
})
export class AssetClassManage extends GenericManage<AssetClass, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private assetClassHttpService: AssetClassHttpService, private translate: TranslateService) {
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

        this.assetClassHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<AssetClass>) => {

                let options = {
                    sheetid: 'classes',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql.promise(`SELECT id as [Id], 
                                    code as [Cod], 
                                    name as [Denumire]
                                    INTO XLSX("classes.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }
}
