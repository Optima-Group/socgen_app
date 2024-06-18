export class AccountActivity {
    debit: string;
    credit: string;
    accValue: number;
    description: string;

    constructor(debit: string, credit: string, accValue: number, description: string) {
        this.debit = debit;
        this.credit = credit;
        this.accValue = accValue;
        this.description = description;
    }
}