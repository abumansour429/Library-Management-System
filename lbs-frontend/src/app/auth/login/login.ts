import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.auth.saveTokens(res.accessToken, res.refreshToken);
          //this.auth.saveUserRole(res.role);
          this.router.navigate(['/books']);
        },
        error: () => this.error = 'Invalid credentials'
      });
  }
}



