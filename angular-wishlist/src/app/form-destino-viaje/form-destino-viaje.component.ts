import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { FormGroup, FormBuilder, Validators, FormControl, Validator, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  fg: FormGroup;
  minLenName = 5; 

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLenName)
      ])],
      url: ['']
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('Cambió el formulario: ', form)
    })
  }

  ngOnInit(): void {
  }

  guardar(nombre:string,url:string): boolean {
    let d = new DestinoViajes(nombre,url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } /*retornar un objeto*/{
    const len = control.value.toString().trim.length;
    if (len > 0 && len < 5) {
      return {invalidName: true}; //coincide en el html
    }
    return null;
  }

  nombreValidatorParametrizable(minLen:number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const len = control.value.toString().trim.length;
      if (len > 0 && len < minLen) {
        return {minLenName: true}; //coincide en el html
      }
      return null;
    }
  }
}
