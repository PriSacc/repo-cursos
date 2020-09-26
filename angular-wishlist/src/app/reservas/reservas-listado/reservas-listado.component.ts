import { Component, OnInit } from '@angular/core';
import { ReservasApiClientService } from '../reservas-api-client.service';

@Component({
  selector: 'app-reservas-listado',
  templateUrl: './reservas-listado.component.html',
  styleUrls: ['./reservas-listado.component.scss']
})
export class ReservasListadoComponent implements OnInit {
  api: ReservasApiClientService;

  constructor() { 
    this.api = new ReservasApiClientService;
  }

  ngOnInit(): void {
  }

}
