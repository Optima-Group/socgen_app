import { Injectable } from '@angular/core';

import { InvCompOpDetail } from '../../model/api/inventory/inv-comp-op-detail';
import { PagedResult } from '../../model/common/paged-result';
import { GenericMemoryService } from '../memory/generic.memory.service';

@Injectable()
export class InvCompOpDetailMemoryService extends GenericMemoryService<InvCompOpDetail, number> {
}