import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  fg: FormGroup;
  minLenName = 5; 
  searchResults: string[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLenName)
      ])],
      url: [''],
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('Cambió el formulario: ', form);
    });
  }

  ngOnInit() {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre,'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200), //si no tipea, algo así
        distinctUntilChanged(), //esto es para que no avance si sigue apareciendo la misma palabra ?
        switchMap(() => ajax('/assets/datos.json'))
        ).subscribe(ajaxResponse => {
          this.searchResults = ajaxResponse.response;
        });
  }

  guardar(nombre:string,url:string): boolean {
    let d = new DestinoViajes(nombre,url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } /*retornar un objeto*/{
    const len = control.value.toString().trim().length;
    if (len > 0 && len < 5) {
      return {invalidName: true}; //coincide en el html
    }
    return null;
  }

  nombreValidatorParametrizable(minLen:number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const len = control.value.toString().trim().length;
      if (len > 0 && len < minLen) {
        return {minLenName: true}; //coincide en el html
      }
      return null;
    }
  }
}
