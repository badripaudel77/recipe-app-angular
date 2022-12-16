import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthResponseDataModel} from "../models/auth-response-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']

})
export class AuthenticationComponent implements OnInit{
  loginMode:boolean = true;
  isLoading:boolean = false;
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  switchAuthMode() {
    this.loginMode = !this.loginMode;
  }

  submitAuthForm(authForm: NgForm) {
    // TODO : can migrate subscribe logic common as subscribe is repeated.
    if(!authForm.valid) {
      console.log("Form isn't valid");
      return;
    }
    this.isLoading = true;
    let authObservable: Observable<AuthResponseDataModel>;

    if(this.loginMode) {
      authObservable = this.authenticationService.signInUser(authForm);
    }
    else {
      authObservable = this.authenticationService.signUpUser(authForm);
    }
    authObservable.subscribe((response: any) => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
        errorMessage => {
            this.isLoading = false;
            this.errorMessage = errorMessage;
        });
       authForm.reset();
  }
}
