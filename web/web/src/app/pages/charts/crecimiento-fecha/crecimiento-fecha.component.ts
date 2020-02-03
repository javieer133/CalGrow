import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-crecimiento-fecha',
  templateUrl: './crecimiento-fecha.component.html',
  styleUrls: ['./crecimiento-fecha.component.scss']
})
export class CrecimientoFechaComponent implements OnInit {

  options: any;
  data: any;

  crecimiento: number = 42;
  diferencia: number = 100 - this.crecimiento 
  constructor() { }

  
  ngOnInit() {
    Chart.plugins.register({
      beforeDraw: function(chart) {
          if(chart.config.options.plugin_one_attribute) {
            const width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
          ctx.restore();
          const fontSize = 12;
          ctx.font = fontSize + "px Arial";
          ctx.textBaseline = "middle";
          const text = this.crecimiento + '% de crecimiento',
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
        text: this.crecimiento,
      },
      tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }
    }

    this.data = {
      datasets: [{
          data: [this.crecimiento, this.diferencia],
          backgroundColor: ['blue','rgba(0, 0, 0, 0.1)'],
      }],
    };
  }
}
