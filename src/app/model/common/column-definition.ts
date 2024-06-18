export class ColumnDefinition {
    id: number;
    tableDefinitionId: number;
    headerCode: string;
    property: string;
    include: string;
    sortBy: string;
    pipe: string;
    format: string;
    textAlign: string;
    position: number;
    active: boolean;
    roleId: string;

    constructor (headerCode: string, property: string, include: string, sortBy: string, textAlign: string, roleId: string, 
        pipe?: string, format?: string, id?: number, tableDefinitionId?: number, active?: boolean) {

        this.headerCode = headerCode;
        this.property = property;
        this.include = include;
        this.sortBy = sortBy;
        this.textAlign = textAlign;
        if (pipe) this.pipe = pipe;
        if (format) this.format = format;
        if (id) this.id = id;
        if (tableDefinitionId) this.tableDefinitionId = tableDefinitionId;
        if (active) this.active = active;
        this.roleId = roleId;
    }
}