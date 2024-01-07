import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {RecipeService} from "../services/recipe.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isAuthenticated: boolean = false;
  triggerAlertDialog : boolean = false;
  logoutAlertMessage: string = '';

  constructor(private recipeService: RecipeService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authenticationService.userSubject.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  saveData() {
    this.subscription = this.recipeService.saveRecipes().subscribe((data) => {
      // don't need to do anything as we're saving existing data.
    }, error => {
      alert('Error occurred ' + error.getMessage());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchDataFromServer() {
    this.recipeService.fetchDataFromServer();
  }

  logout() {
      this.authenticationService.logoutUser();
  }

  showAlertDialog() {
    this.triggerAlertDialog = true;
    this.logoutAlertMessage = "Are you sure to log out ? ";
  }

  onLogoutHandle($event: boolean) {
   if($event === true) {
      this.logout();
   }
   this.dismissAlertDialog();
  }

  private dismissAlertDialog() {
    this.triggerAlertDialog = false;
    this.logoutAlertMessage = '';
  }
}
