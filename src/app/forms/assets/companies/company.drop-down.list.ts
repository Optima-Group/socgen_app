import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { Company } from 'app/model/api/assets/company';

@Component({
    selector: 'company-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class CompanyDropDownList extends GenericDropDownList<Company, number> {
    constructor() {
        super('name', 'asc');
    }
}