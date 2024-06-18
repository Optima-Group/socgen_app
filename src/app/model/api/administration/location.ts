export class Location {
    id: number;
    code: string;
    name: string;
    cityId: number;
    regionId: number;
    costCenterId: number;
    admCenterId: number;
    latitude: number;
    longitude: number;
    member1: string;
    member2: string;
    member3: string;

    constructor(id: number, code: string, name: string, cityId: number, regionId: number, admCenterId: number, latitude: number, longitude: number, member1: string, member2: string,member3: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.cityId = cityId;
        this.regionId = regionId;
        this.admCenterId = admCenterId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.member1 = member1;
        this.member2 = member2;
        this.member3 = member3;
    }
}
