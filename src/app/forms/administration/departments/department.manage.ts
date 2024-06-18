import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { Department } from '../../../model/api/administration/department';
import { DepartmentDetail } from '../../../model/api/administration/department-detail';

import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { DepartmentDetailHttpService } from '../../../services/http/administration/department-detail.http.service';
import { DepartmentList } from './department.list';

@Component({
    selector: 'department-manage',
    templateUrl: 'department.manage.html',
    providers: [ DepartmentHttpService, DepartmentDetailHttpService ]
})
export class DepartmentManage extends GenericManage<Department, number> {

    @ViewChild('departmentDetailModal') modal: ModalDirective;
    @ViewChild('departmentList') departmentList: DepartmentList;
    @ViewChild('departmentDetail') departmentDetail: DepartmentDetail;


    private filter: string = '';

    constructor(private departmentHttpService: DepartmentHttpService,
        private departmentDetailHttpService: DepartmentDetailHttpService, private translate: TranslateService) {

        super();
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.departmentList.refresh(params);
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.departmentDetailHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<Department>) => {

                let options = {
                    sheetid: 'n1',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                            code as [Cod], 
                            name as [Denumire]
                            INTO XLSX("n+1.xlsx",?) FROM ?`, [ options, data.items ]);
            });

    }
}