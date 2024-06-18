export class InvCompOp {
    id: number;
    InventoryId: number;
    InvCompId: number;

    AssetId: number;
    ParentInvCompId: number;

    RoomIdInitial: number;
    EmployeeIdInitial: number;
    RoomIdFinal: number;
    EmployeeIdFinal: number;

    SNInitial: string;
    ProducerInitial: string;
    ModelInitial: string;

    SNFinal: string;
    ProducerFinal: string;
    ModelFinal: string;

    QuantityIntial: number;
    QuantityFinal: number;

    InvCompStateIdInitial: number;
    InvCompStateIdFinal: number;
}