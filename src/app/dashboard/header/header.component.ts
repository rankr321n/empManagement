import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/api.service";
import { Router } from "@angular/router";
import { AuthorizeService } from "src/app/authorize.service";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: any;
  user: any = [];
  id: any;
  url = "AdminDashboard";

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthorizeService,
    private http: HttpClient
  ) {
    this.username = this.api.User();
    this.id = this.api.userId();
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      this.url = this.router.url;
    });

    this.username = this.api.User();
    this.id = this.api.userId();
  }
}
