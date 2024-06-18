
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { AssetComponent } from './asset-component';
import { AssetEntity } from '../common/asset-entity';
import { EmployeeResource } from '../administration/employee-resource';

export class AssetComponentDetail extends AssetComponent {
    assetInvNo: string;
    assetName: string;
    employeeInternalCode: string;
    employeeFirstName: string;
    employeeLastName: string;
    subTypeName: string;

    constructor (id: number, code: string, name: string, assetId: number, assetInvNo: string, assetName: string, employeeId: number, employeeInternalCode: string,
        employeeFirstName: string, employeeLastName: string, subTypeId: number, subTypeCode: string, subTypeName: string) {
        super(id, code, name, new AssetEntity(assetId, assetInvNo, assetName), new EmployeeResource(employeeId, employeeInternalCode, employeeFirstName, employeeLastName), 
        new CodeNameEntity(subTypeId, subTypeCode, subTypeName));
        this.assetInvNo = assetInvNo;
        this.assetName = assetName;
        this.employeeInternalCode = employeeInternalCode;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.subTypeName = subTypeName;
    }
}