import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigSystemComponent } from './config-system.component';
import { ConfigSpecieComponent } from './config-specie/config-specie.component';

const routes: Routes = [
    {
      path: '',
      component: ConfigSystemComponent,
      children: [
        {
          path: 'config-species',
          component: ConfigSpecieComponent,
        },
      ],
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [
      RouterModule,
    ],
  })
  export class ConfigSystemRoutingModule { }

  export const routedComponents = [
    ConfigSystemComponent,
    ConfigSpecieComponent,
  ];