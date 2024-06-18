import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolPipeEmployeeStatus' })
export class BoolPipeEmployeeStatus implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value === false ? 'Active' : 'Inactive';
  }
}