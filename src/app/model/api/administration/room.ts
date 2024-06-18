import { CodeNameEntity } from "app/model/api/common/code-name-entity";

export class Room {
    id: number;
    code: string;
    name: string;
    isFinished: boolean;
    location: CodeNameEntity;

    constructor (id: number, code: string, name: string, location: CodeNameEntity, isFinished: boolean) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.location = location;
        this.isFinished = isFinished;
    }
}