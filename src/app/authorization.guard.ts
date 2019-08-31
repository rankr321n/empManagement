import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";

import { AuthorizeService } from "./authorize.service";

@Injectable({
  providedIn: "root"
})
export class AuthorizationGuard implements CanActivate {
  constructor(private auth: AuthorizeService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
      //return this.router.createUrlTree(["/login"]);
    }
  }
}
