import { Component, OnInit, Input } from "@angular/core";
import { AuthorizeService } from "../authorize.service";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthorizeService
  ) {}
  url = "UserDashboard";

  username: any;
  ngOnInit() {
    this.router.events.subscribe(res => {
      this.url = this.router.url;
    });

    this.api.userNameChanged.subscribe(val => {
      this.username = val;
    });
  }
}
