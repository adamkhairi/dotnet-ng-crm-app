import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

import {AccountService} from '@app/_services';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private accountService: AccountService
//   ) { }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const account = this.accountService.accountValue;
//     if (account) {
//       // check if route is restricted by role
//       if (route.data["roles"] && !route.data["roles"].includes(account.role)) {
//         // role not authorized so redirect to home page
//         this.router.navigate(['/']);
//         return false;
//       }
//
//       // authorized so return true
//       ;
//     }
//
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }

export function AuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const user = accountService.accountValue;
  if (user) {
    // check if route is restricted by role
    if (route.data["roles"] && !route.data["roles"].includes(user.role)) {
      // role not authorized so redirect to home page
      router.navigate(['/']);
      return false;
    }
    // authorised so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
  return false;
}
