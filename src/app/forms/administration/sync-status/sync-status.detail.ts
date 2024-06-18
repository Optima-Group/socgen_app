import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from 'app/forms/generic/generic.detail';
import { SyncStatus } from 'app/model/api/administration/sync-status';

@Component({
    selector: 'sync-status-detail',
    templateUrl: 'sync-status.detail.html'
})
export class SyncStatusDetail extends GenericDetail<SyncStatus, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new SyncStatus();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}