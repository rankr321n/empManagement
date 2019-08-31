import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  AddUser: FormGroup;

  ngOnInit() {
    this.AddUser = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      designation: ["", [Validators.required, Validators.minLength(4)]],
      department: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  addUserDb(user: any) {
    //console.log(this.AddUser.value);

    user = this.AddUser.value;
    this.api.addUserDb(user).subscribe(data => {
      user = data;
      window.alert("Useradded");
      this.router.navigate(["/admin/dashboard/userlist"]);
      // console.log(data);
    });
  }

  close() {
    //  this.router.navigate(["../", "userlist"], { relativeTo: this.route });

    this.router.navigate(["/admin/dashboard/userlist"]);

    // console.log(this.router.url);
  }
}
