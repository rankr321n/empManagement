import { Component, OnInit } from "@angular/core";
import { AuthorizeService } from "./authorize.service";
import { ApiService } from "./api.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  username: any;
  id: any;
  constructor(
    private auth: ApiService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.autoLogin();
    this.username = this.api.User();
    this.id = this.api.userId();
  }
}
