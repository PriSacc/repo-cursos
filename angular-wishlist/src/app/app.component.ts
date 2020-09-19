import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Wish List';
  time = new Observable(obs => {
    setInterval(()=>obs.next(new Date().toString()), 1000); //puede usarse para hacer consultas a un servidor cada x cantidad de tiempo
  });

  
}
