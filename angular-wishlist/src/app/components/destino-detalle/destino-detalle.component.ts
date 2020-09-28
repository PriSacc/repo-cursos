import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { DestinoViajes } from '../../models/destino-viaje.models';
import { DestinoApiCliente } from '../../models/destinoApiCliente.model';

class DestinoApiClientViejo {
  getById(id: string): DestinoViajes {
    console.log('Llamando por la clase vieja');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config'); //lo de parentesis no puede repetirse en todo el sistema

// NO PUEDO PORQUE NO PUEDO PONER EN DESTINOAPICLIENTE EL STORE EN EL CONSTRUCTOR
// class DestinosApiClientDecorated extends DestinoApiCliente {
//   constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
//     super(store);
//   }

//   getById(id: string): DestinoViajes {
//     console.log('llamando por la clase decorada');
//     console.log('config: ' + this.config.apiEndpoint);
//     return super.getById(id);
//   }
// }

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.scss'],
  providers: [
    // {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    // {provide: DestinoApiCliente, useClass: DestinosApiClientDecorated}, 
    {provide: DestinoApiClientViejo, useExisting: DestinoApiCliente}]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViajes;

  constructor(private route: ActivatedRoute, private destinoApiCliente: DestinoApiClientViejo) { }

  ngOnInit(): void {
    //let id = this.route.snapshot.paramMap.get('id');
    //this.destino = this.destinoApiCliente.getById(id);
  }

}
