export class InventoryInvCompDetail {
    id: number;
    inventoryId: number;
    invCompId: number;
    code: string;
    name: string;

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

    sN: string;
    producer: string;
    model: string;

    qInitial: number;
    qFinal: number

    invCompStateId: number;
    invCompState: string;
}