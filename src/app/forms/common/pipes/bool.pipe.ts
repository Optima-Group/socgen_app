import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'boolPipe' })
export class BoolPipe implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value ? 'Label' : 'NotLabel';
    // let values = yesNo.split('|');
    // return value ? values[0] : values[1];
    // console.log('pipe:',JSON.stringify(value));
    // return value != null ? (value === true ? values[0] : values[1]) : '';
  }
}