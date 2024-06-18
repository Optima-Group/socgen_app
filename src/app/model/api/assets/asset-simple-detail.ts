import { EmployeeResource } from "../administration/employee-resource";
import { CodeNameEntity } from "../common/code-name-entity";

export class AssetSimpleDetail {
    id: number;
    invNo: string;
    name: string;
    serialNumber: string;
    purchaseDate: Date;
    partner: string;
    sapCode: string;
    assetType: string;
    assetState: string;
    zoneState: CodeNameEntity;
    usageStartDate: Date;
    costCenterCode: string;
    roomCode: string;
    employee: EmployeeResource;
    employeeId: number;
    adm: any;
    isInTransfer: boolean;
    uom: CodeNameEntity;
    pifNumber: string;

    constructor(id: number, invNo: string, name: string, serialNumber: string, purchaseDate: Date, partner: string, sapCode: string, assetType: string,
        assetState: string, usageStartDate: Date, costCenterCode: string, roomCode: string, employeeId: number, adm: any, isInTransfer: boolean, uom: CodeNameEntity, pifNumber: string) {
        this.id = id;
        this.invNo = invNo;
        this.name = name;
        this.serialNumber = serialNumber;
        this.purchaseDate = purchaseDate;
        this.partner = partner;
        this.sapCode = sapCode;
        this.assetType = assetType;
        this.assetState = assetState;
        this.usageStartDate = usageStartDate;
        this.costCenterCode = costCenterCode;
        this.roomCode = roomCode;
        this.employeeId = employeeId;
        this.adm = adm;
        this.isInTransfer = isInTransfer;
        this.uom = uom;
        this.pifNumber = pifNumber;
    }
}