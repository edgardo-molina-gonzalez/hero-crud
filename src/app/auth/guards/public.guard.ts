import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// un guard es un servicio
// un guard se inyecta en la ruta que se desea proteger
@Injectable({ providedIn: 'root' })

// CanMatch, CanActivate y los otros, son interfaces para implementar el guard
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAutentication().pipe(
      tap((isAthenticated) => {
        if (isAthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map((isAthenticated) => !isAthenticated)
    );
  }

  // permite entrar a una ruta que haga match con otra
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    // console.log('Can Match');
    // console.log({ route, segments });

    return this.checkAuthStatus();
  }

  // permite activar una ruta en donde se encuentra el guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot //saaca una foto de los argumentos y parámetros de la ruta
  ): boolean | Observable<boolean> {
    // console.log('Can Activate');
    // console.log({ route, state });

    return this.checkAuthStatus();
  }
}
