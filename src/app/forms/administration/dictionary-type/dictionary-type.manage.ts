import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { DictionaryTypeHttpService } from 'app/services/http/administration/dictionary-type.http.service';
import { DictionaryTypeDetail } from './dictionary-type.detail';
import { DictionaryTypeList } from './dictionary-type.list';

@Component({
    selector: 'dictionary-type-manage',
    templateUrl: 'dictionary-type.manage.html',
    providers: [ DictionaryTypeHttpService ]
})
export class DictionaryTypeManage extends GenericManage<DictionaryType, number> {

    @ViewChild('dictionaryTypeDetailModal') dictionaryTypeDetailModal: ModalDirective;
    @ViewChild('dictionaryTypeList') dictionaryTypeList: DictionaryTypeList;
    @ViewChild('dictionaryTypeDetail') dictionaryTypeDetail: DictionaryTypeDetail;

    private filter: string = '';

    constructor(private dictionaryTypeHttpService: DictionaryTypeHttpService, private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();
    }

    protected editItem() {
        super.editItem();

        let dictionaryType: DictionaryType = this.selectedItem as DictionaryType;

    }

    protected detailInitialize() {
        super.detailInitialize();
        this.dictionaryTypeDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.dictionaryTypeDetailModal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.dictionaryTypeList.refresh(params);
    }

    private exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.dictionaryTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<DictionaryType>) => {

                let options = {
                    sheetid: 'items-type',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Code], 
                    name as [Type] 
                    INTO XLSX("items-type.xlsx",?) FROM ?`, [ options, data.items ]);

            });

    }
}
