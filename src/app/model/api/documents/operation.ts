export class Operation {

    operationId: number;
    assetId: number;
    isDeleted: boolean;
    administrationId: number;
    costCenterId: number;
    budgetManagerId: number;
    projectId: number;
    dimensionId: number;
    employeeId: number;
    assetAccStateId: number;
    assetCategoryId: number;
    departmentId: number;
    roomId: number;
    invStateId: number;
    uomId: number;
    zoneStateId: number;
    info: string;
    employeeIdIni: number;

    constructor(operationId: number, assetId: number, isDeleted: boolean, administrationId: number, costCenterId: number, budgetManagerId: number, projectId: number, dimensionId: number,
        employeeId: number, assetAccStateId: number, assetCategoryId: number, departmentId: number, roomId: number, invStateId: number, uomId: number, zoneStateId: number, info: string, employeeIdIni: number) {

        this.operationId = operationId;
        this.assetId = assetId;
        this.isDeleted = isDeleted;
        this.administrationId = administrationId;
        this.costCenterId = costCenterId;
        this.budgetManagerId = budgetManagerId;
        this.projectId = projectId;
        this.dimensionId = dimensionId;
        this.employeeId = employeeId;
        this.assetAccStateId = assetAccStateId;
        this.assetCategoryId = assetCategoryId;
        this.departmentId = departmentId;
        this.roomId = roomId;
        this.invStateId = invStateId;
        this.uomId = uomId;
        this.zoneStateId = zoneStateId;
        this.info = info;
        this.employeeIdIni = employeeIdIni;
    }
}