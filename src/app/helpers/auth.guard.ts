import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';



export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private loginAdmService: LoginService,
    // private toastr: ToastrService
    ){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.loginAdmService.getToken() === null || this.loginAdmService.getToken() === undefined){
        // console.log('Ruta Protegida');
        // this.toastr.error('Debe iniciar Sesión','!Acceso No Permitido¡');
        this.router.navigate(['/']);
        //window.location.reload()
      }
      console.clear();

      return true;
  }
  
}