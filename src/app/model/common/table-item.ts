export class TableItem<T> {
    item: T;
    selected: boolean;

    constructor(item: T, selected: boolean) {
        this.item = item;
        this.selected = selected;
    }
}