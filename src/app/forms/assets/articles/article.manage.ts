import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { AssetType } from 'app/model/api/assets/asset-type';
import { AssetTypeHttpService } from 'app/services/http/assets/asset-type.http.service';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { AssetNatureHttpService } from 'app/services/http/assets/asset-nature.http.service';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { BudgetManagerHttpService } from 'app/services/http/assets/budget-manager.http.service';
import { Article } from 'app/model/api/assets/article';
import { ArticleHttpService } from 'app/services/http/assets/article.http.service';

@Component({
    selector: 'article-manage',
    templateUrl: 'article.manage.html',
    providers: [ AssetTypeHttpService ]
})
export class ArticleManage extends GenericManage<Article, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private articleHttpService: ArticleHttpService, private translate: TranslateService) {
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

        this.articleHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<AssetNature>) => {

                let options = {
                    sheetid: 'clase',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql.promise(`SELECT id as [Id],
                                    code as [Cod],
                                    name as [Denumire],
                                    depPeriodMin as [Durata minima],
                                    depPeriodMax as [Durata maxima],
                                    depPeriodDefault as [Durata implicita]
                                    INTO XLSX("clase.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }
}
