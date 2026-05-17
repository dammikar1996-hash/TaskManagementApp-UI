import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (res: any) => {

          this.authService.setToken(res.token);

          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Invalid username or password');
        }
      });
  }
}