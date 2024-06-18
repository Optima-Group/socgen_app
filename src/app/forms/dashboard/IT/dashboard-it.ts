import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { BaThemeConfigProvider, colorHelper } from 'app/theme';
import { ModalDirective } from 'ng2-bootstrap';
import * as Chartist from 'chartist';
import * as MyLegend from 'chartist-plugin-legend';
import * as ctPointLabels from 'chartist-plugin-pointlabels';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { InventoryList } from '../../inventory/inventory.list';
import { Inventory } from 'app/model/api/inventory/inventory';
declare const window: any;
@Component({
  selector: 'dashboard-it',
  styleUrls: ['./dashboard-it.scss'],
  templateUrl: './dashboard-it.html',
  providers: [InventoryHttpService]
})
export class DashboardIT implements OnInit {

   donuts: any;
   data: any = {};
   public charts: Array<Object>;
   private _init = false;
   public chartPies: Array<Object>;
   public chartPerLocationPies: Array<Object>;

   public doughnutData: Array<Object>;
   @ViewChild('inventoryList') public inventoryList: InventoryList;
   @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

   private selectedInventories: Array<Inventory> = new Array<Inventory>();
   private inventoryId = 5;

  constructor(
    private assetHttpService: AssetHttpService,
    private inventoryHttpService: InventoryHttpService,
    private _baConfig: BaThemeConfigProvider) {
      var tester = new MyLegend();
  }

  ngOnInit() {
    this.updateData(this.inventoryId);
    this.updateSubTypeInUseData();
    this.updateSubTypeInStockData();
    //this.updateAssetComponentData();
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
  }

private updateData(inventoryId: number) {

  this.assetHttpService.totalIT(inventoryId).subscribe( (res) => {

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

   {
    color: pieColor,
    description: 'Total scanned procentage',
    stats: pieProcentages,
    icon: 'face',
  },
];

});

}


private updateSubTypeInUseData() {

  this.assetHttpService.auditSubtypeITInUseChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);
      let isUnderValue = res.map(r => r.isUnderValue);

      var myColors=[];


      $.each(isUnderValue, function( index,value ) {
        if(value == false){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#3cba9f';
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
                    label: '',
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
                      fontColor: 'green',
                      precision: 2,
                    }
                  },
                text: '',
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

private updateSubTypeInStockData() {

  this.assetHttpService.auditSubtypeITInStockChart().subscribe( (res) => {


      let codes = [];
      let code = res.map(r => r.code);
      let total = res.map(r => r.total);
      let isUnderValue = res.map(r => r.isUnderValue);

      var myColors=[];


      $.each(isUnderValue, function( index,value ) {
        if(value == false){
           myColors[index]='#3cba9f';
        }else{
          myColors[index]='#c45850';
        }
      });

  let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

  code.forEach(element => {
    codes.push(element);
  });


    var ctxLineBarSubtypeStock = document.getElementById("bar-chartpersubtypestock") as HTMLCanvasElement;
    if(window.barsubtypestock != undefined)
    window.barsubtypestock.destroy();
    window.barsubtypestock = new Chart(ctxLineBarSubtypeStock, {
      scaleOverride : true,
      type: 'horizontalBar',
              data: {
                labels: codes,
                datasets: [
                  {
                    label: '',
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
                      fontColor: 'green',
                      precision: 2,
                    }
                  },
                text: '',
                display: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxPerDay,
                            min: 0,
                        },position: 'top'
                    }],
                    yAxes: [{
                      ticks: {
                        fontColor: myColors
                      },
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
}

}
