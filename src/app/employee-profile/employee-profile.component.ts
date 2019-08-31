import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"]
})
export class EmployeeProfileComponent implements OnInit {
  registrationForm: FormGroup;
  empData: any = [];
  Joiningdate = Date.now();
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: ["", Validators.required],
      contact: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      location: ["", Validators.required],
      date: [""],
      gid: ["", Validators.required]
    });
  }

  addEmpDb() {
    if (window.confirm("Do you Want to Add this User")) {
      this.registrationForm.value.date = this.Joiningdate;
      this.api.addEmpDb(this.registrationForm.value).subscribe(data => {
        this.empData = data;
        if (
          window.confirm(
            "Employee with following details Added " +
              JSON.stringify(this.empData) +
              "Want to add more Employees?"
          )
        ) {
          this.router.navigate(["/user/dashboard/newempadd"]);
        } else {
          this.router.navigate(["/user/dashboard/empdetails"]);
        }
      });
    }
  }
}
