import {AccountService} from "@app/_services";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

export function appInitializer(authenticationService: AccountService) {
  return ()=> true;
  // return () => authenticationService.refreshToken()
  // .pipe(
  //   // catch error to start app on success or failure
  //   catchError(() => of())
  // );
}
