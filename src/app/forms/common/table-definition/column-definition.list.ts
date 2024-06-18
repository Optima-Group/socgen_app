import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { ColumnDefinition } from "app/model/common/column-definition";


@Component({
    selector: 'column-definition-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ColumnDefinitionList extends GenericTableList<ColumnDefinition, number> {
    constructor() {
        super('position', 'asc');

        // this.columns = new Array<ColumnDefinition>();
        this.columns.push(new ColumnDefinition('Header', 'headerCode', '', 'HeaderCode', 'left', ''));
        this.columns.push(new ColumnDefinition('Mapping', 'property', '', 'Property', 'left', ''));
        this.columns.push(new ColumnDefinition('Path', 'include', '', 'Include', 'left', ''));
        this.columns.push(new ColumnDefinition('Sort', 'sortBy', '', 'SortBy', 'left', ''));
        this.columns.push(new ColumnDefinition('Position', 'position', '', 'Position', 'right', ''));
        this.columns.push(new ColumnDefinition('Activ', 'active', '', 'Active', 'left', ''));
        this.columns.push(new ColumnDefinition('As', 'pipe', '', 'Pipe', 'left', ''));
        this.columns.push(new ColumnDefinition('Format', 'format', '', 'Format', 'left', ''));

        // this.columns = [
        //     { id: 0, headerCode: 'ASSET_INVNO', property: 'headerCode', include: '', sortBy: 'HeaderCode', textAlign: 'left', pipe: undefined, format: undefined, position: 0 }
        // ];
    }
}