import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { AssetEntity } from '../common/asset-entity';
import { Employee } from '../administration/employee';
import { EmployeeResource } from '../administration/employee-resource';

export class AssetComponent {
    id: number;
    code: string;
    name: string;
    asset: AssetEntity;
    employee: EmployeeResource;
    subType: CodeNameEntity;

    constructor (id: number, code: string, name: string, asset: AssetEntity, employee: EmployeeResource, subType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.asset = asset;
        this.employee = employee;
        this.subType = subType;
    }
}