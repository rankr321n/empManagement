import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import {
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationStart
} from "@angular/router";
import { AuthorizeService } from "../authorize.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
