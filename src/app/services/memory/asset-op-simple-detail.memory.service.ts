import { Injectable } from '@angular/core';

import { PagedResult } from '../../model/common/paged-result';
import { GenericMemoryService } from '../memory/generic.memory.service';
import { AssetOpSd } from "app/model/api/assets/asset-op-sd";

@Injectable()
export class AssetOpSimpleDetailMemoryService extends GenericMemoryService<AssetOpSd, number> {
}