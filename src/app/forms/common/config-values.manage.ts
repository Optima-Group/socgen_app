import { ConfigValuesHttpService } from './../../services/http/common/config-values.service';
import { PagedResult } from './../../model/common/paged-result';
import { Param } from './../../model/common/param';
import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { saveAs as fileSaveAs } from "file-saver";

import { GenericManage, GenericManageViewMode } from '../generic/generic.manage';
import { CostCenter } from '../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../services/http/administration/cost-center.http.service';
import { TranslateService } from '@ngx-translate/core';
import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { AppUtils } from "app/common/app.utils";
import { CostCenterList } from "app/forms/administration/cost-centers/cost-center.list";
import { CostCenterDetail } from "app/forms/administration/cost-centers/cost-center.detail";
import { ConfigValue } from "app/model/api/common/config-value";


@Component({
    selector: 'config-values-manage',
    templateUrl: 'config-values.manage.html',
    providers: [ ConfigValuesHttpService],

})
export class ConfigValuesManage extends GenericManage<ConfigValue, number> {

    @ViewChild('configValueDetail') public configValueDetail: CostCenterDetail;
    @ViewChild('configValueList') public configValueList: CostCenterList;
    @ViewChild('configValueDetailModal') configValueDetailModal: ModalDirective;

    @ViewChild('fileInput') fileInput: ElementRef;

    private filter: string = '';

    constructor(private configValuesHttpService: ConfigValuesHttpService,
                private translate: TranslateService) {
        super();
    }

    private download() {
        this.configValuesHttpService.download().subscribe((blob) => {
            fileSaveAs(blob, 'config_values.json');
        });
    }

    upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.configValuesHttpService
                .upload(fileToUpload)
                .subscribe(res => {
                    //this.uploadFinished.emit(null);
                });
        }
    }

    protected addNewItem() {
        super.addNewItem();
    }

    protected editItem() {
        super.editItem();
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.configValueDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.configValueDetailModal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.configValueList.refresh(params);
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.configValuesHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<ConfigValue>) => {

                let options = {
                    sheetid: 'CostCenters',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Cod],
                    description as [Descriere],
                    [valueType] as [Tip],
                    numericValue as [Valoare numerica],
                    textValue as [Valoare text],
                    dateValue as [Valoare data],
                    boolValue as [Valoare bool]
                    
                    INTO XLSX("configValues.xlsx",?) FROM ?`, [ options,  data.items ]);

            });
    }
}
