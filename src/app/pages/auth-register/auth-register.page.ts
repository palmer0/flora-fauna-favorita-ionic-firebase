import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserAuthService} from "../../services/user-auth.service";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.page.html',
  styleUrls: ['./auth-register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthRegisterPage {

  private fb = inject(FormBuilder);
  private authService = inject(UserAuthService);
  private router = inject(Router);

  form: FormGroup;

  constructor() {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const { email, password } = this.form.value;

    try {
      await this.authService.register(email, password);
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Register error:', err);
    }
  }

}
