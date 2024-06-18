export class InvCompDetail {
    id: number;
    code1: string;
    code2: string;
    name1: string;
    name2: string;
    
    parentInvCompId: number;
    parentCode1: string;
    parentName1: string;

    assetId: number;
    invNo: string;
    assetName: string;

    locationId: number;
    locationCode: string;
    locationName: string;
    roomId: number;
    roomCode: string;
    roomName: string;
    employeeId: number;
    internalCode: string;
    firstName: string;
    lastName: string;

    sN: string;
    producer: string;
    model: string;

    quantity: number;
    valueInv: number

    invCompStateId: number;
    invCompState: string;
}