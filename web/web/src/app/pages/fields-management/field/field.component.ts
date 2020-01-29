import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FieldsService } from '../../../@core/api/fields.service';
import { SectorsService } from '../../../@core/api/sectors.service';
import { PlantsService } from '../../../@core/api/plants.service';
import { FruitsService } from '../../../@core/api/fruits.service';
import { Plant, Sector, ApiResponse } from '../../../@core/api/models';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbToastrService, COSMIC_THEME } from '@nebular/theme';
@Component({
  selector: 'ngx-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Output() getNewField = new EventEmitter();

  subscriptionId: number;
  fieldForm: FormGroup;
  loading: boolean = false;
  autocompleteService: google.maps.places.AutocompleteService;
  

  constructor(private mapsAPILoader: MapsAPILoader, private fieldsService: FieldsService,
    private sectorsService: SectorsService, private plantsService: PlantsService, private fruitsService: FruitsService,
    private authService: NbAuthService, private fb: FormBuilder,
    private ngZone: NgZone, private toastrService: NbToastrService) { }

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  addresses = [];
  seeAddresses: boolean = false;
 
  ngOnInit() {
    this.latitude =  -33.4488897;
    this.longitude = -70.6692655;
    this.zoom = 12;
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      //this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      this.autocompleteService = new google.maps.places.AutocompleteService();
    });

    this.fieldForm = this.fb.group({
      fieldName: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]*')]],
      fieldSectors: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}')]],
      fieldPlants: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}')]],
      fieldFruits: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}')]],
    });

    this.authService.getToken().subscribe({
      next: function (token: NbAuthJWTToken) {
        this.subscriptionId = token.getPayload().subscriptionId;
      }.bind(this),
    });
  }

  
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    //console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  selectedAddress(place_id) {
    this.addresses = [];
    this.zoom = 12;
      this.geoCoder.geocode({'placeId': place_id}, results => {
        this.address = results[0].formatted_address;
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        console.log(results);
        document.getElementById("search").click();
    });
  }

  getAddressByName(name) {
    console.log(this.address);
    console.log(name.key);

    if(name.target.value) {
      this.autocompleteService.getPlacePredictions({ input: this.address, componentRestrictions: {country: 'cl'}, }, results => {
          this.addresses = results;
          console.log(results);
          document.getElementById("search").click();
      }
      );
    }else{
      this.addresses = [];
    }
    
     
  }

  createField(): void {
    this.fieldsService.createField({
      name: this.fieldForm.value.fieldName,
      numSectors: this.fieldForm.value.fieldSectors,
      numPlants: this.fieldForm.value.fieldPlants,
      numFruits: this.fieldForm.value.fieldFruits,
      subscriptionId: this.subscriptionId,
      gps_pos: this.latitude + ',' + this.longitude
    }).subscribe({
        next: function (newField) {
          this.getNewField.emit({newField: newField.payload});
          for (let num = 0; num < this.fieldForm.value.fieldSectors; num++) {
            this.sectorsService.createSector({
              name: newField.payload.name + '-S' + (+num + 1),
              fieldId: newField.payload.id,
            }).subscribe({
              next: function(newSector){
                this.sectors = Array<Sector>()
                this.sectors.push(newSector.payload)
                for (let numP = 0; numP < this.fieldForm.value.fieldPlants; numP++){
                  this.sectors.forEach(element => {
                    this.plantsService.createPlant({
                      name: newSector.payload.name + '-P' + (+numP + 1),
                      sectorId: element.id,
                    }).subscribe({
                      next: function(newPlant){
                        this.plants = Array<Plant>();
                        this.plants.push(newPlant.payload)
                        for (let numF = 0; numF < this.fieldForm.value.fieldPlants; numF++){
                          this.plants.forEach(element => {
                            this.fruitsService.createFruit({
                              name : newPlant.payload.name + '-F' + (+numF + 1),
                              plantId: element.id,
                              fruitPLantId: (+numF + 1),
                            }).subscribe()
                          });
                        }
                      }.bind(this)
                    })
                  });
                }
              }.bind(this)
            })
          }
          this.toastrService.show(
            newField.id,
            "Campo creado",
            { position: 'top-right', status: 'success' });
        }.bind(this),
        error: function (err) {
          this.toastrService.show(
            err.error.message,
            "Error",
            { position: 'top-right', status: 'danger' });
        }.bind(this)
      });
  };

}
