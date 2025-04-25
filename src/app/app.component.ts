import {Component} from '@angular/core';
import {User} from "@angular/fire/auth";
import {Router, RouterModule} from "@angular/router";
import {UserAuthService} from "./services/user-auth.service";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {StatusBar, Style} from '@capacitor/status-bar';

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

    //this.initializeApp();

    this.authService.currentUser$.subscribe(user => {
      this.user = user;

      StatusBar.setOverlaysWebView({ overlay: false }); // que no se superponga
      StatusBar.setStyle({ style: Style.Light }); // o Dark, según tu diseño
    });

  }

  /*
  async initializeApp() {
    await StatusBar.setOverlaysWebView({ overlay: false }); // que no se superponga
    await StatusBar.setStyle({ style: Style.Light });  // o Style.Dark si el fondo es claro
  }
  */

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  get currentRoute(): string {
    return this.router.url;
  }
}
