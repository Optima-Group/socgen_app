import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolPipeInventory' })
export class BoolPipeInventory implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value ? 'YES' : 'NO';
  }
}