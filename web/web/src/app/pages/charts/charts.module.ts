import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbDatepickerModule, NbStepperModule, NbSelectModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { PlantSelectorComponent } from './plant-selector/plant-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  ChartjsMultipleXaxisComponent,
  PlantSelectorComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    ChartModule,
    NbCardModule,
    NbDatepickerModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbButtonModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
