import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Sector } from '../../../@core/api/models';
import { SectorsService } from '../../../@core/api/sectors.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-semanas-cocecha',
  templateUrl: './semanas-cocecha.component.html',
  styleUrls: ['./semanas-cocecha.component.scss']
})
export class SemanasCocechaComponent implements OnInit {

  options: any;
  data: any;

  @Input() sector: Sector;

  currentDate = new Date();
  harvestDate: Date;
  seasonStart: Date;
  diferencia: number;
  total: number;
  constructor(private sectorService: SectorsService, private datePipe: DatePipe) { }

  
  ngOnInit() {
    this.sectorService.getHarvestDays(this.sector.id).subscribe({
      next: function (days) {
        this.harvestDate = days.payload[0].harvestDays;
        this.seasonStart = days.payload[0].seasonStart;


        this.total = Math.round(((new Date(this.harvestDate).getTime()) - (new Date(this.seasonStart).getTime())) / ((1000*60*60*24)))
        console.log("total: " ,this.total)
        this.diferencia = Math.round(((new Date(this.harvestDate).getTime()) - (this.currentDate)) / ((1000*60*60*24)))
        this.printChart();
      }.bind(this),
    });
  }

  printChart() {
    Chart.plugins.register({
      beforeDraw: function(chart) {
          if(chart.config.options.plugin_one_attribute2) {
            const width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
          ctx.restore();
          const fontSize = 11;
          ctx.font = fontSize + "px Arial";
          ctx.textBaseline = "middle";
          const text = this.diferencia + ' días para cocechar',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
          }
      }.bind(this),
    });
    this.options = {
      plugin_one_attribute2: true,
      cutoutPercentage: 85,
      responsive: true,
      legend: {
        display: true,
      },
    }

    this.data = {
      datasets: [{
          labels: ['Días Transcurridos', 'Días Faltantes'],
          data: [this.total - this.diferencia, this.diferencia],
          backgroundColor: ['blue','rgba(0, 0, 0, 0.1)'],
      }],
    };
  }

}
