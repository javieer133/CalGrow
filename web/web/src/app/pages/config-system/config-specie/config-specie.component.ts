import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SpeciesService } from '../../../@core/api/species.service';

@Component({
  selector: 'ngx-config-specie',
  templateUrl: './config-specie.component.html',
  styleUrls: ['./config-specie.component.scss']
})
export class ConfigSpecieComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Opciones',
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nombre',
        type: 'text',
        filter: false,
      },
      seasonStart: {
        title: 'Inicio Temporada',
        type: 'text',
        filter: false,
      },
      seasonFinish: {
        title: 'Termino Temporada',
        type: 'text',
        filter: false,
      },
      harvestDays: {
        title: 'Fecha de cocecha',
        type: 'text',
        filter: false,
      },
      medida: {
        title: 'Medida Máxima',
        type: 'text',
        filter: false,
      },
      id_measure: {
        title: 'Tipo de Medida',
        type: 'number',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private speciesService: SpeciesService) { }

  ngOnInit() {
    this.loadSourceData();
  }

  loadSourceData(): void {
    const _this = this;
    this.speciesService.getSpecies().subscribe({
      next(response) {
        _this.source.load(response.payload);
      }
    });
  };

  onCreateConfirm(event): void {
    let _this = this;
    this.speciesService.createSpecie(event.newData)
      .subscribe({
        next(newField) {
          _this.loadSourceData();
          event.confirm.resolve();
        },
        error(err) {
          window.alert(err.error.message);
        }
      });
  };

  onEditConfirm(event): void {
    let _this = this;
    this.speciesService.updateSpecie(event.newData)
      .subscribe({
        next(newField) {
          _this.loadSourceData();
          event.confirm.resolve();
        },
        error(err) {
          window.alert(err.error.message);
        }
      });
  };

  onDeleteConfirm(event): void {
    if (window.confirm('¿Está seguro de eliminar esta especie?.')) {
      let _this = this;
      this.speciesService.deleteSpecie(event.data.id)
        .subscribe({
          next(newField) {
            _this.loadSourceData();
            event.confirm.resolve();
          },
          error(err) {
            window.alert(err.error.message);
          }
        });
    } else {
      event.confirm.reject();
    }
  }

  

}
