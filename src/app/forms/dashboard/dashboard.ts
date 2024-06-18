import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { BaThemeConfigProvider, colorHelper } from 'app/theme';
import { ModalDirective } from 'ng2-bootstrap';
import * as Chartist from 'chartist';
import * as MyLegend from 'chartist-plugin-legend';
import * as ctPointLabels from 'chartist-plugin-pointlabels';
import { Param } from 'app/model/common/param';
import { AppUtils } from 'app/common/app.utils';
import { DivisionList } from '../administration/divisions/division.list';
import { DivisionHttpService } from 'app/services/http/administration/division.http.service';
import { Division } from 'app/model/api/administration/division';
import { Region } from 'app/model/api/administration/region';
import { RegionList } from '../administration/regions/region.list';
import { RegionHttpService } from 'app/services/http/administration/region.http.service';
import { Administration } from 'app/model/api/administration/administration';
import { Location } from 'app/model/api/administration/location';
import { AdministrationHttpService } from 'app/services/http/administration/administration.http.service';
import { AdministrationList } from '../administration/administrations/administration.list';
import { LocationHttpService } from 'app/services/http/administration/location.http.service';
import { LocationList } from '../administration/locations/location.list';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { InventoryList } from '../inventory/inventory.list';
import { Inventory } from 'app/model/api/inventory/inventory';
// import * as ctBarLabels from 'chartist-plugin-barlabels';
declare const window: any;
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  providers: [
    RegionHttpService, DivisionHttpService, AdministrationHttpService, LocationHttpService ,RegionHttpService, InventoryHttpService]
})
export class Dashboard implements OnInit {

   donuts: any;
   chart: any;
   charts1 = [];
   data: any = {};
   donutData: any = {};
   pieData: any = {};
   location: any= '';
   deposit: any= '';
   ufi: any= '';
   room: any= '';
   assetClassification: any= '';
   category: any= '';
   invState: any= '';
   uom: any= '';
   company: any= '';
   companyType: any= '';
   type: any= '';
   admCenter: any= '';
   region: any = '';
   locationName: any = '';
   admCenterName: any = '';
   public charts: Array<Object>;
   private _init = false;
   public chartPies: Array<Object>;
   public chartPerLocationPies: Array<Object>;

   public doughnutData: Array<Object>;
   @ViewChild('regionList') public regionList: RegionList;
   @ViewChild('regionListModal') public regionListModal: ModalDirective;
   @ViewChild('divisionList') public divisionList: DivisionList;
   @ViewChild('divisionListModal') public divisionListModal: ModalDirective;
   @ViewChild('administrationList') public administrationList: AdministrationList;
   @ViewChild('administrationListModal') public administrationListModal: ModalDirective;
   @ViewChild('locationList') public locationList: LocationList;
   @ViewChild('locationListModal') public locationListModal: ModalDirective;
   @ViewChild('inventoryList') public inventoryList: InventoryList;
   @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;


   private selectedRegions: Array<Region> = new Array<Region>();
   private selectedDivisions: Array<Division> = new Array<Division>();
   private selectedAdministrations: Array<Administration> = new Array<Administration>();
   private selectedLocations: Array<Location> = new Array<Location>();
   private selectedInventories: Array<Inventory> = new Array<Inventory>();
   private regionId = 1;
   private divisionId = 0;
   private roomId = 0;
   private locationId = 0;
   private inventoryId = 5;

   administrations = [];
   locations = [];

  constructor(
    private assetHttpService: AssetHttpService,
    private regionHttpService: RegionHttpService,
    private divisionHttpService: DivisionHttpService,
    private administrationHttpService: AdministrationHttpService,
    private locationHttpService: LocationHttpService,
    private inventoryHttpService: InventoryHttpService,
    private _baConfig: BaThemeConfigProvider) {
      var tester = new MyLegend();
    // this.doughnutData = this.getData();
  }

  ngOnInit() {
    this.updateData(this.inventoryId);
    this.updateRoomData(this.locationId, this.inventoryId);
    // this.updateEmployeeData(this.inventoryId);
    this.updateAdministrationOperationData(this.roomId, this.inventoryId);
    //this.updateDivisionOperationData(this.divisionId, this.inventoryId);
    //this.updateLocationOperationData(this.locationId, this.inventoryId);
    //this.updateRegionOperationData(this.regionId, this.inventoryId);
    //this.updateRegionData(this.inventoryId);
    //this.updateLocationData(this.regionId, this.inventoryId);
    this.updateSubTypeData();
    this.updateAssetComponentData();
    //this.updateTypeData();
    //this.updateMasterTypeData();
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  public getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }]
    ];
  }

  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 1000,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'Localitate',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Scriptic',
        percentage: 22,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'Nescanate',
        percentage: 70,
        order: 3,
      }, {
        value: 1200,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Minusuri',
        percentage: 38,
        order: 2,
      }, {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Plusuri',
        percentage: 17,
        order: 0,
      },
      {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Temporare',
        percentage: 17,
        order: 0,
      },
      {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Transf. in Localitate',
        percentage: 17,
        order: 0,
      },
      {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Transf. intre Localitati',
        percentage: 17,
        order: 0,
      },
      {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Transf. in Tip Magazin',
        percentage: 17,
        order: 0,
      },
      {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Transf. intre Tipuri Magazine',
        percentage: 17,
        order: 0,
      },
    ];
  }


  private selectLocations() {

    // let selectedRegions: Array<Region> = null;
    // selectedRegions = this.selectedRegions;
    // let params = new Array<Param>();
    // params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));

    this.locationListModal.show();
    this.locationList.selectedItems = this.selectedLocations;
    this.locationList.refresh(null);
}

private setSelectedLocations() {
  this.selectedLocations = this.locationList.selectedItems;
  this.locationListModal.hide();
  this.locationId = this.locationList != null && this.locationList.selectedItems[0] != null ? this.locationList.selectedItems[0].id : 3005;
  this.regionId = this.locationList != null && this.locationList.selectedItems[0] != null && this.locationList.selectedItems[0].regionId ? this.locationList.selectedItems[0].regionId : 29;
  this.updateLocationOperationData(this.locationId, this.inventoryId);
  this.updateRegionOperationData(this.regionId, this.inventoryId);
  }

  private selectInventories() {

    this.inventoryListModal.show();
    this.inventoryList.selectedItems = this.selectedInventories;
    this.inventoryList.refresh(null);
}

private setSelectedInventories() {
  this.selectedInventories = this.inventoryList.selectedItems;
  this.inventoryListModal.hide();
  this.inventoryId = this.inventoryList != null && this.inventoryList.selectedItems[0] != null ? this.inventoryList.selectedItems[0].id : 3;
  this.updateData(this.inventoryId);
  //this.updateAdministrationData(this.divisionId, this.inventoryId);
  //this.updateDivisionData(this.inventoryId);
  //this.updateAdministrationOperationData(this.administrationId, this.inventoryId);
  //this.updateDivisionOperationData(this.divisionId, this.inventoryId);
  //this.updateLocationOperationData(this.locationId, this.inventoryId);
  //this.updateRegionOperationData(this.regionId, this.inventoryId);
  //this.updateRegionData(this.inventoryId);
  //this.updateLocationData(this.regionId, this.inventoryId);
  }



private selectDivisions() {

  this.divisionListModal.show();
  this.divisionList.selectedItems = this.selectedDivisions;
  this.divisionList.refresh(null);
}

private setSelectedDivisions() {
this.selectedDivisions = this.divisionList.selectedItems;
this.divisionListModal.hide();
this.divisionId = this.divisionList != null && this.divisionList.selectedItems[0] != null ? this.divisionList.selectedItems[0].id : 0;
this.updateRoomData(this.divisionId, this.inventoryId);
this.updateDivisionOperationData(this.divisionId, this.inventoryId);
}

private selectRegions() {

  this.regionListModal.show();
  this.regionList.selectedItems = this.selectedRegions;
  this.regionList.refresh(null);
}

private setSelectedRegions() {
this.selectedRegions = this.regionList.selectedItems;
this.regionListModal.hide();
this.regionId = this.regionList != null && this.regionList.selectedItems[0] != null ? this.regionList.selectedItems[0].id : 0;
this.updateLocationData(this.regionId, this.inventoryId);
this.updateRegionOperationData(this.regionId, this.inventoryId);
}


private selectAdministrations() {

  this.administrationListModal.show();
  this.administrationList.selectedItems = this.selectedAdministrations;
  this.administrationList.refresh(null);
}

private setSelectedAdministrations() {
this.selectedAdministrations = this.administrationList.selectedItems;
this.administrationListModal.hide();
this.roomId = this.administrationList != null && this.administrationList.selectedItems[0] != null ? this.administrationList.selectedItems[0].id : 215;
this.divisionId = this.administrationList != null && this.administrationList.selectedItems[0] != null && this.administrationList.selectedItems[0].division ? this.administrationList.selectedItems[0].division.id : 76;
this.updateAdministrationOperationData(this.roomId, this.inventoryId);
this.updateDivisionOperationData(this.divisionId, this.inventoryId);
this.updateRoomData(this.divisionId, this.inventoryId);
}

private updateData(inventoryId: number) {

  this.assetHttpService.total(inventoryId).subscribe( (res) => {

    let pieValueInv: number = +res.map(r => r.valueInv);
    let pieProcentages: number = +res.map(r => r.procentage);
    let pieInitials: number = +res.map(r => r.initial);
    let finishedAdministration: number = +res.map(r => r.finishedAdministration);
    let totalAdministration: number = +res.map(r => r.totalAdministration);
    let totalTemp: number = +res.map(r => r.totalTemp);
    let procentageAdministration: number = +res.map(r => r.procentageAdministration);
    let pieScans: number = +res.map(r => r.scanned);
    // let notScanned: number = pieInitials - pieScans;
    let pieColor = 'rgb(255, 87, 25)';

    this.chartPies =
[
  {
    color: pieColor,
    description: 'Fixed assets',
    stats: pieInitials,
    icon: 'refresh',
  },
  {
    color: pieColor,
    description: 'Fixed assets value',
    stats: pieValueInv,
    icon: 'money',
  },

  {
    color: pieColor,
    description: 'Scanned fixed assets',
    stats: pieScans,
    icon: 'person'
  },


  // {
  //   color: pieColor,
  //   description: 'Imobilizari nescanate',
  //   stats: notScanned,
  //   icon: 'person'
  // },

   {
    color: pieColor,
    description: 'Total scanned procentage',
    stats: pieProcentages,
    icon: 'face',
  },
  // {
  //   color: pieColor,
  //   description: 'Plusuri temporare',
  //   stats: totalTemp,
  //   icon: '',
  // },
  //   {
  //   color: pieColor,
  //   description: 'Total puncte de lucru',
  //   stats: totalAdministration,
  //   icon: '',
  // },
  // {
  //   color: pieColor,
  //   description: 'Puncte de lucru finalizate',
  //   stats: finishedAdministration,
  //   icon: '',
  // },

  // {
  //   color: pieColor,
  //   description: 'Procent puncte de lucru finalizate',
  //   stats: procentageAdministration,
  //   icon: '',
  // }

];

});


// this.assetHttpService.inventoryPieChartByDay(this.inventoryId).subscribe((res) => {

//   let day = [];
//   let days = res.map(r => r.scanDate);
//   let scans = res.map(r => r.scanned);

//   let maxPerDay = scans.reduce((max, val) => max > val ? max : val, scans[0]);

//   days.forEach(element => {
//     day.push(element.substring(0 ,10));
//   });


//     var ctxLineBarDays = document.getElementById("bar-chart-horizontal-days") as HTMLCanvasElement;
//     if(window.bardays != undefined)
//     window.bardays.destroy();
//     window.bardays = new Chart(ctxLineBarDays, {
//       scaleOverride : true,
//       type: 'horizontalBar',
//               data: {
//                 labels: day,
//                 datasets: [
//                   {
//                     label: 'Scanari / zi',
//                     backgroundColor: '#3e95cd',
//                     // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//                     data: scans
//                   },
//                 ]
//               },
//               options: {
//                 tooltips: {
//                   enabled : true,
//                   footerFontSize: 20,
//                   bodyFontSize: 20,
//                   titleFontSize: 20,
//                   callbacks: {
//                       label: function(tooltipItem) {
//                           return tooltipItem.value;
//                       }
//                   }
//                 //   label: function(tooltipItem, data) {
//                 //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

//                 //     if (label) {
//                 //         label += ': ';
//                 //     }
//                 //     label += Math.round(tooltipItem.yLabel * 100) / 100;
//                 //     return label;
//                 // }
//               },
//                 responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     labels: {
//                       render: 'value',
//                       fontColor: 'black',
//                       precision: 2,
//                       padding: {left: 32}
//                     }
//                   },
//                 text: 'Scanari / zi',
//                 display: true,
//                 scales: {
//                     xAxes: [{
//                         ticks: {
//                             beginAtZero: true,
//                             max: maxPerDay,
//                             min: 0
//                         }
//                         ,position: 'top'
//                     }]
//                 }
//             },
//             plugins: [{
//               //     beforeInit: function(chartInstance) {
//               //     var totals = [];
//               //     chartInstance.data.datasets.forEach(function(dataset) {
//               //         for (var i = 0; i < dataset.data.length; i++) {
//               //             var total = 0;
//               //             chartInstance.data.datasets.forEach(function(dataset) {
//               //                 total += dataset.data[i];
//               //             });
//               //             totals.push(total);
//               //         }
//               //     });

//               //     chartInstance.data.datasets.forEach(function(dataset) {
//               //         for (var i = 0; i < dataset.data.length; i++) {
//               //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
//               //         }
//               //     });
//               // },
//               afterDraw: function(chartInstance) {
//                   var ctx = chartInstance.chart.ctx;

//                   ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
//                   ctx.textAlign = 'left';
//                   ctx.textBaseline = 'bottom';
//                   ctx.fillStyle = '#3e95cd';

//                   chartInstance.data.datasets.forEach(function(dataset) {
//                       // if (dataset._meta[0].controller.index != 0) return;

//                       for (var i = 0; i < dataset.data.length; i++) {
//                           var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

//                           let offside = 50;

//                           let procent = parseFloat(dataset.data[i]).toFixed(0);
//                           let fff = +procent;

//                           if (fff < 4000) {
//                             offside = - 10;
//                             ctx.fillStyle='#000';
//                           } else {
//                             ctx.fillStyle='#000';
//                           }

//                           ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
//                       }
//                   });
//               }}]
//     });





// })

// this.assetHttpService.inventoryPieChartLocationFinishedByDay(this.inventoryId).subscribe((res) => {

//   let day = [];
//   let days = res.map(r => r.scanDate);
//   let scans = res.map(r => r.scanned);

//   let maxPerDay = scans.reduce((max, val) => max > val ? max : val, scans[0]);

//   days.forEach(element => {
//     day.push(element.substring(0 ,10));
//   });


//     var ctxLineBarFinishDays = document.getElementById("bar-chart-horizontal-location-finished-days") as HTMLCanvasElement;
//     if(window.barfinishdays != undefined)
//     window.barfinishdays.destroy();
//     window.barfinishdays = new Chart(ctxLineBarFinishDays, {
//       scaleOverride : true,
//       type: 'horizontalBar',
//               data: {
//                 labels: day,
//                 datasets: [
//                   {
//                     label: 'Locatii finalizate / zi',
//                     // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//                     backgroundColor: '#3e95cd',
//                     data: scans
//                   },
//                 ]
//               },
//               options: {
//                 tooltips: {
//                   enabled : true,
//                   footerFontSize: 20,
//                   bodyFontSize: 20,
//                   titleFontSize: 20,
//                   callbacks: {
//                       label: function(tooltipItem) {
//                           return tooltipItem.value;
//                       }
//                   }
//                 //   label: function(tooltipItem, data) {
//                 //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

//                 //     if (label) {
//                 //         label += ': ';
//                 //     }
//                 //     label += Math.round(tooltipItem.yLabel * 100) / 100;
//                 //     return label;
//                 // }
//               },
//                 responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     labels: {
//                       render: 'value',
//                       fontColor: ['green', 'green', 'green','green', 'green', 'green','green', 'green', 'green','green', 'green', 'green'],
//                       precision: 2,
//                     }
//                   },
//                 text: 'Locatii finalizate / zi',
//                 display: true,
//                 scales: {
//                     xAxes: [{
//                         ticks: {
//                             beginAtZero: true,
//                             max: maxPerDay,
//                             min: 0
//                         },position: 'top'
//                     }]
//                 }
//             },
//             plugins: [{
//               //     beforeInit: function(chartInstance) {
//               //     var totals = [];
//               //     chartInstance.data.datasets.forEach(function(dataset) {
//               //         for (var i = 0; i < dataset.data.length; i++) {
//               //             var total = 0;
//               //             chartInstance.data.datasets.forEach(function(dataset) {
//               //                 total += dataset.data[i];
//               //             });
//               //             totals.push(total);
//               //         }
//               //     });

//               //     chartInstance.data.datasets.forEach(function(dataset) {
//               //         for (var i = 0; i < dataset.data.length; i++) {
//               //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
//               //         }
//               //     });
//               // },
//               afterDraw: function(chartInstance) {
//                   var ctx = chartInstance.chart.ctx;

//                   ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
//                   ctx.textAlign = 'center';
//                   ctx.textBaseline = 'bottom';
//                   ctx.fillStyle = '#000';

//                   chartInstance.data.datasets.forEach(function(dataset) {
//                       // if (dataset._meta[0].controller.index != 0) return;

//                       for (var i = 0; i < dataset.data.length; i++) {
//                           var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

//                           let offside = 50;

//                           let procent = parseFloat(dataset.data[i]).toFixed(0);
//                           let fff = +procent;

//                           if (fff < 5) {
//                             offside = 5;
//                           }

//                           ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
//                       }
//                   });
//               }}]
//     });


// })

}

private updateEmployeeData(inventoryId: number) {

  this.assetHttpService.employee(inventoryId).subscribe( (res) => {


    let divisions = [];
    // let divisionNames = res.map(r => '(' + r.divisionCode +  ') ' + r.divisionName + ' (' + r.total + ')');
    let divisionNames = res.map(r => r.divisionName);
    let divisionCodes = res.map(r => r.divisionCode);
    let procentages = res.map(r => r.procentage);
    let initials = res.map(r => r.total);
    let totals = res.map(r => r.total);
    let scanned = res.map(r => r.scanned);
    let isFinished = res.map(r => r.isFinished);
    // let notScanned = totals - scanned;
    // let max = initials.reduce((max, val) => max > val ? max : val, initials[0]);
    let maxProcentage = procentages.reduce((a, b) => a + b);
    procentages.push(Number(100 - maxProcentage).toFixed(2));

    divisionCodes.forEach(element => {
      divisions.push(element);
    });


      var countryName = '';
      var myColors=[];

      // $.each(isFinished, function( index,value ) {
      //   if(value > 0){
      //      myColors[index]='#3cba9f';
      //   }else{
      //     myColors[index]='#c45850';
      //   }
      // });

      Chart.Tooltip.positioners.custom = function(elements, eventPosition) { //<-- custom is now the new option for the tooltip position
        /** @type {Chart.Tooltip} */
        var tooltip = this;

        /* ... */

        return {
            x: eventPosition.x,
            y: eventPosition.y
        };
    }


      var ctxLineBarPerEmployee = document.getElementById("bar-chartperemployee") as HTMLCanvasElement;
      if(window.barperemployee != undefined)
      window.barperemployee.destroy();
      window.barperemployee = new Chart(ctxLineBarPerEmployee, {
        type: 'horizontalBar',
                data: {
                  labels: divisionCodes,
                  datasets: [
                    {
                    data: totals,
                    backgroundColor: ['#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b',
                    '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#e8c3b'

                  ]
                  },
                ]
                },
                animation: {
                              onComplete: function() {
                                var chartInstance = this.chart;
                                var ctx = chartInstance.ctx;
                                ctx.textAlign = "left";
                                ctx.font = "14px Open Sans";
                                ctx.fillStyle = "#fff";

                                Chart.helpers.each(
                                  this.data.datasets.forEach(function(dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(
                                      meta.data.forEach(function(bar, index) {
                                        totals = dataset.data[index];
                                        if (i == 0) {
                                          ctx.fillText(totals, 50, bar._model.y + 4);
                                        } else {
                                          ctx.fillText(totals, bar._model.x - 25, bar._model.y + 4);
                                        }
                                      }),
                                      this
                                    );
                                  }),
                                  this
                                );
                              }
                            },
                options: {
                  tooltips: {
                    enabled: true,
                    footerFontSize: 14,
                    position : 'custom',
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    displayColors: true,
                    backgroundColor: '#004413',
                    // callbacks: {
                    //     label: function(tooltipItem) {
                    //         return tooltipItem.value;
                    //     }
                    // }

                    callbacks: {
                      label: function(tooltipItem, data) {
                          // var label = scanned[tooltipItem.index] || '';

                          var multistringText = [];
                           multistringText.push(divisionNames[tooltipItem.index]);
                           multistringText.push('-');
                           multistringText.push('Initial: ' + initials[tooltipItem.index]);
                           multistringText.push('Scanate: ' + scanned[tooltipItem.index]);
                           multistringText.push('Nescanate: ' + (initials[tooltipItem.index] - scanned[tooltipItem.index]));

                           return multistringText;

                          // if (label) {
                          //     label += ': ';
                          // }
                           // label += Math.round(tooltipItem.scanned * 100) / 100;
                          // return multistringText;
                      }
                    },
                },
                  legend: { display: false },
                  title: {
                  display: true,
                  text: countryName
                },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'green',
                        precision: 0
                      }
                    },
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',

                          },
                          stacked: true
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 14,
                            fontStyle: 'bold',
                            beginAtZero: true,
                            // max: 100,
                            // min: 0
                        },
                        stacked: true,
                        position: 'top'
                    }]
                  },
              },
              plugins: [{
            //     beforeInit: function(chartInstance) {
            //     var totals = [];
            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             var total = 0;
            //             chartInstance.data.datasets.forEach(function(dataset) {
            //                 total += dataset.data[i];
            //             });
            //             totals.push(total);
            //         }
            //     });

            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
            //         }
            //     });
            // },
            afterDraw: function(chartInstance) {
                var ctx = chartInstance.chart.ctx;


                ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                // ctx.fillStyle = '#004413';

                chartInstance.data.datasets.forEach(function(dataset) {
                    // if (dataset._meta[0].controller.index != 0) return;


                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        let offside= 70;
                        ctx.fillStyle='#000';
                        ctx.fillStyle = dataset.backgroundColor[i] === '#000' ? '#000' : '#000';

                        let procent = parseFloat(dataset.data[i]).toFixed(0);
                        let fff = +procent;

                        if (fff < 26 && fff > 20) {
                          ctx.textAlign = 'left';
                          offside = 55;
                        } else if (fff < 21 && fff > 10) {
                          ctx.textAlign = 'left';
                          offside = 65;
                        }
                        else if (fff <= 10) {
                          ctx.textAlign = 'left';
                          offside = 0;
                        }


                        ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                    }
                });
            }}]
      });

      // var ctxLineBarPerCity = document.getElementById("bar-chartpercity") as HTMLCanvasElement;
      // if(window.barpercity != undefined)
      // window.barpercity.destroy();
      // window.barpercity = new Chart(ctxLineBarPerCity, {
      //   type: 'horizontalBar',
      //           data: {
      //             labels: locationCodes,
      //             datasets: [{
      //               data: procentages,
      //               backgroundColor: ["#3e95cd", "#8e5ea2","#8e5ea2","#8e5ea2","#8e5ea2"]
      //             }]
      //           },
      //           options: {
      //             legend: { display: false },
      //             title: {
      //             display: true,
      //             text: 'Procent scanare per centru de cost'
      //           },
      //               responsive: true,
      //               maintainAspectRatio: false,
      //               plugins: {
      //                 labels: {
      //                   render: 'value',
      //                   fontColor: ['green', 'green', 'green'],
      //                   precision: 2
      //                 }
      //               },
      //             scales: {
      //                 yAxes: [{
      //                     ticks: {
      //                         beginAtZero: true,
      //                         max: 100
      //                     }
      //                 }]
      //             }
      //         }
      // });

        // var ctxLine = document.getElementById("doughnut-chart") as HTMLCanvasElement;
        // if(window.pie != undefined)
        // window.pie.destroy();
        // window.pie = new Chart(ctxLine, {
        //   type: 'pie',
        //           data: {
        //             labels: locationCodes,
        //             datasets: [{
        //               // data: [procentages, Number(100 - maxProcentage).toFixed(2)],
        //               data: procentages,
        //               backgroundColor: ["#3e95cd", "#8e5ea2","#433173","#A65B16","#DEA03E","#62DBA6","#E09D9D"]
        //             }]
        //           },
        //           options: {
        //             legend: { display: true },
        //             title: {
        //             display: true,
        //             text: 'Procent scanare per centru de cost'
        //           },
        //             responsive: true,
        //             maintainAspectRatio: true,
        //             plugins: {
        //               labels: {
        //                 render: 'percentage',
        //                 fontColor: ['yellow', 'white', 'green'],
        //                 precision: 2
        //               }
        //             },
        //           }
        // });


    // var chart = new Chartist.Line('.ct-chart', {
    //   labels: locationNames,
    //   series: [
    //     initials,
    //     scans
    //   ]
    // },
    //  {
    //   low: 0
    // });

    // // Let's put a sequence number aside so we can use it in the event callbacks
    // var seq = 0,
    //   delays = 80,
    //   durations = 500;

    // // Once the chart is fully created we reset the sequence
    // chart.on('created', function handler(context) {
    //   chart.off('draw', handler);
    //   seq = 0;
    // });

    // // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    // chart.on('draw', function(data) {
    //   seq++;

    //   if(data.type === 'line') {
    //     // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
    //     data.element.animate({
    //       opacity: {
    //         // The delay when we like to start the animation
    //         begin: seq * delays + 1000,
    //         // Duration of the animation
    //         dur: durations,
    //         // The value where the animation should start
    //         from: 0,
    //         // The value where it should end
    //         to: 1
    //       }
    //     });
    //   } else if(data.type === 'label' && data.axis === 'x') {
    //     data.element.animate({
    //       y: {
    //         begin: seq * delays,
    //         dur: durations,
    //         from: data.y + 100,
    //         to: data.y,
    //         // We can specify an easing function from Chartist.Svg.Easing
    //         easing: 'easeOutQuart'
    //       }
    //     });
    //   } else if(data.type === 'label' && data.axis === 'y') {
    //     data.element.animate({
    //       x: {
    //         begin: seq * delays,
    //         dur: durations,
    //         from: data.x - 100,
    //         to: data.x,
    //         easing: 'easeOutQuart'
    //       }
    //     });
    //   } else if(data.type === 'point') {
    //     data.element.animate({
    //       x1: {
    //         begin: seq * delays,
    //         dur: durations,
    //         from: data.x - 10,
    //         to: data.x,
    //         easing: 'easeOutQuart'
    //       },
    //       x2: {
    //         begin: seq * delays,
    //         dur: durations,
    //         from: data.x - 10,
    //         to: data.x,
    //         easing: 'easeOutQuart'
    //       },
    //       opacity: {
    //         begin: seq * delays,
    //         dur: durations,
    //         from: 0,
    //         to: 1,
    //         easing: 'easeOutQuart'
    //       }
    //     });
    //   } else if(data.type === 'grid') {
    //     // Using data.axis we get x or y which we can use to construct our animation definition objects
    //     var pos1Animation = {
    //       begin: seq * delays,
    //       dur: durations,
    //       from: data[data.axis.units.pos + '1'] - 30,
    //       to: data[data.axis.units.pos + '1'],
    //       easing: 'easeOutQuart'
    //     };

    //     var pos2Animation = {
    //       begin: seq * delays,
    //       dur: durations,
    //       from: data[data.axis.units.pos + '2'] - 100,
    //       to: data[data.axis.units.pos + '2'],
    //       easing: 'easeOutQuart'
    //     };

    //     var animations = {};
    //     animations[data.axis.units.pos + '1'] = pos1Animation;
    //     animations[data.axis.units.pos + '2'] = pos2Animation;
    //     animations['opacity'] = {
    //       begin: seq * delays,
    //       dur: durations,
    //       from: 0,
    //       to: 1,
    //       easing: 'easeOutQuart'
    //     };

    //     data.element.animate(animations);
    //   }
    // });

    // // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
    // chart.on('created', function() {
    //   if(window.__exampleAnimateTimeout) {
    //     clearTimeout(window.__exampleAnimateTimeout);
    //     window.__exampleAnimateTimeout = null;
    //   }
    //   window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 11000);
    // });

});

}

private updateSubTypeData() {

  this.assetHttpService.auditSubtypeChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);

      var myColors=[];


      $.each(total, function( index,value ) {
        if(value > 100){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

  let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

  code.forEach(element => {
    codes.push(element);
  });


    var ctxLineBarSubtype = document.getElementById("bar-chartpersubtype") as HTMLCanvasElement;
    if(window.barsubtype != undefined)
    window.barsubtype.destroy();
    window.barsubtype = new Chart(ctxLineBarSubtype, {
      scaleOverride : true,
      type: 'horizontalBar',
              data: {
                labels: codes,
                datasets: [
                  {
                    label: 'SUBTYPE',
                    // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    backgroundColor: myColors,
                    data: total
                  },
                ]
              },
              options: {
                tooltips: {
                  enabled : true,
                  footerFontSize: 20,
                  bodyFontSize: 20,
                  titleFontSize: 20,
                  callbacks: {
                      label: function(tooltipItem) {
                          return tooltipItem.value;
                      }
                  }
                //   label: function(tooltipItem, data) {
                //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

                //     if (label) {
                //         label += ': ';
                //     }
                //     label += Math.round(tooltipItem.yLabel * 100) / 100;
                //     return label;
                // }
              },
                responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    labels: {
                      render: 'value',
                      fontColor: ['green', 'green', 'green','green', 'green', 'green','green', 'green', 'green','green', 'green', 'green'],
                      precision: 2,
                    }
                  },
                text: 'Locatii finalizate / zi',
                display: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxPerDay,
                            min: 0
                        },position: 'top'
                    }]
                }
            },
            plugins: [{
              //     beforeInit: function(chartInstance) {
              //     var totals = [];
              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             var total = 0;
              //             chartInstance.data.datasets.forEach(function(dataset) {
              //                 total += dataset.data[i];
              //             });
              //             totals.push(total);
              //         }
              //     });

              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
              //         }
              //     });
              // },
              afterDraw: function(chartInstance) {
                  var ctx = chartInstance.chart.ctx;

                  ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
                  ctx.fillStyle = '#000';

                  chartInstance.data.datasets.forEach(function(dataset) {
                      // if (dataset._meta[0].controller.index != 0) return;

                      for (var i = 0; i < dataset.data.length; i++) {
                          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                          let offside = 50;

                          let procent = parseFloat(dataset.data[i]).toFixed(0);
                          let fff = +procent;

                          if (fff <1000) {
                            offside = -20;
                          }

                          ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                      }
                  });
              }}]
    });


});

}

private updateAssetComponentData() {

  this.assetHttpService.auditAssetComponentChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);

      var myColors=[];


      $.each(total, function( index,value ) {
        if(value > 100){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

  let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

  code.forEach(element => {
    codes.push(element);
  });


    var ctxLineBarAssetComponent = document.getElementById("bar-chartperassetcomponent") as HTMLCanvasElement;
    if(window.barassetcomponent != undefined)
    window.barassetcomponent.destroy();
    window.barassetcomponent = new Chart(ctxLineBarAssetComponent, {
      scaleOverride : true,
      type: 'horizontalBar',
              data: {
                labels: codes,
                datasets: [
                  {
                    label: 'ACCESSORIES',
                    // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    backgroundColor: myColors,
                    data: total
                  },
                ]
              },
              options: {
                tooltips: {
                  enabled : true,
                  footerFontSize: 20,
                  bodyFontSize: 20,
                  titleFontSize: 20,
                  callbacks: {
                      label: function(tooltipItem) {
                          return tooltipItem.value;
                      }
                  }
                //   label: function(tooltipItem, data) {
                //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

                //     if (label) {
                //         label += ': ';
                //     }
                //     label += Math.round(tooltipItem.yLabel * 100) / 100;
                //     return label;
                // }
              },
                responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    labels: {
                      render: 'value',
                      fontColor: ['green', 'green', 'green','green', 'green', 'green','green', 'green', 'green','green', 'green', 'green'],
                      precision: 2,
                    }
                  },
                text: 'Accessories',
                display: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxPerDay,
                            min: 0
                        },position: 'top'
                    }]
                }
            },
            plugins: [{
              //     beforeInit: function(chartInstance) {
              //     var totals = [];
              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             var total = 0;
              //             chartInstance.data.datasets.forEach(function(dataset) {
              //                 total += dataset.data[i];
              //             });
              //             totals.push(total);
              //         }
              //     });

              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
              //         }
              //     });
              // },
              afterDraw: function(chartInstance) {
                  var ctx = chartInstance.chart.ctx;

                  ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
                  ctx.fillStyle = '#000';

                  chartInstance.data.datasets.forEach(function(dataset) {
                      // if (dataset._meta[0].controller.index != 0) return;

                      for (var i = 0; i < dataset.data.length; i++) {
                          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                          let offside = 50;

                          let procent = parseFloat(dataset.data[i]).toFixed(0);
                          let fff = +procent;

                          if (fff <1000) {
                            offside = -20;
                          }

                          ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                      }
                  });
              }}]
    });


});

}

private updateTypeData() {

  this.assetHttpService.auditTypeChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);

  let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

  code.forEach(element => {
    codes.push(element);
  });


    var ctxLineBarType = document.getElementById("bar-chartpertype") as HTMLCanvasElement;
    if(window.barttype != undefined)
    window.bartype.destroy();
    window.bartype = new Chart(ctxLineBarType, {
      scaleOverride : true,
      type: 'horizontalBar',
              data: {
                labels: codes,
                datasets: [
                  {
                    label: 'TYPE',
                    backgroundColor: '#3e95cd',
                    data: total
                  },
                ]
              },
              options: {
                tooltips: {
                  enabled : true,
                  footerFontSize: 20,
                  bodyFontSize: 20,
                  titleFontSize: 20,
                  callbacks: {
                      label: function(tooltipItem) {
                          return tooltipItem.value;
                      }
                  }
                //   label: function(tooltipItem, data) {
                //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

                //     if (label) {
                //         label += ': ';
                //     }
                //     label += Math.round(tooltipItem.yLabel * 100) / 100;
                //     return label;
                // }
              },
                responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    labels: {
                      render: 'value',
                      fontColor: ['green', 'green', 'green','green', 'green', 'green','green', 'green', 'green','green', 'green', 'green'],
                      precision: 2,
                    }
                  },
                text: 'Locatii finalizate / zi',
                display: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxPerDay,
                            min: 0
                        },position: 'top'
                    }]
                }
            },
            plugins: [{
              //     beforeInit: function(chartInstance) {
              //     var totals = [];
              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             var total = 0;
              //             chartInstance.data.datasets.forEach(function(dataset) {
              //                 total += dataset.data[i];
              //             });
              //             totals.push(total);
              //         }
              //     });

              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
              //         }
              //     });
              // },
              afterDraw: function(chartInstance) {
                  var ctx = chartInstance.chart.ctx;

                  ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
                  ctx.fillStyle = '#000';

                  chartInstance.data.datasets.forEach(function(dataset) {
                      // if (dataset._meta[0].controller.index != 0) return;

                      for (var i = 0; i < dataset.data.length; i++) {
                          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                          let offside = 50;

                          let procent = parseFloat(dataset.data[i]).toFixed(0);
                          let fff = +procent;

                          if (fff < 1000) {
                            offside = -20;
                          }

                          ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                      }
                  });
              }}]
    });


});

}

private updateMasterTypeData() {

  this.assetHttpService.auditMasterTypeChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);

  let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

  code.forEach(element => {
    codes.push(element);
  });


    var ctxLineBarMasterType = document.getElementById("bar-chartpermastertype") as HTMLCanvasElement;
    if(window.bartmastertype != undefined)
    window.barmastertype.destroy();
    window.barmastertype = new Chart(ctxLineBarMasterType, {
      scaleOverride : true,
      type: 'horizontalBar',
              data: {
                labels: codes,
                datasets: [
                  {
                    label: 'MASTERTYPE',
                    backgroundColor: '#3e95cd',
                    data: total
                  },
                ]
              },
              options: {
                tooltips: {
                  enabled : true,
                  footerFontSize: 20,
                  bodyFontSize: 20,
                  titleFontSize: 20,
                  callbacks: {
                      label: function(tooltipItem) {
                          return tooltipItem.value;
                      }
                  }
                //   label: function(tooltipItem, data) {
                //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

                //     if (label) {
                //         label += ': ';
                //     }
                //     label += Math.round(tooltipItem.yLabel * 100) / 100;
                //     return label;
                // }
              },
                responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    labels: {
                      render: 'value',
                      fontColor: ['green', 'green', 'green','green', 'green', 'green','green', 'green', 'green','green', 'green', 'green'],
                      precision: 2,
                    }
                  },
                text: 'Locatii finalizate / zi',
                display: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxPerDay,
                            min: 0
                        },position: 'top'
                    }]
                }
            },
            plugins: [{
              //     beforeInit: function(chartInstance) {
              //     var totals = [];
              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             var total = 0;
              //             chartInstance.data.datasets.forEach(function(dataset) {
              //                 total += dataset.data[i];
              //             });
              //             totals.push(total);
              //         }
              //     });

              //     chartInstance.data.datasets.forEach(function(dataset) {
              //         for (var i = 0; i < dataset.data.length; i++) {
              //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
              //         }
              //     });
              // },
              afterDraw: function(chartInstance) {
                  var ctx = chartInstance.chart.ctx;

                  ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
                  ctx.fillStyle = '#000';

                  chartInstance.data.datasets.forEach(function(dataset) {
                      // if (dataset._meta[0].controller.index != 0) return;

                      for (var i = 0; i < dataset.data.length; i++) {
                          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                          let offside = 50;

                          let procent = parseFloat(dataset.data[i]).toFixed(0);
                          let fff = +procent;

                          if (fff < 1000) {
                            offside = -20;
                          }

                          ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                      }
                  });
              }}]
    });


});

}

private updateRegionData(inventoryId: number) {

  this.assetHttpService.region(inventoryId).subscribe( (res) => {


    let regions = [];
    // let divisionNames = res.map(r => '(' + r.divisionCode +  ') ' + r.divisionName + ' (' + r.total + ')');
    let regionNames = res.map(r => r.regionName);
    let regionCodes = res.map(r => r.regionCode);
    let procentages = res.map(r => r.procentage);
    let initials = res.map(r => r.total);
    let totals = res.map(r => r.total);
    let scanned = res.map(r => r.scanned);
    let isFinished = res.map(r => r.isFinished);
    // let notScanned = totals - scanned;
    // let max = initials.reduce((max, val) => max > val ? max : val, initials[0]);
    let maxProcentage = procentages.reduce((a, b) => a + b);
    procentages.push(Number(100 - maxProcentage).toFixed(2));

    regionCodes.forEach(element => {
      regions.push(element);
    });


      var countryName = '';
      var myColors=[];

      $.each(isFinished, function( index,value ) {
        if(value > 0){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

      Chart.Tooltip.positioners.custom = function(elements, eventPosition) { //<-- custom is now the new option for the tooltip position
        /** @type {Chart.Tooltip} */
        var tooltip = this;

        /* ... */

        return {
            x: eventPosition.x,
            y: eventPosition.y
        };
    }


      var ctxLineBarPerRegion = document.getElementById("bar-chartperregion") as HTMLCanvasElement;
      if(window.barperregion != undefined)
      window.barperregion.destroy();
      window.barperregion = new Chart(ctxLineBarPerRegion, {
        type: 'horizontalBar',
                data: {
                  labels: regionCodes,
                  datasets: [
                    {
                    data: procentages,
                    backgroundColor: myColors
                  },
                ]
                },
                animation: {
                              onComplete: function() {
                                var chartInstance = this.chart;
                                var ctx = chartInstance.ctx;
                                ctx.textAlign = "left";
                                ctx.font = "14px Open Sans";
                                ctx.fillStyle = "#fff";

                                Chart.helpers.each(
                                  this.data.datasets.forEach(function(dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(
                                      meta.data.forEach(function(bar, index) {
                                        totals = dataset.data[index];
                                        if (i == 0) {
                                          ctx.fillText(totals, 50, bar._model.y + 4);
                                        } else {
                                          ctx.fillText(totals, bar._model.x - 25, bar._model.y + 4);
                                        }
                                      }),
                                      this
                                    );
                                  }),
                                  this
                                );
                              }
                            },
                options: {
                  tooltips: {
                    enabled: true,
                    footerFontSize: 14,
                    position : 'custom',
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    displayColors: true,
                    backgroundColor: '#004413',
                    // callbacks: {
                    //     label: function(tooltipItem) {
                    //         return tooltipItem.value;
                    //     }
                    // }

                    callbacks: {
                      label: function(tooltipItem, data) {
                          // var label = scanned[tooltipItem.index] || '';

                          var multistringText = [];
                           multistringText.push(regionNames[tooltipItem.index]);
                           multistringText.push('-');
                           multistringText.push('Initial: ' + initials[tooltipItem.index]);
                           multistringText.push('Scanate: ' + scanned[tooltipItem.index]);
                           multistringText.push('Nescanate: ' + (initials[tooltipItem.index] - scanned[tooltipItem.index]));

                           return multistringText;

                          // if (label) {
                          //     label += ': ';
                          // }
                           // label += Math.round(tooltipItem.scanned * 100) / 100;
                          // return multistringText;
                      }
                    },
                },
                  legend: { display: false },
                  title: {
                  display: true,
                  text: countryName
                },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'green',
                        precision: 2
                      }
                    },
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',

                          },
                          stacked: true
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 14,
                            fontStyle: 'bold',
                            beginAtZero: true,
                            max: 100,
                            min: 0
                        },
                        stacked: true,
                        position: 'top'
                    }]
                  },
              },
              plugins: [{
            //     beforeInit: function(chartInstance) {
            //     var totals = [];
            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             var total = 0;
            //             chartInstance.data.datasets.forEach(function(dataset) {
            //                 total += dataset.data[i];
            //             });
            //             totals.push(total);
            //         }
            //     });

            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
            //         }
            //     });
            // },
            afterDraw: function(chartInstance) {
                var ctx = chartInstance.chart.ctx;


                ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                // ctx.fillStyle = '#004413';

                chartInstance.data.datasets.forEach(function(dataset) {
                    // if (dataset._meta[0].controller.index != 0) return;


                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        let offside= 70;
                        ctx.fillStyle='#000';
                        ctx.fillStyle = dataset.backgroundColor[i] === '#000' ? '#000' : '#000';

                        let procent = parseFloat(dataset.data[i]).toFixed(0);
                        let fff = +procent;

                        if (fff < 26 && fff > 20) {
                          ctx.textAlign = 'left';
                          offside = 55;
                        } else if (fff < 21 && fff > 10) {
                          ctx.textAlign = 'left';
                          offside = 65;
                        }
                        else if (fff <= 10) {
                          ctx.textAlign = 'left';
                          offside = 0;
                        }


                        ctx.fillText(parseFloat(dataset.data[i]).toFixed(2) + "%", model.x - offside, (model.y + model.height / 3));
                    }
                });
            }}]
      });


});

}

private updateRoomData(locationId: number, inventoryId: number) {

  this.assetHttpService.room(locationId, inventoryId).subscribe( (res) => {

    this.administrations = [];

    // let divisionNames = res.map(r => '(' + r.divisionCode +  ') ' + r.divisionName + ' (' + r.total + ')');
    let administrationNames = res.map(r => r.administrationName);
    let administrationCodes = res.map(r => r.administrationCode);
    let procentages = res.map(r => r.procentage);
    let totals = res.map(r => r.total);
    let scanned = res.map(r => r.scanned);
    let isFinished = res.map(r => r.isFinished);
    // let notScanned = totals - scanned;
    // let max = initials.reduce((max, val) => max > val ? max : val, initials[0]);
    let maxProcentage = procentages.reduce((a, b) => a + b);
    procentages.push(Number(100 - maxProcentage).toFixed(2));


    administrationCodes.forEach(element => {
      this.administrations.push(element);
    });

      var countryName = '';
      var myColors=[];

      $.each(isFinished, function( index,value ) {
        if(value > 0){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

      Chart.Tooltip.positioners.custom = function(elements, eventPosition) { //<-- custom is now the new option for the tooltip position
        /** @type {Chart.Tooltip} */
        var tooltip = this;

        /* ... */

        return {
            x: eventPosition.x,
            y: eventPosition.y
        };
    }


      var ctxLineBarPerRoom = document.getElementById("bar-chartperroom") as HTMLCanvasElement;
      if(window.barperroom != undefined)
      window.barperroom.destroy();
      window.barperroom = new Chart(ctxLineBarPerRoom, {
        type: 'horizontalBar',
                data: {
                  labels: administrationCodes,
                  datasets: [
                    {
                    data: totals,
                    backgroundColor: myColors
                  },
                ]
                },
                animation: {
                              onComplete: function() {
                                var chartInstance = this.chart;
                                var ctx = chartInstance.ctx;
                                ctx.textAlign = "left";
                                ctx.font = "14px Open Sans";
                                ctx.fillStyle = "#fff";

                                Chart.helpers.each(
                                  this.data.datasets.forEach(function(dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(
                                      meta.data.forEach(function(bar, index) {
                                        totals = dataset.data[index];
                                        if (i == 0) {
                                          ctx.fillText(totals, 50, bar._model.y + 4);
                                        } else {
                                          ctx.fillText(totals, bar._model.x - 25, bar._model.y + 4);
                                        }
                                      }),
                                      this
                                    );
                                  }),
                                  this
                                );
                              }
                            },
                options: {
                  tooltips: {
                    enabled: true,
                    footerFontSize: 14,
                    position : 'custom',
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    displayColors: true,
                    backgroundColor: '#004413',
                    // callbacks: {
                    //     label: function(tooltipItem) {
                    //         return tooltipItem.value;
                    //     }
                    // }

                    callbacks: {
                      label: function(tooltipItem, data) {
                          // var label = scanned[tooltipItem.index] || '';

                          var multistringText = [];
                           multistringText.push(administrationNames[tooltipItem.index]);
                           multistringText.push('-');
                           multistringText.push('Initials: ' + totals[tooltipItem.index]);
                           multistringText.push('Scanned: ' + scanned[tooltipItem.index]);
                           multistringText.push('NotScanned: ' + (totals[tooltipItem.index] - scanned[tooltipItem.index]));

                           return multistringText;

                          // if (label) {
                          //     label += ': ';
                          // }
                           // label += Math.round(tooltipItem.scanned * 100) / 100;
                          // return multistringText;
                      }
                    },
                },
                  legend: { display: false },
                  title: {
                  display: true,
                  text: countryName
                },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'green',
                        precision: 0
                      }
                    },
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',

                          },
                          stacked: true
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 14,
                            fontStyle: 'bold',
                            beginAtZero: true,
                            // max: 100,
                            // min: 0
                        },
                        stacked: true,
                        position: 'top'
                    }]
                  },
              },
              plugins: [{
            //     beforeInit: function(chartInstance) {
            //     var totals = [];
            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             var total = 0;
            //             chartInstance.data.datasets.forEach(function(dataset) {
            //                 total += dataset.data[i];
            //             });
            //             totals.push(total);
            //         }
            //     });

            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             dataset.data[i] = '' + (dataset.data[i] / totals[i]) * 100;
            //         }
            //     });
            // },
            afterDraw: function(chartInstance) {
                var ctx = chartInstance.chart.ctx;


                ctx.font = Chart.helpers.fontString(16, 'bold', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                // ctx.fillStyle = '#004413';

                chartInstance.data.datasets.forEach(function(dataset) {
                    // if (dataset._meta[0].controller.index != 0) return;


                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        let offside= 70;
                        ctx.fillStyle='#000';
                        ctx.fillStyle = dataset.backgroundColor[i] === '#000' ? '#000' : '#000';

                        let procent = parseFloat(dataset.data[i]).toFixed(0);
                        let fff = +procent;

                        if (fff < 500 && fff > 100) {
                          ctx.textAlign = 'left';
                          offside = 55;
                        }
                        // else if (fff < 21 && fff > 10) {
                        //   ctx.textAlign = 'left';
                        //   offside = 65;
                        // }
                        else if (fff <= 100) {
                          ctx.textAlign = 'left';
                          offside = 0;
                        }


                        ctx.fillText(parseFloat(dataset.data[i]).toFixed(0), model.x - offside, (model.y + model.height / 3));
                    }
                });
            }}]
      });

});

}

private updateLocationData(regionId: number, inventoryId: number) {

  this.assetHttpService.location(regionId, inventoryId).subscribe( (res) => {

    this.locations = [];

    // let divisionNames = res.map(r => '(' + r.divisionCode +  ') ' + r.divisionName + ' (' + r.total + ')');
    let locationNames = res.map(r => r.locationName);
    let locationCodes = res.map(r => r.locationCode);
    let procentages = res.map(r => r.procentage);
    let totals = res.map(r => r.total);
    let scanned = res.map(r => r.scanned);
    let isFinished = res.map(r => r.isFinished);
    // let notScanned = totals - scanned;
    // let max = initials.reduce((max, val) => max > val ? max : val, initials[0]);
    let maxProcentage = procentages.reduce((a, b) => a + b);
    procentages.push(Number(100 - maxProcentage).toFixed(2));


    locationCodes.forEach(element => {
      this.locations.push(element);
    });

      var countryName = '';
      var myColors=[];



      $.each(isFinished, function( index,value ) {
        if(value > 0){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

      Chart.Tooltip.positioners.custom = function(elements, eventPosition) { //<-- custom is now the new option for the tooltip position
        /** @type {Chart.Tooltip} */
        var tooltip = this;

        /* ... */

        return {
            x: eventPosition.x,
            y: eventPosition.y
        };
    }


      var ctxLineBarPerLocation = document.getElementById("bar-chartperlocation") as HTMLCanvasElement;

      if(window.barperlocation != undefined)
      window.barperlocation.destroy();
      window.barperlocation = new Chart(ctxLineBarPerLocation, {
        type: 'horizontalBar',
                data: {
                  labels: locationCodes,
                  datasets: [
                    {
                    data: procentages,
                    backgroundColor: myColors
                  },
                ]
                },
                animation: {
                              onComplete: function() {
                                var chartInstance = this.chart;
                                var ctx = chartInstance.ctx;
                                ctx.textAlign = "left";
                                ctx.font = "10px Open Sans";
                                ctx.fillStyle = "#fff";

                                Chart.helpers.each(
                                  this.data.datasets.forEach(function(dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(
                                      meta.data.forEach(function(bar, index) {
                                        totals = dataset.data[index];
                                        if (i == 0) {
                                          ctx.fillText(totals, 50, bar._model.y + 4);
                                        } else {
                                          ctx.fillText(totals, bar._model.x - 25, bar._model.y + 4);
                                        }
                                      }),
                                      this
                                    );
                                  }),
                                  this
                                );
                              }
                            },
                options: {
                  tooltips: {
                    enabled: true,
                    footerFontSize: 14,
                    position : 'custom',
                    bodyFontSize: 14,
                    titleFontSize: 14,
                    displayColors: true,
                    backgroundColor: '#004413',
                    // callbacks: {
                    //     label: function(tooltipItem) {
                    //         return tooltipItem.value;
                    //     }
                    // }

                    callbacks: {
                      label: function(tooltipItem, data) {
                          // var label = scanned[tooltipItem.index] || '';

                          var multistringText = [];
                           multistringText.push(locationNames[tooltipItem.index]);
                           multistringText.push('Procent scanare: ' + procentages[tooltipItem.index]);
                           multistringText.push('Initial: ' + totals[tooltipItem.index]);
                           multistringText.push('Scanate: ' + scanned[tooltipItem.index]);
                           multistringText.push('Nescanate: ' + (totals[tooltipItem.index] - scanned[tooltipItem.index]));

                           return multistringText;

                          // if (label) {
                          //     label += ': ';
                          // }
                           // label += Math.round(tooltipItem.scanned * 100) / 100;
                          // return multistringText;
                      }
                    },
                },
                  legend: { display: false },
                  title: {
                  display: true,
                  text: countryName
                },
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'green',
                        precision: 2
                      }
                    },
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',

                          },
                          stacked: true
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 14,
                            fontStyle: 'bold',
                            beginAtZero: true,
                            max: 100,
                            min: 0
                        },
                        stacked: true,
                        position: 'top'
                    }]
                  },
              },
            //   plugins: [{
            // afterDraw: function(chartInstance) {
            //     var ctx = chartInstance.chart.ctx;


            //     ctx.font = Chart.helpers.fontString(12, 'bold', Chart.defaults.global.defaultFontFamily);
            //     ctx.textAlign = 'left';
            //     ctx.textBaseline = 'bottom';
            //     // ctx.fillStyle = '#004413';

            //     chartInstance.data.datasets.forEach(function(dataset) {
            //         // if (dataset._meta[0].controller.index != 0) return;


            //         for (var i = 0; i < dataset.data.length; i++) {
            //             var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            //             let offside= 70;
            //             ctx.fillStyle='#000';
            //             ctx.fillStyle = dataset.backgroundColor[i] === '#000' ? '#000' : '#000';

            //             let procent = parseFloat(dataset.data[i]).toFixed(0);
            //             let fff = +procent;

            //             if (fff < 26 && fff > 20) {
            //               ctx.textAlign = 'left';
            //               offside = 55;
            //             } else if (fff < 21 && fff > 10) {
            //               ctx.textAlign = 'left';
            //               offside = 65;
            //             }
            //             else if (fff <= 10) {
            //               ctx.textAlign = 'left';
            //               offside = 0;
            //             }


            //             ctx.fillText(parseFloat(dataset.data[i]).toFixed(2) + "%", model.x - offside, (model.y + model.height / 3));
            //         }
            //     });
            // }}]
      });

});

}


private updateAdministrationOperationData(administrationId: number, inventoryId: number) {

  this.assetHttpService.auditMasterTypeChart().subscribe((res) => {

  let dashboardColors = this._baConfig.get().colors.dashboard;

            let code = res.map(r => r.code);
            let totals = res.map(r => r.total);
            // let administrationCode = res.map(r => r.administrationCode);
            // let administrationName = res.map(r => r.administrationName);
            // let initial = res.map(r => r.initial);
            // // let initialValue = res.map(r => r.initialValue);
            // let scanned = res.map(r => r.scanned);
            // // let scannedValue = res.map(r => r.scannedValue);
            // let notScanned = res.map(r => r.notScanned);
            // // let notScannedValue = res.map(r => r.notScannedValue);
            // let finalScanned = res.map(r => r.finalScanned);
            // // let finalScannedValue = res.map(r => r.finalScannedValue);
            // let minus = res.map(r => r.minus);
            // // let minusValue = res.map(r => r.minusValue);
            // let plus = res.map(r => r.plus);
            // // let plusValue = res.map(r => r.plusValue);
            // let temporary = res.map(r => r.temporary);
            // // let tranInDivision = res.map(r => r.tranInDivision);
            // // let tranInDivisionDIFFEMP = res.map(r => r.tranInDivisionDIFFEMP);
            // // let tranInDivisionDIFFCC = res.map(r => r.tranInDivisionDIFFCC);
            // // let tranInDivisionDIFFRR = res.map(r => r.tranInDivisionDIFFRR);






        var data =  {
          labels: code,
          datasets: [
            {
              label: "",
              backgroundColor: ['#3cba9f', '#e8c3b', '#c45850','#3e95cd','#8e5ea2','#e8c3b', '#c45850','#3e95cd','#8e5ea2','#3cba9f', '#c45850', '#c45850','#3e95cd','#8e5ea2','#3cba9f'],
              data: totals
            },
          ]
        };
        var ctxLineBarModify = document.getElementById("bar-chart-modify") as HTMLCanvasElement;

        if(window.barmodify != undefined)
        window.barmodify.destroy();
        window.barmodify = new Chart(ctxLineBarModify, {
          type: 'bar',
                  data: data,
                  options: {
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',
                          }
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 14,
                            fontStyle: 'bold',
                        }
                    }]
                  },
                    legend: { display: false },
                    title: {
                          fontSize: 16,
                          display: true,
                          text: 'MASTERTYPE'
                        },
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'black',
                        precision: 2,
                        fontSize: 14,
                        fontStyle: 'bold',
                      },
                    },
                  }
        });

  })

  }

  private updateDivisionOperationData(divisionId: number, inventoryId: number) {

    this.assetHttpService.auditDivisionChart(divisionId, inventoryId).subscribe((res) => {

    let dashboardColors = this._baConfig.get().colors.dashboard;

              let divisionCode = res.map(r => r.divisionCode);
              let divisionName = res.map(r => r.divisionName);
              let administrationCode = res.map(r => r.administrationCode);
              let administrationName = res.map(r => r.administrationName);
              let initial = res.map(r => r.initial);
              // let initialValue = res.map(r => r.initialValue);
              let scanned = res.map(r => r.scanned);
              // let scannedValue = res.map(r => r.scannedValue);
              let notScanned = res.map(r => r.notScanned);
              // let notScannedValue = res.map(r => r.notScannedValue);
              let finalScanned = res.map(r => r.finalScanned);
              // let finalScannedValue = res.map(r => r.finalScannedValue);
              let minus = res.map(r => r.minus);
              // let minusValue = res.map(r => r.minusValue);
              let plus = res.map(r => r.plus);
              // let plusValue = res.map(r => r.plusValue);
              let temporary = res.map(r => r.temporary);
              // let tranInDivision = res.map(r => r.tranInDivision);
              // let tranInDivisionDIFFEMP = res.map(r => r.tranInDivisionDIFFEMP);
              // let tranInDivisionDIFFCC = res.map(r => r.tranInDivisionDIFFCC);
              // let tranInDivisionDIFFRR = res.map(r => r.tranInDivisionDIFFRR);

          var data =  {
            labels: ["Scriptic", "Gasite din scriptic", "Negasite", "Temporare", "Gasite in structura", "Transf. in alta structura", "Transf. din alta structura"],
            datasets: [
              {
                label: "",
                backgroundColor: ["#3e95cd ", "#FA910F","#c45850","#3cba9f","#3cba9f", "#8e5ea2", "#8e5ea2"],
                data: [initial[0], scanned[0], notScanned[0], temporary[0], finalScanned[0], minus[0], plus[0]]
              },
            ]
          };
          var ctxLineBarModifyDivision = document.getElementById("bar-chart-modify-division") as HTMLCanvasElement;

          if(window.barmodifydivision != undefined)
          window.barmodifydivision.destroy();
          window.barmodifydivision = new Chart(ctxLineBarModifyDivision, {
            type: 'bar',
                    data: data,
                    options: {
                      scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontStyle: 'bold',
                            }
                        }],
                        xAxes: [{
                          ticks: {
                              fontSize: 14,
                              fontStyle: 'bold',
                          }
                      }]
                    },
                      legend: { display: false },
                      title: {
                            fontSize: 16,
                            display: true,
                            text: divisionCode + '/ ' + divisionName
                          },
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        labels: {
                          render: 'value',
                          fontColor: 'black',
                          precision: 2,
                          fontSize: 14,
                          fontStyle: 'bold',
                        },
                      },
                    }
          });

    })

    }

    private updateLocationOperationData(locationId: number, inventoryId: number) {

      this.assetHttpService.auditLocationChart(locationId, inventoryId).subscribe((res) => {

      let dashboardColors = this._baConfig.get().colors.dashboard;

                let divisionCode = res.map(r => r.divisionCode);
                let divisionName = res.map(r => r.divisionName);
                let administrationCode = res.map(r => r.administrationCode);
                let administrationName = res.map(r => r.administrationName);
                let initial = res.map(r => r.initial);
                // let initialValue = res.map(r => r.initialValue);
                let scanned = res.map(r => r.scanned);
                // let scannedValue = res.map(r => r.scannedValue);
                let notScanned = res.map(r => r.notScanned);
                // let notScannedValue = res.map(r => r.notScannedValue);
                let finalScanned = res.map(r => r.finalScanned);
                // let finalScannedValue = res.map(r => r.finalScannedValue);
                let minus = res.map(r => r.minus);
                // let minusValue = res.map(r => r.minusValue);
                let plus = res.map(r => r.plus);
                // let plusValue = res.map(r => r.plusValue);
                let temporary = res.map(r => r.temporary);
                // let tranInDivision = res.map(r => r.tranInDivision);
                // let tranInDivisionDIFFEMP = res.map(r => r.tranInDivisionDIFFEMP);
                // let tranInDivisionDIFFCC = res.map(r => r.tranInDivisionDIFFCC);
                // let tranInDivisionDIFFRR = res.map(r => r.tranInDivisionDIFFRR);

            var data =  {
              labels: ["Scriptic", "Gasite din scriptic", "Negasite", "Temporare", "Gasite in adresa", "Transf. la alta adresa", "Transf. din alta adresa"],
              datasets: [
                {
                  label: "",
                  backgroundColor: ["#3e95cd ", "#FA910F","#c45850","#3cba9f","#3cba9f", "#8e5ea2", "#8e5ea2"],
                  data: [initial[0], scanned[0], notScanned[0], temporary[0], finalScanned[0], minus[0], plus[0]]
                },
              ]
            };
            var ctxLineBarModifyLocation = document.getElementById("bar-chart-modify-location") as HTMLCanvasElement;

            if(window.barmodifylocation != undefined)
            window.barmodifylocation.destroy();
            window.barmodifylocation = new Chart(ctxLineBarModifyLocation, {
              type: 'bar',
                      data: data,
                      options: {
                        scales: {
                          yAxes: [{
                              ticks: {
                                  fontSize: 14,
                                  fontStyle: 'bold',
                              }
                          }],
                          xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontStyle: 'bold',
                            }
                        }]
                      },
                        legend: { display: false },
                        title: {
                              fontSize: 16,
                              display: true,
                              text: administrationCode + '  / ' +  administrationName + ' - ' + ' Oras ' + divisionCode
                            },
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          labels: {
                            render: 'value',
                            fontColor: 'black',
                            precision: 2,
                            fontSize: 14,
                            fontStyle: 'bold',
                          },
                        },
                      }
            });

      })

      }

      private updateRegionOperationData(regionId: number, inventoryId: number) {

        this.assetHttpService.auditRegionChart(regionId, inventoryId).subscribe((res) => {

        let dashboardColors = this._baConfig.get().colors.dashboard;

                  let divisionCode = res.map(r => r.divisionCode);
                  let divisionName = res.map(r => r.divisionName);
                  let administrationCode = res.map(r => r.administrationCode);
                  let administrationName = res.map(r => r.administrationName);
                  let initial = res.map(r => r.initial);
                  // let initialValue = res.map(r => r.initialValue);
                  let scanned = res.map(r => r.scanned);
                  // let scannedValue = res.map(r => r.scannedValue);
                  let notScanned = res.map(r => r.notScanned);
                  // let notScannedValue = res.map(r => r.notScannedValue);
                  let finalScanned = res.map(r => r.finalScanned);
                  // let finalScannedValue = res.map(r => r.finalScannedValue);
                  let minus = res.map(r => r.minus);
                  // let minusValue = res.map(r => r.minusValue);
                  let plus = res.map(r => r.plus);
                  // let plusValue = res.map(r => r.plusValue);
                  let temporary = res.map(r => r.temporary);
                  // let tranInDivision = res.map(r => r.tranInDivision);
                  // let tranInDivisionDIFFEMP = res.map(r => r.tranInDivisionDIFFEMP);
                  // let tranInDivisionDIFFCC = res.map(r => r.tranInDivisionDIFFCC);
                  // let tranInDivisionDIFFRR = res.map(r => r.tranInDivisionDIFFRR);

              var data =  {
                labels: ["Scriptic", "Gasite din scriptic", "Negasite", "Temporare", "Gasite in localitate", "Transf. in alta localitate", "Transf. din alt localitate"],
                datasets: [
                  {
                    label: "",
                    backgroundColor: ["#3e95cd ", "#FA910F","#c45850","#3cba9f","#3cba9f", "#8e5ea2", "#8e5ea2"],
                    data: [initial[0], scanned[0], notScanned[0], temporary[0], finalScanned[0], minus[0], plus[0]]
                  },
                ]
              };
              var ctxLineBarModifyRegion = document.getElementById("bar-chart-modify-region") as HTMLCanvasElement;

              if(window.barmodifyregion != undefined)
              window.barmodifyregion.destroy();
              window.barmodifyregion = new Chart(ctxLineBarModifyRegion, {
                type: 'bar',
                        data: data,
                        options: {
                          scales: {
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontStyle: 'bold',
                                }
                            }],
                            xAxes: [{
                              ticks: {
                                  fontSize: 14,
                                  fontStyle: 'bold',
                              }
                          }]
                        },
                          legend: { display: false },
                          title: {
                                fontSize: 16,
                                display: true,
                                text: divisionCode + '/ ' + divisionName
                              },
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            labels: {
                              render: 'value',
                              fontColor: 'black',
                              precision: 2,
                              fontSize: 14,
                              fontStyle: 'bold',
                            },
                          },
                        }
              });

        })

        }

private _loadPieCharts() {

  jQuery('.chart').each(function () {
    let chart = jQuery(this);
    chart.easyPieChart({
      easing: 'easeOutBounce',
      onStep: function (from, to, percent) {
        jQuery(this.el).find('.percent').text(Math.round(percent));
      },
      barColor: jQuery(this).attr('data-rel'),
      trackColor: 'rgba(0,0,0,0)',
      size: 84,
      scaleLength: 0,
      animation: 1000,
      lineWidth: 9,
      lineCap: 'round',
    });
  });

}

private _updatePieCharts() {
  let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

  jQuery('.pie-charts .chart').each(function(index, chart) {
    jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
  });
}

public handleClick( target: HTMLElement ) : void {

	var barElement: HTMLElement | null = target;

	while ( barElement && ! barElement.classList.contains( "bar" ) ) {

		barElement = barElement.parentElement;

	}

	// console.log( "FOUND .bar !!" );
	// console.log( barElement );

}

}
