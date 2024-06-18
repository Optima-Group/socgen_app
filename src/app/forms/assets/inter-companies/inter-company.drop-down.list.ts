import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { InterCompany } from 'app/model/api/assets/inter-company';

@Component({
    selector: 'inter-company-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class InterCompanyDropDownList extends GenericDropDownList<InterCompany, number> {
    constructor() {
        super('name', 'asc');
    }
}