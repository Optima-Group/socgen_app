import { Pipe, PipeTransform } from "@angular/core";
import { ColumnDefinition } from "app/model/common/column-definition";
import { DatePipe, DecimalPipe } from "@angular/common";
import { BoolPipe } from "app/forms/common/pipes/bool.pipe";
import { TranslateService } from "@ngx-translate/core";
import { MergePipe } from "app/forms/common/pipes/merge.pipe";
import { BoolPipeState } from "./bool.pipe_state";
import { MergeRoom } from "./merge-room.pipe";
import { BoolPipeInventory } from "./bool-pipe.inventory";
import { BoolPipeEmployee } from "./bool-pipe-employee-state";
import { BoolPipeEmployeeStatus } from "./bool-pipe-employee-status";
import { HighlightPipe } from "./highlight-pipe ";
import { BoolPipeEmployeeConfirmed } from "./bool-pipe-employee-confirmed";


@Pipe({ name: 'fieldByColumnDefinition' })
export class FieldByColumnDefinitionPipe implements PipeTransform {

    private yesNo: string = '';

    constructor(
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private boolPipe: BoolPipe,
        private boolPipeState: BoolPipeState,
        private boolPipeInventory: BoolPipeInventory,
        private boolPipeEmployee: BoolPipeEmployee,
        private boolPipeEmployeeConfirmed: BoolPipeEmployeeConfirmed,
        private boolPipeEmployeeStatus: BoolPipeEmployeeStatus,
        private mergePipe: MergePipe,
        private mergeRoom: MergeRoom,
        private highlightPipe: HighlightPipe,
        private translate: TranslateService) {
        translate.use('en');
        translate.get('YESNO').subscribe(data => this.yesNo = data);
    }

    transform(value, columnDefinition: ColumnDefinition) : any {
        let result: any = value;
        let employeeFullName: any = value;
        let room: any = value;
        let paths: Array<string> = columnDefinition.property.split('.');
        paths.forEach((path: string) => {
            result = result === null ? null : result[path];

        });

        if (paths[0] === 'employeeInitial'){

            employeeFullName = employeeFullName === null ? '' :
            employeeFullName.employeeInitial != null ? ' ' + employeeFullName.employeeInitial.firstName
             + ' ' + employeeFullName.employeeInitial.lastName : '';
        }
        if (paths[0] === 'employeeFinal'){

            employeeFullName = employeeFullName === null ? '' :
            employeeFullName.employeeFinal != null ? ' ' + employeeFullName.employeeFinal.firstName
             + ' ' + employeeFullName.employeeFinal.lastName : '';
        }

        if (paths.length > 1){

            if ( paths[1] === 'employee'){

                employeeFullName = employeeFullName === null ? '' :
                employeeFullName.adm == null ? null :  employeeFullName.adm.employee != null ?
                 ' ' + employeeFullName.adm.employee.firstName
                 + ' ' + employeeFullName.adm.employee.lastName : '';
            }
        }

        if (paths[0] === 'roomInitial'){

            room = room === null ? '' :
            room.roomInitial != null ? ' ' + room.roomInitial.code
             + ' - ' + room.roomInitial.name : '';
        }
        if (paths[0] === 'roomFinal'){

            room = room === null ? '' :
            room.roomFinal != null ? ' ' + room.roomFinal.code
             + ' - ' + room.roomFinal.name : '';
        }

        if (paths.length > 1){

            if ( paths[1] === 'room'){

                room = room === null ? '' :
                room.adm == null ? null :  room.adm.room != null ?
                 ' ' + room.adm.room.code
                 + ' - ' + room.adm.room.name : '';
            }
        }

        if (columnDefinition.pipe) {

            switch(columnDefinition.pipe){
                case 'date':
                    return this.datePipe.transform(result, columnDefinition.format);
                case 'number':
                    return this.decimalPipe.transform(result, columnDefinition.format);
                case 'bool':
                    return this.boolPipe.transform(result, this.yesNo);
                case 'boolstate':
                    return this.boolPipeState.transform(result, this.yesNo);
                case 'boolinv':
                    return this.boolPipeInventory.transform(result, this.yesNo);
                case 'boolEmp':
                    return this.boolPipeEmployee.transform(result, this.yesNo);
                case 'boolEmpState':
                    return this.boolPipeEmployeeStatus.transform(result, this.yesNo);
                case 'boolEmpConfirmed':
                    return this.boolPipeEmployeeConfirmed.transform(result, this.yesNo);
                case 'merge':
                    // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
                    return this.mergePipe.transform('', employeeFullName, true);
                case 'mergeRoom':
                // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
                    return this.mergePipe.transform('', room, true);
                case 'highlightPipe':
                    // return this.mergePipe.transform(result + ' - ', employeeFullName, true);
                    return this.highlightPipe.transform('', '|');
                default: return;
            }
        }
        return result;
    }
}