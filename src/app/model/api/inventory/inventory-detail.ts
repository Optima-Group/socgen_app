import { Inventory } from './inventory';
import { AccMonth } from '../accounting/acc-month';

export class InventoryDetail extends Inventory {
    accMonthMonth: number;
    accMonthYear: number;

    constructor (id: number, description: string, start: Date, end: Date, active: boolean,
        accMonthId: number, accMonthMonth: number, accMonthYear: number) {
        super(id, description, start, end, active, new AccMonth(accMonthId, accMonthMonth,
            accMonthYear, active, start, end));
        this.accMonthMonth = accMonthMonth;
        this.accMonthYear = accMonthYear;
    }
}