
import { CodeNameEntity } from "app/model/api/common/code-name-entity";

export class EmailManager {
    id: number;
    code: string;
    name: string;
    
    emailType: CodeNameEntity;

    constructor (id: number, code: string, name: string, emailType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.emailType = emailType;
    }
}