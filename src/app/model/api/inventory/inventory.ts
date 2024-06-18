import { AccMonth } from "../accounting/acc-month";

export class Inventory {
    id: number;
    description: string;
    start: Date;
    end: Date;
    active: boolean;
    accMonth: AccMonth;

    constructor (id: number, description: string, start: Date, end: Date, active: boolean, accMonth: AccMonth) {
        this.id = id;
        this.description = description;
        this.start = start;
        this.end = end;
        this.active = active;
        this.accMonth = accMonth;
    }
}