export class TableItemEmployee<T> {
    item: T;
    selected: boolean;
    validated: boolean;

    constructor(item: T, selected: boolean, validated: boolean) {
        this.item = item;
        this.selected = selected;
        this.validated = validated;
    }
}