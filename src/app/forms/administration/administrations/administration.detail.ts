import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { AppConfig } from "app/config";
import { CodeNameEntity } from "app/model/api/common/code-name-entity";
import { CostCenter } from 'app/model/api/administration/cost-center';

@Component({
    selector: 'administration-detail',
    templateUrl: 'administration.detail.html',
    inputs: [ 'divisionLink', 'divisionSelectedEvent' ],
    outputs: ['divisionNeeded', 'costCenterNeeded']
})
export class AdministrationDetail extends GenericDetail<Administration, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    protected divisionRequired: boolean = AppConfig.DIVISION_REQUIRED;
    protected divisionSelectedEvent: EventEmitter<Division>;
    protected divisionNeeded: EventEmitter<void> = new EventEmitter<void>();

    protected costCenterRequired: boolean = AppConfig.COSTCENTER_REQUIRED;
    protected costCenterSelectedEvent: EventEmitter<CostCenter>;
    protected costCenterNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedDivision: Division = null;
    private divisionLink: boolean = false;

    private selectedCostCenter: CostCenter = null;
    private costCenterLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Administration(0, '', '', null, null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((this.divisionRequired) && (this.selectedDivision == null)) {
            alert('Structura este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    public set division(division: Division) {
        this.selectedDivision = division;
        this.item.division = division != null ? new CodeNameEntity(division.id, division.code, division.name) : null;
    }

    private askForDivision() {
        this.divisionNeeded.emit();
    }

    public set costCenter(costCenter: CostCenter) {
        this.selectedCostCenter = costCenter;
        this.item.costCenter = costCenter != null ? new CodeNameEntity(costCenter.id, costCenter.code, costCenter.name) : null;
    }

    private askForCostCenter() {
        this.costCenterNeeded.emit();
    }


    // private get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}
