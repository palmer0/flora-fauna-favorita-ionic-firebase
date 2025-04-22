import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserAuthService} from "../../services/user-auth.service";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.page.html',
  styleUrls: ['./auth-login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLoginPage  {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Login error:', err);
    }
  }
}
