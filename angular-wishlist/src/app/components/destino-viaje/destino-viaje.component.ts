import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { DestinoViajes } from '../../models/destino-viaje.models';
import { VoteDownAction, VoteUpAction } from '../../models/destinos-viajes-state.models';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss'],
  animations: [
    trigger('esFavorito', [ //cuando lo elige como favorito
      state('esFavorito', style({ //si el estado es favorito
        backgrounColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({ //si el estado es no favorito
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [ //si marcamos a otro favorito, cambia el primero
        animate('3s') //hacemos que el cambio de estilo tarde 3 segundo en cambiar, va como difuminandose por 3 seg hasta llegar al color 'firme'
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destinos: DestinoViajes;
  @Input() posicion: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() destinoSeleccionado: EventEmitter<DestinoViajes>;

  constructor(private store: Store<AppState>) {
    this.destinoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(): boolean {
    this.destinoSeleccionado.emit(this.destinos);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destinos));
    return false; //para que no siga el link
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destinos));
    return false; //para que no siga el link
  }
}
