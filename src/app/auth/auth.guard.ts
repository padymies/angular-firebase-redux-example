import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap(state => {
        if (!state) { this.router.navigate(['/login']) }
      }));

  }


}
