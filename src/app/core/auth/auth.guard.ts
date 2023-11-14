import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private isAuthenticated = false;
  private userData = {};

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Simula uma verificação de autenticação.
    console.log(next);
    console.log(state);
    return this.checkAuthentication();
  }

  // private checkAuthentication(): Observable<boolean> {
  //   // Verifica se o usuário está autenticado (simulado).
  //   if (this.isAuthenticated) {
  //     // Se autenticado, permite o acesso.
  //     return of(true);
  //   } else {
  //     // Se não autenticado, redireciona para a página de login (simulado).
  //     this.router.navigate(['/login']);
  //     return of(false);
  //   }
  // }

  private checkAuthentication(): Observable<boolean> {
    // Verifica se o usuário está autenticado (simulado).
    return of(this.isAuthenticated).pipe(
      // Se autenticado, mapeia os dados do usuário (simulado).
      map((authenticated) => {
        if (authenticated) {
          // Adiciona os dados do usuário à sessão (simulado).
          let data = sessionStorage.getItem('user');
          console.log(data);
        }
        return authenticated;
      })
    );
  }

  private setUserData(userData: any): void {
    // Simula a definição de dados do usuário na sessão.
    // sessionStorage.setItem('user', JSON.stringify(userData));
    let data = sessionStorage.getItem('user');
    console.log(data);
  }

  // Método simulado para logar o usuário.
  login(): void {
    this.isAuthenticated = true;
  }

  // Método simulado para deslogar o usuário.
  logout(): void {
    this.isAuthenticated = false;
    // Pode incluir lógica adicional, como redirecionar para a página de login.
  }
}
