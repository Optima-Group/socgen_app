import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AppConfig } from 'app/config';
import { AssetEntity } from 'app/model/api/common/asset-entity';
import { AssetType } from 'app/model/api/assets/asset-type';
import { AssetComponent } from 'app/model/api/assets/asset-component';
import { Asset } from 'app/model/api/assets/asset';
import { Employee } from 'app/model/api/administration/employee';
import { EmployeeResource } from 'app/model/api/administration/employee-resource';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { Param } from 'app/model/common/param';
import { EntityFileList } from 'app/forms/common/entity-file.list';
import { SubType } from 'app/model/api/administration/sub-type';
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';

@Component({
    selector: 'asset-component-detail',
    templateUrl: 'asset-component.detail.html',
    inputs: [ 'assetLink', 'assetSelectedEvent', 'employeeLink', 'employeeSelectedEvent', 'subTypeLink', 'subTypeSelectedEvent'],
    outputs: ['assetNeeded', 'employeeNeeded', 'subTypeNeeded'],
    providers: [EntityFileHttpService]
})
export class AssetComponentDetail extends GenericDetail<AssetComponent, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;
    @ViewChild('entityFileList') public entityFileList: EntityFileList;
    private entityTypeCode: string = 'ASSETCOMPONENT';
    protected assetRequired: boolean = AppConfig.ASSET_REQUIRED;
    protected assetSelectedEvent: EventEmitter<Asset>;
    protected assetNeeded: EventEmitter<void> = new EventEmitter<void>();

    protected employeeRequired: boolean = AppConfig.EMPLOYEE_REQUIRED;
    protected employeeSelectedEvent: EventEmitter<Employee>;
    protected employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    protected subTypeSelectedEvent: EventEmitter<SubType>;
    protected subTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedAsset: Asset = null;
    private assetLink: boolean = false;

    private selectedEmployee: Employee = null;
    private employeeLink: boolean = false;

    private quantity = 1;


    private selectedSubType: SubType = null;
    private subTypeLink: boolean = false;
    /**
     *
     */
    constructor( private entityFileHttpService: EntityFileHttpService) {
        super();
        this.quantity = 1;

    }

    setItemDefaultValues() {
    this.item = new AssetComponent(0, '', '', null, null, null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        // if ((this.assetRequired) && (this.selectedAsset == null)) {
        //     alert('Parintele este obligatoriu!');
        // }
        // else {

        // }

        let qty = this.quantity != null ? this.quantity : 1;
        let code= this.item.code;
        let name= this.item.name;
        let asset = this.item.asset;
        let employee = this.item.employee;
        let subType = this.item.subType;
        let id = this.item.id;

        for (let index = 1; index <= qty; index++) {
          this.item.id = id;
          this.item.code = id === 0 ? code + index : code;
          this.item.name = name;
          this.item.asset = asset;
          this.item.employee = employee;
          this.item.subType = subType;
          super.saveItem();
        }

    }

    public set asset(asset: Asset) {
        this.selectedAsset = asset;
        this.item.asset = asset != null ? new AssetEntity(asset.id, asset.invNo, asset.name) : null;
    }

    private askForAsset() {
        this.assetNeeded.emit();
    }

    public set employee(employee: Employee) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName) : null;
    }

    private askForEmployee() {
        this.employeeNeeded.emit();
    }

    private refreshEntityFiles(){
    let params: Array<Param> = new Array<Param>();
    params.push(new Param('entityTypeCode', 'ASSETCOMPONENT'));
    params.push(new Param('entityId', this.item.id.toString()));
    this.entityFileList.refresh(params);

    }

    public set subType(subType: SubType) {
        this.selectedSubType = subType;
        this.item.subType = subType != null ? new CodeNameEntity(subType.id, subType.code, subType.name) : null;
    }

    private askForSubType() {
        this.subTypeNeeded.emit();
    }

}
