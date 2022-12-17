import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {
    if(isDevMode()){
      console.info("[** App is running in development mode **]");
    }
    else {
      console.info("[** App is running in production mode **]");
    }
    this.authenticationService.detectAutoLogin();
  }

}
