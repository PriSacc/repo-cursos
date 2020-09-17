import { Component, OnInit } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss']
})
export class ListaDestinoComponent implements OnInit {
  destinos: DestinoViajes[];
  constructor() { 
    this.destinos = [];
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    this.destinos.push(new DestinoViajes(nombre,url));
    return false; //para que no recargue la pagina
  }

  marcar(d: DestinoViajes) {
    this.destinos.forEach( (x) => {x.setSelected(false)});
    d.setSelected(true);
  }
}
