import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-heroes-page.component.html',
  styleUrls: ['./layout-heroes-page.component.css'],
})
export class LayoutHeroesPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public sidebarItems = [
    { label: 'listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  get user(): User | undefined {
    return this.authService.currentUser as User;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
