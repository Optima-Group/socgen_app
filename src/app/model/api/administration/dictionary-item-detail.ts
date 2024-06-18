import { Administration } from './administration';
import { CodeNameEntity } from "app/model/api/common/code-name-entity";
import { DictionaryItem } from './dictionary-item';

export class DictionaryItemDetail extends DictionaryItem {
    dictionaryTypeCode: string;
    dictionaryTypeName: string;
    assetCategoryCode: string;
    assetCategoryName: string;

    constructor (id: number, code: string, name: string, dictionaryTypeId: number, dictionaryTypeCode: string, assetCategoryId: number, dictionaryTypeName: string, assetCategoryCode: string, assetCategoryName: string) {
        super(id, code, name, new CodeNameEntity(dictionaryTypeId, dictionaryTypeCode, dictionaryTypeName), new CodeNameEntity(assetCategoryId, assetCategoryCode, assetCategoryName));
        this.dictionaryTypeCode = dictionaryTypeCode;
        this.dictionaryTypeName = dictionaryTypeName;
        this.assetCategoryCode = assetCategoryCode;
        this.assetCategoryName = assetCategoryName;
    }
}