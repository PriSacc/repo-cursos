import { Component, OnInit } from '@angular/core';
import { DestinoViajes } from '../../models/destino-viaje.models';
import { DestinoApiCliente } from '../../models/destinoApiCliente.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module'
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.models';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss'],
  providers: [DestinoApiCliente] //necesitaba esto para poder declarar privada destinoApiCliente
})
export class ListaDestinoComponent implements OnInit {
  update: string[];
  all;

  constructor(private store: Store<AppState>, 
    private destinoApiCliente: DestinoApiCliente) { 
    this.update = [];
  }
  
  ngOnInit(): void {
    this.store.select( (state) => state.destinos.favorito)
      .subscribe( (d) => {
      if (d != null) {
        this.update.push('Se ha elegido a: '+ d.nombre);
      }
    });
  }

  agregado(d: DestinoViajes) {
    this.destinoApiCliente.add(d);
  }

  marcar(d: DestinoViajes) {
    this.destinoApiCliente.elegir(d);
  }
}
