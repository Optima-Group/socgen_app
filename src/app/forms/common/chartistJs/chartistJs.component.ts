import {Component, ViewEncapsulation} from '@angular/core';

import 'style-loader!./chartistJs.scss';
import { ChartService } from './chartistJs.service';

@Component({
  selector: 'chart',
  templateUrl: './chartistJs.html',
})

export class ChartComponent {

  data:any;

  constructor(private _chartistJsService:ChartService) {
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
