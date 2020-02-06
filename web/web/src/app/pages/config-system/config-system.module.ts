import { NgModule } from '@angular/core';
import { ConfigSystemRoutingModule, routedComponents } from './config-system-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbStepperModule, NbListModule, NbTreeGridModule, NbSelectModule, NbDatepickerModule, NbRadioModule, NbCheckboxModule, NbUserModule, NbActionsModule, NbButtonModule, NbIconModule, NbInputModule, NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  imports: [
    ConfigSystemRoutingModule, //routing
    ThemeModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    //stepper
    FormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbListModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    ...routedComponents,
  ],
})
export class ConfigSystemModule { }
