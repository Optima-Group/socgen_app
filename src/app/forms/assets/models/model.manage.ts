import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { Model } from 'app/model/api/assets/model';
import { ModelHttpService } from 'app/services/http/assets/model.http.service';

@Component({
    selector: 'model-manage',
    templateUrl: 'model.manage.html',
    providers: [ ModelHttpService ]
})
export class ModelManage extends GenericManage<Model, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private modelHttpService: ModelHttpService, private translate: TranslateService) {
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

        this.modelHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Model>) => {

                let options = {
                    sheetid: 'models',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql.promise(`SELECT id as [Id],
                                    code as [Cod],
                                    name as [Denumire]
                                    INTO XLSX("models.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }
}
