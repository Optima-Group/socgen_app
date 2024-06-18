
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { Dimension } from './dimension';

export class DimensionDetail extends Dimension {
    assetCategoryCode: string;
    assetCategoryName: string;

    constructor (id: number, length: string, width: string, height: string, assetCategoryId: number, assetCategoryCode: string, assetCategoryName: string) {
        super(id, length, width, height, new CodeNameEntity(assetCategoryId, assetCategoryCode, assetCategoryName));
        this.assetCategoryCode = assetCategoryCode;
        this.assetCategoryName = assetCategoryName;
    }
}