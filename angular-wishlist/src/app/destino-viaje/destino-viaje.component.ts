import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destinos: DestinoViajes;
  @Input() posicion: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() destinoSeleccionado: EventEmitter<DestinoViajes>;

  constructor() {
    this.destinoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(): boolean {
    this.destinoSeleccionado.emit(this.destinos);
    return false;
  }
}
