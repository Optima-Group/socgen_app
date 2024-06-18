import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TableDefinition } from "app/model/common/table-definition";
import { ColumnDefinition } from "app/model/common/column-definition";


@Component({
    selector: 'table-definition-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class TableDefinitionList extends GenericTableList<TableDefinition, number> {
    constructor() {
        super('name', 'asc');

        // this.columns = new Array<ColumnDefinition>();
        this.columns.push(new ColumnDefinition('Cod', 'code', '', 'Code', 'left', ''));
        this.columns.push(new ColumnDefinition('Nume', 'name', '', 'Name', 'left', ''));
        this.columns.push(new ColumnDefinition('Descriere', 'description', '', 'Description', 'left', ''));

        // this.columns = [
        //     { id: 0, headerCode: 'ASSET_INVNO', property: 'code', include: '', sortBy: 'Code', textAlign: 'left', pipe: undefined, format: undefined, position: 0 },
        //     { id: 0, headerCode: 'ASSET_INVNO', property: 'name', include: '', sortBy: 'Name', textAlign: 'left', pipe: undefined, format: undefined, position: 1 },
        //     { id: 0, headerCode: 'ASSET_INVNO', property: 'description', include: '', sortBy: 'Description', textAlign: 'left', pipe: undefined, format: undefined, position: 2 }
        // ];
    }
}