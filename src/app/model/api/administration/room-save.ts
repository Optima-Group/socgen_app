export class RoomSave {
    id: number;
    code: string;
    name: string;
    locationId: number;

    constructor (id: number, code: string, name: string, locationId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.locationId = locationId;
    }
}