import { Injectable } from '@angular/core';

import { AssetSimpleDetail } from '../../model/api/assets/asset-simple-detail';
import { PagedResult } from '../../model/common/paged-result';
import { AppData } from '../app-data';
import { GenericMemoryService } from '../memory/generic.memory.service';

@Injectable()
export class AssetMemoryService extends GenericMemoryService<AssetSimpleDetail, number> {
}