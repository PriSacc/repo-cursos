import { forwardRef, Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfig, AppState, APP_CONFIG } from '../app.module';
import { DestinoViajes } from './destino-viaje.models'
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.models';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinoApiCliente {
  destino: DestinoViajes[] = [];

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient) {
     this.store
       .select(state => state.destinos)
       .subscribe((data) => {
         console.log('destinos sub store');
         console.log(data);
         this.destino = data.items;
       });
     this.store
       .subscribe((data) => {
         console.log('all store');
         console.log(data);
       });
  }

  add(d: DestinoViajes) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', {nuevo: d.nombre}, {headers: headers});
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
      }
   });
  }

  getAll(): DestinoViajes[] {
    return this.destino;
  }

  getById(id: string): DestinoViajes {
    return this.destino.filter((x) => {x.id.toString() == id;})[0];
  }
  
  elegir(d: DestinoViajes) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }  
}