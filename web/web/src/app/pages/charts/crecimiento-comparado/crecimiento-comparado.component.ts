import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { FieldsService } from '../../../@core/api/fields.service';
import { Field } from '../../../@core/api/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-crecimiento-comparado',
  templateUrl: './crecimiento-comparado.component.html',
  styleUrls: ['./crecimiento-comparado.component.scss']
})
export class CrecimientoComparadoComponent implements OnInit {

  options: any;
  data: any;

  @Input() field: Field;

  startDate: string;
  endDate: string;
  currentDay = new Date();

  crecimientoActual: number;
  crecimientoAnterior: number;
  crecimientoEsperado: number;
  constructor(private fieldService: FieldsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getDates();
    this.fieldService.getAvgDate(this.field.id, this.startDate, this.endDate).subscribe({
      next: function (avgDate) {
        console.log(avgDate)
        if (avgDate.payload) this.crecimientoActual = avgDate.payload[0].pAVG;
        else this.crecimientoActual = 0;
        this.getExpected();
      }.bind(this),
    });
  }

  getExpected() {
    this.fieldService.getAvg(this.field.id).subscribe({
      next: function(avg){
        console.log(avg)
        if (avg.payload) this.crecimientoEsperado = avg.payload[0].pAVG;
        else this.crecimientoEsperado = 0;
        this.printChart();
      }.bind(this),
    });
  }

  getDates() {
    const day = new Date();
    day.setDate(day.getDay() - 7);
    this.startDate = this.datePipe.transform(day, 'yyyy-MM-dd');

    const day2 = new Date();
    day.setDate(day.getDay() - 14);
    this.endDate = this.datePipe.transform(day2, 'yyyy-MM-dd');
  }

  printChart() {
    this.options = {
      responsive: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
          },
        }],
      },
    },
    this.data = {
      datasets: [
        {
          label: 'Semana Anterior',
          barPercentage: 0.5,
          barThickness: 4,
          maxBarThickness: 5,
          minBarLength: 2,
          data: [this.crecimientoAnterior],
          backgroundColor: ['blue']
        },
        {
          label: 'Semana Actual',
          barPercentage: 0.5,
          barThickness: 4,
          maxBarThickness: 5,
          minBarLength: 2,
          data: [ this.crecimientoActual],
          backgroundColor: ['red'],
        },
      ],
    };
  }

}
