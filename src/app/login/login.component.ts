import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthorizeService } from "../authorize.service";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any = {};
  empid = this.actRoute.snapshot.params["id"];
  adminUsername: any;
  userUsername: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        "",
        [Validators.required, Validators.email, Validators.minLength(6)]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  checkUser() {
    this.api.fetchUserLogin().subscribe(data => {
      this.user = data;

      for (let user of this.user) {
        if (user.username == this.loginForm.value.username) {
          if (user.password == this.loginForm.value.password) {
            if (this.loginForm.valid) {
              this.userUsername = this.api.getLoggedInUser(
                this.loginForm.value.username,
                user.id
              );

              localStorage.setItem("User", "token");
              this.router.navigate(["user/dashboard"]);
            }
          } else {
            console.log("Incorrect user Details");
          }
        }
      }
    });
  }

  checkAdmin() {
    // console.log("OnSubmitCheck");

    this.api.fetchLogin().subscribe(data => {
      this.user = data;

      for (let user of this.user) {
        if (user.username == this.loginForm.value.username) {
          if (user.password == this.loginForm.value.password) {
            if (this.loginForm.valid) {
              this.adminUsername = this.api.getLoggedInUser(
                this.loginForm.value.username,
                user.id
              );

              localStorage.setItem(
                "Admin",
                JSON.stringify({ token: "1283273283" })
              );
              this.router.navigate(["admin/dashboard"]);
            }
          } else {
            console.log("Incorrect user Details");
          }
        }
      }
    });
  }

  onSubmit() {
    this.checkUser();
    this.checkAdmin();
  }
}
