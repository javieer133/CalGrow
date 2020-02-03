import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-crecimiento-comparado',
  templateUrl: './crecimiento-comparado.component.html',
  styleUrls: ['./crecimiento-comparado.component.scss']
})
export class CrecimientoComparadoComponent implements OnInit {

  options: any;
  data: any;

  crecimientoActual: number = 63;
  crecimientoAnterior: number = 53;
  constructor() { }

  ngOnInit() {
    this.options = {
      responsive: false,
      legend: {
        display: false,
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
      labels: ['Semana Actual', 'Semana Antrior'],
      datasets: [
        {
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [this.crecimientoActual, this.crecimientoAnterior],
          backgroundColor: ['blue', 'red'],
        },
      ],
    };
  }

}
