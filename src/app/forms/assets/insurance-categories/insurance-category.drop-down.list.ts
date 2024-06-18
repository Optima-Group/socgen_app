import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { InsuranceCategory } from 'app/model/api/assets/insurance-category';

@Component({
    selector: 'insurance-category-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class InsuranceCategoryDropDownList extends GenericDropDownList<InsuranceCategory, number> {
    constructor() {
        super('name', 'asc');
    }
}