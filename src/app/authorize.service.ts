import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AuthorizeService {
  constructor(private router: Router, private api: ApiService) {}

  isAuthenticated(): any {
    const isThere = localStorage.getItem("Admin");

    if (isThere) {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticatedUser(): any {
    const userisThere = localStorage.getItem("User");

    if (userisThere) {
      return true;
    } else {
      return false;
    }
  }
}
