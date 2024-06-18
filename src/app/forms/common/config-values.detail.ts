
import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../generic/generic.detail';

import { CostCenter } from '../../model/api/administration/cost-center';
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AppConfig } from "app/config";
import { ConfigValue } from "app/model/api/common/config-value";

@Component({
    selector: 'config-values-detail',
    templateUrl: 'config-values.detail.html',
    outputs: ['admCenterNeeded']
})
export class ConfigValuesDetail extends GenericDetail<ConfigValue, number> {

    private isNumeric: boolean= false;
    private isDate: boolean= false;
    private isText: boolean= false;
    private isBoolean: boolean= false;

    private configValueType: string = '';

    setItemDefaultValues() {
        this.item = new ConfigValue();
    }

    protected saveItem() {
        super.saveItem();
    }

    public edit(item: ConfigValue) {
        super.edit(item);

        //this.configValueType = item.valueType === 'T'
    }

    private onConfigValueTypeUpdate(configValueType: string) {
        this.configValueType = configValueType;

        this.isNumeric = false;
        this.isDate = false;
        this.isText = false;
        this.isBoolean = false;

        switch(this.configValueType) {
            case 'TEXT':
                this.configValueType = 'Text';
                this.isText = true;
                this.item.valueType = 'T';
                break;
            case 'NUMERIC':
                this.configValueType = 'Numeric';
                this.isNumeric = true;
                this.item.valueType = 'N';
                break;
            case 'DATE':
                this.configValueType = 'Data';
                this.isDate = true;
                this.item.valueType = 'D';
                break;
            case 'BOOLEAN':
                this.configValueType = 'Da/nu';
                this.isBoolean = true;
                this.item.valueType = 'B';
                break;
        }
    }
}