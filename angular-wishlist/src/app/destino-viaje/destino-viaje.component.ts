import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destinos: DestinoViajes;
  @HostBinding ('attr.class') cssClass = 'col-md-4';
  constructor() {

  }

  ngOnInit(): void {
  }

}
