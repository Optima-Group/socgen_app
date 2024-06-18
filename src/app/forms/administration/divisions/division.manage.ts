import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Division } from '../../../model/api/administration/division';

import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { DivisionDetail } from "app/forms/administration/divisions/division.detail";
import { AppUtils } from "app/common/app.utils";
import { DivisionList } from "app/forms/administration/divisions/division.list";

@Component({
    selector: 'division-manage',
    templateUrl: 'division.manage.html',
    providers: [ DivisionHttpService ]
})
export class DivisionManage extends GenericManage<Division, number> {

    @ViewChild('divisionDetailModal') divisionDetailModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionList;
    @ViewChild('divisionDetail') divisionDetail: DivisionDetail;

    private filter: string = '';

    constructor(private divisionHttpService: DivisionHttpService, private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();
    }

    protected editItem() {
        super.editItem();

        let division: Division = this.selectedItem as Division;

    }

    protected detailInitialize() {
        super.detailInitialize();
        this.divisionDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.divisionDetailModal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.divisionList.refresh(params);
    }

    private exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.divisionHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Division>) => {

                let options = {
                    sheetid: 'Buildings',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Cod], 
                    name as [Denumire] 
                    INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

            });

    }
}
