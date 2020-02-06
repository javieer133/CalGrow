import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Field, Sector, Plant, ApiResponse, Fruit, Measurement } from '../../../@core/api/models';
import { NbDateService, COSMIC_THEME } from '@nebular/theme';
import { FieldsService } from '../../../@core/api/fields.service';
import { SpeciesService } from '../../../@core/api/species.service';


@Component({
  selector: 'ngx-crecimiento-fecha',
  templateUrl: './crecimiento-fecha.component.html',
  styleUrls: ['./crecimiento-fecha.component.scss']
})
export class CrecimientoFechaComponent implements OnInit {

  options: any;
  data: any;

  startDate: Date;
  endDate: Date;

  @Input() field: Field;

  sectors = Array<Sector>();
  plants = Array<Plant>();
  fruits = Array<Fruit>();
  measurements = Array<Measurement>();
  sectorsId = [];
  plantsId = [];
  fruitsId = [];

  crecimiento: number;
  crecimientoEsperado: number;
  selectedFieldItem: Field = {
    name: '',
    numFruits: 0,
    numPlants: 0,
    numSectors: 0,
    gps_pos: '',
    subscriptionId: 0,
  };
  constructor(
    private fieldService: FieldsService,
    private specieService: SpeciesService,
    protected dateService: NbDateService<Date>,
  ) { }

  ngOnInit() {
    this.getAvgField();
  }

  private getPeriod(): { startDate: Date, endDate: Date } {
    this.startDate = new Date(2019, 9, 30);
    this.endDate = this.dateService.today();
    return { startDate: this.startDate, endDate: this.endDate }
  }

  getAvgField(){
    this.specieService.getSpeciesAvgByField(this.field.id).subscribe({
      next: function(avgField) {
        this.crecimientoEsperado = avgField.payload[0].avgField;
        console.log("esperado: ", this.crecimientoEsperado)
        this.fieldAddedEvent();
      }.bind(this),
    });
  }


  fieldAddedEvent() {
      this.fieldService.getAvg(this.field.id).subscribe({
        next: function(avg){
          this.crecimiento = avg.payload[0].pAVG;
          console.log("actual: ", this.crecimiento)
          this.printChart();
        }.bind(this)
      })
  }

  printChart() {
    Chart.plugins.register({
      beforeDraw: function(chart) {
          if(chart.config.options.plugin_one_attribute) {
            const width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
          ctx.restore();
          const fontSize = 11;
          ctx.font = fontSize + "px Arial";
          ctx.textBaseline = "middle";
          const text = (((this.crecimientoEsperado - this.crecimiento)/(this.crecimientoEsperado)) * 100).toFixed(2) + '% de crecimiento',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
          }
      }.bind(this),
    });
    this.options = {
      cutoutPercentage: 85,
      plugin_one_attribute: true,
      responsive: true,
      legend: {
        display: false,
      },
      centerText: {
        display: true,
      },
      /* tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
      } */
    }

    this.data = {
      datasets: [{
          data: [this.crecimientoEsperado - this.crecimiento, this.crecimiento],
          backgroundColor: ['blue', 'rgba(0, 0, 0, 0.1)'],
      }],
    };
  }
}
