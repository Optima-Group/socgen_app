import { Administration } from './administration';
import { CodeNameEntity } from "app/model/api/common/code-name-entity";

export class AdministrationDetail extends Administration {
    costCenterCode: string;
    costCenterName: string;
    divisionCode: string;
    divisionName: string;

    constructor (id: number, code: string, name: string, costCenterId: number, costCenterCode: string, costCenterName: string, divisionId: number, divisionCode: string, divisionName: string) {
        super(id, code, name, new CodeNameEntity(costCenterId, costCenterCode, costCenterName),  new CodeNameEntity(divisionId, divisionCode, divisionName));
        this.divisionCode = divisionCode;
        this.divisionName = divisionName;
        this.costCenterCode = costCenterCode;
        this.costCenterName = costCenterName;
    }
}