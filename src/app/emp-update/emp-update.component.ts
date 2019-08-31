import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-emp-update",
  templateUrl: "./emp-update.component.html",
  styleUrls: ["./emp-update.component.css"]
})
export class EmpUpdateComponent implements OnInit {
  emp: any = {};
  empid = this.actRoute.snapshot.params["id"];
  updateForm: FormGroup;

  constructor(
    private api: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      location: ["", Validators.required],
      gid: [""],
      econtact: [""]
    });

    this.api.fetchOneEmployee(this.empid).subscribe(data => {
      this.emp = data;
    });
   
  }

  checkValues() {
    // console.log(form);

    console.log(this.updateForm.value);
  }

  // Update employee data
  updateEmployee(form: any) {
    //console.log(form.value);
    console.log(form);

    console.log(this.updateForm.value);
    if (window.confirm("Are you sure, you want to update?")) {
      this.api.updateEmployee(this.empid, form).subscribe(data => {
        this.router.navigate(["/user/dashboard/empdetails"]);
      });
    }
  }
}
