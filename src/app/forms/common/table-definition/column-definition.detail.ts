import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AppConfig } from "app/config";
import { ColumnDefinition } from "app/model/common/column-definition";
import { TableDefinition } from "app/model/common/table-definition";
import { RoleEntity } from 'app/model/api/common/role-entity';

@Component({
    selector: 'column-definition-detail',
    templateUrl: 'column-definition.detail.html',
    inputs: [ 'tableDefinitionLink', 'tableDefinitionSelectedEvent' ],
    outputs: ['tableDefinitionNeeded', 'roleNeeded']
})
export class ColumnDefinitionDetail extends GenericDetail<ColumnDefinition, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    protected tableDefinitionRequired: boolean = true;
    protected tableDefinitionSelectedEvent: EventEmitter<TableDefinition>;
    protected tableDefinitionNeeded: EventEmitter<void> = new EventEmitter<void>();

    protected roleNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedTableDefinition: TableDefinition = null;
    private selectedRole: RoleEntity = null;
    private tableDefinitionLink: boolean = false;

    setItemDefaultValues() {
        this.item = new ColumnDefinition('', '', '', '', 'left', '');
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set tableDefinition(tableDefinition: TableDefinition) {
        this.selectedTableDefinition = tableDefinition;
        this.item.tableDefinitionId = tableDefinition != null ? tableDefinition.id : null;
    }

    private askForTableDefinition() {
        this.tableDefinitionNeeded.emit();
    }

    public set role(role: RoleEntity) {
        this.selectedRole = role;
        this.item.roleId = role != null ? role.id : null;
    }

    private askForRole() {
        this.roleNeeded.emit();
    }

    protected saveItem() {
        if ((this.tableDefinitionRequired) && (this.selectedTableDefinition == null) && (this.selectedRole == null)) {
            alert('Rolul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    //private get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (tableDefinition != null)); }
}