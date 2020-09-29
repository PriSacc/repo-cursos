import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Wish List';
  time = new Observable(obs => {
    setInterval(()=>obs.next(new Date().toString()), 1000); //puede usarse para hacer consultas a un servidor cada x cantidad de tiempo
  });

  constructor(private translate: TranslateService) {
    console.log('*********** get translation');
    translate.getTranslation('en').subscribe( x => console.log('x: ' + JSON.stringify(x)));
    translate.setDefaultLang('es');
  }  
}
