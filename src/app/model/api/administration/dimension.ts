import { CodeNameEntity } from 'app/model/api/common/code-name-entity';

export class Dimension {
    id: number;
    length: string;
    width: string;
    height: string;
    assetCategory: CodeNameEntity;

    constructor (id: number, length: string, width: string, height: string, assetCategory: CodeNameEntity) {
        this.id = id;
        this.length = length;
        this.width = width;
        this.height = height;
        this.assetCategory = assetCategory;
    }
}