import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizeService } from "./authorize.service";

@Injectable({
  providedIn: "root"
})
export class UserguardGuard implements CanActivate {
  constructor(private auth: AuthorizeService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
      //return this.router.createUrlTree(["/login"]);
    }
  }
}
