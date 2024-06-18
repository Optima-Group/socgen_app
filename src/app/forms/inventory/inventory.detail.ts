import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../generic/generic.detail';
import { Inventory } from 'app/model/api/inventory/inventory';
import { AccMonth } from 'app/model/api/accounting/acc-month';
import { AppConfig } from 'app/config';

@Component({
    selector: 'inventory-detail',
    templateUrl: 'inventory.detail.html',
    inputs: [ 'accMonthLink', 'accMonthSelectedEvent' ],
    outputs: ['accMonthNeeded']
})
export class InventoryDetail extends GenericDetail<Inventory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    protected accMonthRequired: boolean = AppConfig.ACCMONTH_REQUIRED;
    protected accMonthSelectedEvent: EventEmitter<AccMonth>;
    protected accMonthNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedAccMonth: AccMonth = null;
    private accMonthLink: boolean = false;

    private get inventoryActiveState(): string { return this.item.active ? 'Da' : 'Nu'; }

    setItemDefaultValues() {
        this.item = new Inventory(0, '', new Date, new Date, false, new AccMonth(0, 0, 0, false, new Date, new Date));
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((this.accMonthRequired) && (this.selectedAccMonth == null)) {
            alert('Luna contabila este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    private updateActive(active: boolean) {
        this.item.active = active;
    }

    public set accMonth(accMonth: AccMonth) {
        this.selectedAccMonth = accMonth;
        this.item.accMonth = accMonth != null ? new AccMonth(accMonth.id, accMonth.month, accMonth.year,
            accMonth.isActive, accMonth.createDate, accMonth.endDate) : null;
    }

    private askForAccMonth() {
        this.accMonthNeeded.emit();
    }

    private parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    // private get allowSaving(): boolean { return ((this.detailForm != null)
    // && (this.detailForm.form.valid) && (location != null)); }
}
