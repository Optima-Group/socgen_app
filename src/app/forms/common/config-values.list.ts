

import { Component } from '@angular/core';
import { GenericTableList } from '../generic/generic.table.list';

import { CostCenter } from '../../model/api/administration/cost-center';
import { TranslateService } from '@ngx-translate/core';
import { ConfigValue } from "app/model/api/common/config-value";




@Component({
    selector: 'config-values-list',
    templateUrl: 'config-values.list.html'
})
export class ConfigValuesList extends GenericTableList<ConfigValue, number> {

    receiveData: string;
    selectLang = this.receiveData;

    constructor(private translate: TranslateService) {
        super('code', 'asc');

        translate.use(this.receiveData);
    }

}