import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'mergePipe' })
export class MergePipe implements PipeTransform {
    transform(value1: any, value2: any, order: Boolean): any {
        return order ? value1 != null ? value1.concat(value2) : '' : value2 != null ? value2.concat(value1) : '';
    }
}

