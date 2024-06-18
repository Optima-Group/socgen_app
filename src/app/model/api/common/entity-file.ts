export class EntityFile {
    id: number;
    entityId: number;
    entityTypeId: number;
    fileType: string;
    storedAs: string;
    name: string;
    size: number;
    info: string;
    //fileContent: any = null;
}

export class AssetImage {
    entityFile: EntityFile = null;
    fileContent: any = null;

    constructor(entityFile: EntityFile, fileContent: any) {
        this.entityFile = entityFile;
        this.fileContent = fileContent;
    }
}

// export class EntityFileSave {
//     entityId: number;
//     entityTypeCode: string;
//     info: string;
//     fileContent: any;
// }