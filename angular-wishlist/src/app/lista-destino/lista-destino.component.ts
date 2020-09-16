import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.scss']
})
export class ListaDestinoComponent implements OnInit {
  destinos: string[];
  constructor() { 
    this.destinos = ['Bariloche','Ibiza','Moscu'];
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    console.log(nombre);
    console.log(url);
    return false; //para que no recargue la pagina
  }
}
