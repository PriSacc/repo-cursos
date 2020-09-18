import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { DestinoApiCliente } from '../models/destinoApiCliente.model';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss']
})
export class ListaDestinoComponent implements OnInit {
  @Input() onItemAdded: EventEmitter<DestinoViajes>;
  destinos: DestinoViajes[];

  constructor(/*private destinoApiCliente: DestinoApiCliente*/) { 
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViajes) {
    //this.destinoApiCliente.add(d);
    this.destinos.push(d)
    this.onItemAdded.emit(d);
  }

  marcar(d: DestinoViajes) {
    //this.destinoApiCliente.getAll().forEach( (x) => {x.setSelected(false)});
    this.destinos.forEach( (x) => {x.setSelected(false)});
    d.setSelected(true);
  }
}
