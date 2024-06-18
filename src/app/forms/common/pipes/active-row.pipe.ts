import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'activeRow' })
export class ActiveRowPipe implements PipeTransform {
  transform(value): any {
    let propertyName: string = 'isActive';
    let result: any = value;

    let paths: Array<string> = propertyName.split('.');
    paths.forEach((path: string) => {
        result = result[path];
    });

    return ((result !== undefined) && (result !== null)) ? (result === true ? '' : 'red') : '';
  }
}
