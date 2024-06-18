import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from "app/forms/generic/generic.detail";
import { AccMonth } from "app/model/api/accounting/acc-month";

@Component({
    selector: 'acc-month-detail',
    templateUrl: 'acc-month.detail.html'
})
export class AccMonthDetail extends GenericDetail<AccMonth, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    private get accMonthActiveState(): string { return this.item.isActive ? 'Da' : 'Nu'; }

    setItemDefaultValues() {
        let date = new Date();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let firstDay = this.firstDayofMonth();
        let lastDay = this.getLastDayOfMonth();
        this.item = new AccMonth(null, month, year, false, firstDay, lastDay);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    private updateActive(active: boolean) {
        this.item.isActive = active;
    }

    private firstDayofMonth() {
        let d = new Date();
        d.setMonth(d.getMonth() , 1);
        return d;
    }

    private  getLastDayOfMonth(){
        let today = new Date();
        return new Date(today.getFullYear(),today.getMonth() + 1, 0);
    }
}