import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle-component',
  templateUrl: './vuelos-detalle-component.component.html',
  styleUrls: ['./vuelos-detalle-component.component.scss']
})
export class VuelosDetalleComponent implements OnInit {

  id: any;

  constructor(private route: ActivatedRoute) { 
    route.params.subscribe(param => {
      this.id = param['id'];
    });
  }

  ngOnInit(): void {
  }

}
