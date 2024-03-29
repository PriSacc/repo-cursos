import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViajes } from './destino-viaje.models';
import { HttpClientModule } from '@angular/common/http';

// Estado
export interface DestinosViajesState {
  items: DestinoViajes[];
  loading: boolean;
  favorito: DestinoViajes;
}

export function initializeDestinosViajesState() {
  return {
    items: [],
    loading: false,
    favorito: null
  };
};

// Acciones
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = "[Destinos Viajes] nuevo",
  ELEGIDO_FAVORITO = "[Destinos Viajes] favorito",
  VOTE_UP = "[Destinos Viajes] vote up",
  VOTE_DOWN = "[Destinos Viajes] vote down",
  INIT_MY_DATA = "[Destinos Viajes] init my data"
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor (public destino: DestinoViajes) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor (public destino: DestinoViajes) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor (public destino: DestinoViajes) {}
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor (public destino: DestinoViajes) {}
}

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;
  constructor(public destinos: string[]) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction;

// Reductores o Reducers
export function reducerDestinosViajes (
  state: DestinosViajesState,
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach( x => x.setSelected(false));
      const fav: DestinoViajes = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
    case DestinosViajesActionTypes.VOTE_UP: {
      const d: DestinoViajes = (action as VoteUpAction).destino;
      d.voteUp();
      return { ...state };
    }
    case DestinosViajesActionTypes.VOTE_DOWN: {
      const d: DestinoViajes = (action as VoteDownAction).destino;
      d.voteDown();
      return { ...state };
    }
    case DestinosViajesActionTypes.INIT_MY_DATA: {
      const destinos: string[] = (action as InitMyDataAction).destinos;
      return {
        ...state,
        items: destinos.map((d) => new DestinoViajes(d,''))
      };
    }
  }
  return state;
}

// Efectos
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.action$.pipe(
      ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
      map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(private action$: Actions) {}
}