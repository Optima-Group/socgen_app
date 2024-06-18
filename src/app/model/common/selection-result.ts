export class SelectionResult<T> {
    item: T;
    entityType: string;

    constructor(item: T, entityType: string) {
        this.item = item;
        this.entityType = entityType;
    }
}