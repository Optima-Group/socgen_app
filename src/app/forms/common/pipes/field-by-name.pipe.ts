import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'fieldByName' })
export class FieldByNamePipe implements PipeTransform {
  transform(value, propertyName:string) : any {
    let result: any = value;
    
    let paths: Array<string> = propertyName.split('.');
    paths.forEach((path: string) => {
        result = result[path];
    });

    return result;
  }
}