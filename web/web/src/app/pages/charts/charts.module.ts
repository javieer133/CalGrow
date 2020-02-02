import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbDatepickerModule, NbStepperModule, NbSelectModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { PlantSelectorComponent } from './plant-selector/plant-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LastmeasurementsComponent } from './lastmeasurements/lastmeasurements.component';
import { MatFormFieldModule, MatPaginatorModule, MatTableModule, MatIconModule, MatSortModule, MatDialogModule, MatDialogRef, MatInputModule } from '@angular/material';

const components = [
  ChartjsMultipleXaxisComponent,
  PlantSelectorComponent,
  LastmeasurementsComponent,
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
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
