
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AdmCenter } from '../../../model/api/administration/adm-center';
import { TranslateService } from '@ngx-translate/core';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from "app/theme/services";
import { Param } from "app/model/common/param";
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';

// @Component({
//     selector: 'adm-center-list',
//     templateUrl: 'adm-center.list.html'
// })
// export class AdmCenterList extends GenericTableList<AdmCenter, number> {

//     receiveData: string;
//     selectLang = this.receiveData;

//     constructor(private translate: TranslateService, private spinner: BaThemeSpinner) {
//         super('code', 'asc');

//         translate.use(this.receiveData);
//     }

//     public refresh(filters: Array<Param>) {
//         this.spinner.show();
//         super.refresh(filters);
//         this.spinner.hide();
//     }

// }


@Component({
    selector: 'adm-center-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AdmCenterList extends GenericTableList<AdmCenter, number> {
    private listName: string = 'ADMCENTERS';

    constructor(private translate: TranslateService) {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}