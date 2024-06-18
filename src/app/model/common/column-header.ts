export class ColumnHeader {
    header: string;
    property: string;
    sortBy: string;

    constructor (header: string, property: string, sortBy: string) {
        this.header = header;
        this.property = property;
        this.sortBy = sortBy;
    }
}