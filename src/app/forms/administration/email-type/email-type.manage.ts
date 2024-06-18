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
import { EmailTypeHttpService } from 'app/services/http/administration/email-type.http.service';
import { EmailType } from 'app/model/api/administration/email-type';
import { EmailTypeDetail } from './email-type.detail';
import { EmailTypeList } from './email-type.list';

@Component({
    selector: 'email-type-manage',
    templateUrl: 'email-type.manage.html',
    styleUrls: ['email-type.manage.scss'],
    providers: [ EmailTypeHttpService ]
})
export class EmailTypeManage extends GenericManage<EmailType, number> {

    @ViewChild('emailTypeDetailModal') emailTypeDetailModal: ModalDirective;
    @ViewChild('emailTypeList') emailTypeList: EmailTypeList;
    @ViewChild('emailTypeDetail') emailTypeDetail: EmailTypeDetail;

    private filter: string = '';

    constructor(private emailTypeHttpService: EmailTypeHttpService, private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();
    }

    protected editItem() {
        super.editItem();

        let emailType: EmailType = this.selectedItem as EmailType;

    }

    protected detailInitialize() {
        super.detailInitialize();
        this.emailTypeDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.emailTypeDetailModal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.emailTypeList.refresh(params);
    }

    private exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.emailTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<DictionaryType>) => {

                let options = {
                    sheetid: 'email-type',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Code], 
                    name as [Type] 
                    INTO XLSX("email-type.xlsx",?) FROM ?`, [ options, data.items ]);

            });

    }
}
