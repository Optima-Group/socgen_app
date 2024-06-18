export class AssetInvTempDetail {
    id: number;
    invNo: string;
    name: string;
    purchaseDate: Date;

    costCenterInitial: any;
    employeeInitial: any;

    costCenterIdIni: number;
    costCenterCodeIni: string;
    costCenterNameIni: string;
    costCenterIdFin: number;
    costCenterCodeFin: string;
    costCenterNameFin: string;

    admCenterIdIni: number;
    admCenterCodeIni: string;
    admCenterNameIni: string;
    regionIdIni: number;
    regionCodeIni: string;
    regionNameIni: string;
    locationIdIni: number;
    locationCodeIni: string;
    locationNameIni: string;
    roomIdIni: number;
    roomCodeIni: string;
    roomNameIni: string;
    employeeIdIni: number;
    internalCodeIni: string;
    firstNameIni: string;
    lastNameIni: string;

    admCenterIdFin: number;
    admCenterCodeFin: string;
    admCenterNameFin: string;
    regionIdFin: number;
    regionCodeFin: string;
    regionNameFin: string;
    locationIdFin: number;
    locationCodeFin: string;
    locationNameFin: string;
    roomIdFin: number;
    roomCodeFin: string;
    roomNameFin: string;
    employeeIdFin: number;
    internalCodeFin: string;
    firstNameFin: string;
    lastNameFin: string;

    serialNumber: string;
    producer: string;
    model: string;

    qInitial: number;
    qFinal: number;
    uom: string;

    invCompStateId: number;
    invCompState: string;

    valueInv: number;
    valueDep: number;
    custody: boolean;
}