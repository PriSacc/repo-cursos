import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinoComponent } from './components/lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';

import { 
  DestinosViajesState, 
  reducerDestinosViajes, 
  initializeDestinosViajesState, 
  DestinosViajesEffects, 
  InitMyDataAction 
} from './models/destinos-viajes-state.models';
import { ActionReducerMap, Store, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { DestinoApiCliente } from './models/destinoApiCliente.model';
import { AuthService } from './services/auth.service';
import { VuelosComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';

import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';

import Dexie from 'dexie';
import { DestinoViajes } from './models/destino-viaje.models';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//inicio appconfig
export interface AppConfig {
  apiEndpoint: String;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
//fin appconfig

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponent},
  { path: 'mas-info', component: VuelosMasInfoComponent},
  { path: ':id', component: VuelosDetalleComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: ListaDestinoComponent},
  {path:'destino/:id', component: DestinoDetalleComponent},
  {path: 'login', component: LoginComponent},
  {
    path:'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  {
    path: 'vuelos',
    component: VuelosComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutesVuelos
  }
];

// redux
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState()
}
// fin

//app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/any', {headres: headers});
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
//fin app

// dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) { }
} //Habría que hacerlo en otro lado

@Injectable({
  providedIn: 'root'
})

export class MyDataBase extends Dexie {
  destinos: Dexie.Table<DestinoViajes, number>;
  translations: Dexie.Table<Translation, number>;
  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl',
    });
    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lang, key, value'
    });
  }
}

export const db = new MyDataBase();

// fin dexie db

//i18n
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}


  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/api/transalation?lang=' + lang)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then(traducciones => {
        console.log('tradu');
        console.log(traducciones);
        return traducciones;
      }).then(traducciones => {
        return traducciones.map((t) => ({ [t.key]: t.value}));
      });
    return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}
//fin i18n

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinoComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMapboxGLModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { 
      initialState: reducersInitialState,
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService, UsuarioLogueadoGuard, MyDataBase,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService, {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

