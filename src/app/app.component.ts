import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {User} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserAuthService} from "./services/user-auth.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonicModule],
})
export class AppComponent {

  user: User | null = null;

  constructor(private authService: UserAuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
