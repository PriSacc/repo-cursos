import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViajes } from './destino-viaje.models'
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.models';

//@Injectable
export class DestinoApiCliente {
  destino: DestinoViajes[];
  current: Subject<DestinoViajes> = new BehaviorSubject<DestinoViajes>(null);

  constructor() {
    this.destino = [];
  }

  add(d: DestinoViajes) {
    this.destino.push(d);
  }

  getAll(): DestinoViajes[] {
    return this.destino;
  }

  // getById(id: string): DestinoViajes {
  //   return this.destino.filter((x) => {x.id.toString() == id;})[0];
  // }

  elegir(d: DestinoViajes) {
    this.destino.forEach((x) => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  susbcribeOnChange(fn) {
    this.current.subscribe(fn);
  }



  // CON REDUX SE SIMPLIFICA ASÍ:
  // NO LO PONGO PORQUE NO PUEDO PONER PRIVADO -me tira error en el ng serve- EN LISTA-DESTINO AL DESTINOVIAJEAPICLIENTE
  // constructor(private store: Store<AppState>) {
  // }

  // add(d: DestinoViajes) {
  //   this.store.dispatch(new NuevoDestinoAction(d));
  // }

  // elegir(d: DestinoViajes) {
  //   this.store.dispatch(new ElegidoFavoritoAction(d));
  // }

  
}