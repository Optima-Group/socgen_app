import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'boolPipeState' })
export class BoolPipeState implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value ? 'Completed' : 'To be inventoried';
    //let values = yesNo.split('|');
    //return value ? values[0] : values[1];
    //console.log('pipe:',JSON.stringify(value));
    //return value != null ? (value === true ? values[0] : values[1]) : '';
  }
}