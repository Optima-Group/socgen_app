import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolPipeEmployeeConfirmed' })
export class BoolPipeEmployeeConfirmed implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value === true ? 'YES' : 'NO';
  }
}