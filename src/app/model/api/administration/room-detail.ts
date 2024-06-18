import { Room } from './room';
import { CodeNameEntity } from "app/model/api/common/code-name-entity";

export class RoomDetail extends Room {
    locationCode: string;
    locationName: string;
    isFinished: boolean;

    constructor (id: number, code: string, name: string, locationId: number, locationCode: string, locationName: string, isFinished: boolean) {
        super(id, code, name, new CodeNameEntity(locationId, locationCode, locationName), isFinished);
        this.locationCode = locationCode;
        this.locationName = locationName;
        this.isFinished = isFinished;
    }
}