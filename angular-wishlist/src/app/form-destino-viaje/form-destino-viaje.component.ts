import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.required],
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
}
