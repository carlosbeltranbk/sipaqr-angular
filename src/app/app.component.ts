import { Component} from '@angular/core';
import { ConstantsService } from '../app/services/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'SIPAQR';

  constructor( private _constant: ConstantsService) { }

  logout(){
    location.reload(); 
  }
}

