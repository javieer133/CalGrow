import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Specie, Sector, ApiResponse } from '../../../@core/api/models';
import { SectorsService } from '../../../@core/api/sectors.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SpeciesService } from '../../../@core/api/species.service';

@Component({
  selector: 'ngx-sectors-species',
  templateUrl: './sectors-species.component.html',
  styleUrls: ['./sectors-species.component.scss']
})
export class SectorsSpeciesComponent implements OnInit {

  @Input() idSpecie: number;
  @Input() selectSpecieOption = true;

  selectedSpecieItem: Specie;
  selectedSpecieName: string;
  isSelectionConfirmed: boolean = false;
  specieName: string;


  specieForm: FormGroup;

  species: Array<Specie>;
  sectors: Array<Sector>;
  filteredSectors: Array<Sector>;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Nombre',
        type: 'text',
        filter: false,
      },
    },
  };



  loadSourceData(): void {
    let _this = this;
    this.filteredSectors = Array<Sector>();
    this.selectedSpecieName = this.selectedSpecieItem.name;
    _this.sectorsService.getSectors().subscribe({
      next(response) {
        for (let i = 0, sectors = response.payload; i < sectors.length; i++) {
          if (sectors[i].fieldId == _this.selectedSpecieItem.id) {
            _this.filteredSectors.push(sectors[i]); // add to data source only sectors that belgons to the selected field
          }
        }
        _this.source.load(_this.filteredSectors); // clear data source array.
      }
    });
  };


  constructor(
    private sectorsService: SectorsService,
    private speciesService: SpeciesService,
    private fb: FormBuilder) { }


  ngOnInit() {
    console.log("Inicio Sector-Especie");
    this.specieForm = this.fb.group({
      fieldCtrl: ['', Validators.required],
    });
    this.getSpecies()

    if(this.idSpecie){
      this.selectedSpecieItem = new Specie();
      this.selectedSpecieItem.id = this.idSpecie;
      this.onSpecieSubmit();
    }
  }


  onSpecieSubmit() {
    this.specieName = this.selectedSpecieItem.name;
    this.isSelectionConfirmed = true;
    this.loadSourceData();
  }

  getSpecies() {
    let _this = this;
      this.species = Array<Specie>();
      this.speciesService.getSpecies().subscribe({
        next: function(response: ApiResponse) {
          response.payload.forEach((specie: Specie) => {
            this.species.push(specie)
          });
        }.bind(this)
      });
  }

  annulateSelection() {
    this.isSelectionConfirmed = false;
  }
}
