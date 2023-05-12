import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.authService.login('algo', 'algo2').subscribe((user) => {
      this.router.navigate(['/']);
    });
  }
}
