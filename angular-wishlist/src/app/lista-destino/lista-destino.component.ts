import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { DestinoApiCliente } from '../models/destinoApiCliente.model';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss']
})
export class ListaDestinoComponent implements OnInit {
  destinoApiCliente: DestinoApiCliente;
  update: string[];

  constructor() { 
    this.destinoApiCliente = new DestinoApiCliente;
    this.update = [];
    this.destinoApiCliente.susbcribeOnChange((d:DestinoViajes) => {
      if (d != null) {
        this.update.push('Se ha elegido a:'+ d.nombre.toString());
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViajes) {
    this.destinoApiCliente.add(d);
  }

  marcar(d: DestinoViajes) {
    this.destinoApiCliente.elegir(d);
  }

}
