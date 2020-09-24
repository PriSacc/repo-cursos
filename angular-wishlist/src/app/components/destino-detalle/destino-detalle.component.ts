import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViajes } from '../../models/destino-viaje.models';
import { DestinoApiCliente } from '../../models/destinoApiCliente.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.scss']
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViajes;

  constructor(private route: ActivatedRoute, private destinoApiCliente: DestinoApiCliente) { }

  ngOnInit(): void {
    //let id = this.route.snapshot.paramMap.get('id');
    //this.destino = this.destinoApiCliente.getById(id)
  }

}
