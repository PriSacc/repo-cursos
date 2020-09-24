import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinoComponent } from './components/lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';

import { DestinosViajesState, reducerDestinosViajes, initializeDestinosViajesState, DestinosViajesEffects } from './models/destinos-viajes-state.models';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { DestinoApiCliente } from './models/destinoApiCliente.model';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: ListaDestinoComponent},
  {path:'destino', component: DestinoDetalleComponent}, /*'destino/:id' --> no lo pongo porque no tengo ID en destino[]*/
  {path: 'login', component: LoginComponent},
  {
    path:'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
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

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinoComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { 
      initialState: reducersInitialState,
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinoApiCliente, AuthService, UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

