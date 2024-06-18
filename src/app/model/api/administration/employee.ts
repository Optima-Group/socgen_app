export class Employee {
    id: number;
    internalCode: string;
    firstName: string;
    lastName: string;
    departmentId: number;
    email: string;
    isDeleted: boolean;
    isPickup: boolean;
    isPickup2: boolean;
    pickupDate: Date;
    pickupDate2: Date;
    outPickupDate: Date;
    outPickupDate2: Date;
    selectedItem: string;
    selectedItem2: string;
    selectedItemType: string;
    headPhones: string;
    headInfo: string;

    constructor(id: number, internalCode: string, firstName: string, lastName: string, departmentId: number, email: string, isDeleted: boolean,
        isPickup: boolean, isPickup2: boolean, pickupDate: Date, pickupDate2: Date, outPickupDate: Date, outPickupDate2: Date, selectedItem: string,
        selectedItem2: string, selectedItemType: string) {
        this.id = id;
        this.internalCode = internalCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentId = departmentId;
        this.email = email;
        this.isDeleted = isDeleted;
        this.isPickup = isPickup;
        this.isPickup2 = isPickup2;
        this.pickupDate = pickupDate;
        this.pickupDate2 = pickupDate2;
        this.outPickupDate = outPickupDate;
        this.outPickupDate2 = outPickupDate2;
        this.selectedItem = selectedItem;
        this.selectedItem2 = selectedItem2;
        this.selectedItemType = selectedItemType;
    }
}
