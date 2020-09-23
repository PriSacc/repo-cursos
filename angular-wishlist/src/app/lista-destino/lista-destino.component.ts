import { Component, OnInit } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';
import { DestinoApiCliente } from '../models/destinoApiCliente.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module'
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.models';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss']
})
export class ListaDestinoComponent implements OnInit {
  // destinoApiCliente: DestinoApiCliente;
  // update: string[];

  // constructor() { 
  //   this.destinoApiCliente = new DestinoApiCliente;
  //   this.update = [];
  //   this.destinoApiCliente.susbcribeOnChange((d:DestinoViajes) => {
  //     if (d != null) {
  //       this.update.push('Se ha elegido a: '+ d.nombre);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  // }

  // agregado(d: DestinoViajes) {
  //   this.destinoApiCliente.add(d);
  // }

  // marcar(d: DestinoViajes) {
  //   this.destinoApiCliente.elegir(d);
  // }

  destinoApiCliente: DestinoApiCliente
  update: string[];
  all;

  constructor(private store: Store<AppState>) { 
    this.destinoApiCliente = new DestinoApiCliente;
    this.update = [];
    this.store.select( (state) => state.destinos.favorito)
      .subscribe( (d) => {
      if (d != null) {
        this.update.push('Se ha elegido a: '+ d.nombre);
      }
    });
    this.all = this.store.select( state => state.destinos.items).subscribe(items => this.all = items)
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViajes) {
    this.destinoApiCliente.add(d);
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  marcar(d: DestinoViajes) {
    this.destinoApiCliente.elegir(d);
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
