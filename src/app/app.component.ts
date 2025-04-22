import {Component} from '@angular/core';
import {User} from "@angular/fire/auth";
import {Router, RouterModule} from "@angular/router";
import {UserAuthService} from "./services/user-auth.service";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonicModule, RouterModule, CommonModule],
})
export class AppComponent {

  user: User | null = null;

  constructor(
    private authService: UserAuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  get currentRoute(): string {
    return this.router.url;
  }
}
