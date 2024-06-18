export class Department {
    id: number;
    code: string;
    name: string;
    teamLeaderId: number;

    constructor(id: number, code: string, name: string, teamLeaderId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.teamLeaderId = teamLeaderId;
    }
}