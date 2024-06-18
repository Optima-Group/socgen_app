import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { saveAs as fileSaveAs } from "file-saver";

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';

import { AppUtils } from "app/common/app.utils";
import { TableDefinition } from "app/model/common/table-definition";
import { ColumnDefinition } from "app/model/common/column-definition";
import { ColumnDefinitionList } from "app/forms/common/table-definition/column-definition.list";
import { TableDefinitionList } from "app/forms/common/table-definition/table-definition.list";
import { ColumnDefinitionHttpService } from '../../../services/http/common/column-definition.http.service';
import { TableDefinitionHttpService } from "app/services/http/common/table-definition.http.service";
import { ColumnDefinitionDetail } from "app/forms/common/table-definition/column-definition.detail";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { RoleList } from 'app/forms/auth/role.list';
import { RoleEntity } from 'app/model/api/common/role-entity';
import { RoleService } from 'app/services/http/identity/role.service';


@Component({
    selector: 'table-definition-manage',
    templateUrl: 'table-definition.manage.html',
    providers: [ ColumnDefinitionHttpService, TableDefinitionHttpService ]
})
export class TableDefinitionManage extends GenericManage<TableDefinition, number> {

    @ViewChild('columnDefinitionDetailModal') columnDefinitionDetailModal: ModalDirective;
    @ViewChild('columnDefinitionList') columnDefinitionList: ColumnDefinitionList;
    @ViewChild('columnDefinitionDetail') columnDefinitionDetail: ColumnDefinitionDetail;
    @ViewChild('tableDefinitionListModal') tableDefinitionListModal: ModalDirective;
    @ViewChild('tableDefinitionList') tableDefinitionList: TableDefinitionList;
    @ViewChild('roleListModal') roleListModal: ModalDirective;
    @ViewChild('roleList') roleList: RoleList;


    @ViewChild('fileInput') fileInput: ElementRef;

    private filter: string = '';
    private selectedTableDefinition: TableDefinition = null;
    private selectedRole: RoleEntity = null;

    constructor(private tableDefinitionHttpService: TableDefinitionHttpService, private columnDefinitionHttpService: ColumnDefinitionHttpService, private roleHttpService: RoleService,
        private sanitizer: DomSanitizer) {

        super();
    }

    private download() {
        this.tableDefinitionHttpService.download().subscribe((blob) => {
            fileSaveAs(blob, 'table_definition.json');
        });
    }

    upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.tableDefinitionHttpService
                .upload(fileToUpload)
                .subscribe(res => {
                    //this.uploadFinished.emit(null);
                });
        }
    }

    protected addNewItem() {
        super.addNewItem();

        this.columnDefinitionDetail.tableDefinition = null;
        this.columnDefinitionDetail.role = null;
    }

    protected editItem() {
        super.editItem();

        let columnDefinition: ColumnDefinition = this.selectedItem as ColumnDefinition;

        this.columnDefinitionDetail.tableDefinition = null;
        if (columnDefinition != null  && columnDefinition.tableDefinitionId != null) {
            this.tableDefinitionHttpService
                .getById(columnDefinition.tableDefinitionId)
                .subscribe((tableDefinition: TableDefinition) => {
                    this.columnDefinitionDetail.tableDefinition = tableDefinition;
                });
        }

        this.columnDefinitionDetail.role = null;
        if (columnDefinition != null && columnDefinition.roleId != null) {
            this.roleHttpService
                .getDetailById(columnDefinition.roleId)
                .subscribe((role: RoleEntity) => {
                    this.columnDefinitionDetail.role = role;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.columnDefinitionDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.columnDefinitionDetailModal.hide();
    }

    private onColumnDefinitionDetailTableDefinitionNeeded() {
        this.columnDefinitionDetailModal.hide();
        this.selectTableDefinition();
    }

    private onTableDefinitionListCancel() {
        this.tableDefinitionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.columnDefinitionDetailModal.show();
        }
    }


    private onColumnDefinitionDetailRoleNeeded() {
        this.columnDefinitionDetailModal.hide();
        this.selectRole();
    }

    private onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.columnDefinitionDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("tableDefinitionIds", AppUtils.getIdsList<TableDefinition, number>([ this.selectedTableDefinition ])));
        params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));

        this.columnDefinitionList.refresh(params);
    }

    private selectTableDefinition() {
        this.tableDefinitionListModal.show();
        this.tableDefinitionList.refresh(null);
    }

    private setSelectedTableDefinition() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedTableDefinition = this.tableDefinitionList.selectedItem;
                this.tableDefinitionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.columnDefinitionDetail.tableDefinition = this.tableDefinitionList.selectedItem;
                this.tableDefinitionListModal.hide();
                this.columnDefinitionDetailModal.show();
                break;
        }
    }

    private unselectTableDefinition() {
        this.selectedTableDefinition = null;
        this.refresh();
    }


    private selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    private setSelectedRole() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRole = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.columnDefinitionDetail.role = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.columnDefinitionDetailModal.show();
                break;
        }
    }

    private unselectRole() {
        this.selectedRole = null;
        this.refresh();
    }
}
