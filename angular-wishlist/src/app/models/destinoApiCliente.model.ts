import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViajes } from './destino-viaje.models'

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
}