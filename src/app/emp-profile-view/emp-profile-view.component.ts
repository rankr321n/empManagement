import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-emp-profile-view",
  templateUrl: "./emp-profile-view.component.html",
  styleUrls: ["./emp-profile-view.component.css"]
})
export class EmpProfileViewComponent implements OnInit {
  emp: any = {};

  empid = this.actRoute.snapshot.params["id"];
  // f: NgForm;

  constructor(
    private api: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.api.fetchOneEmployee(this.empid).subscribe(data => {
      this.emp = data;
      ///console.log("get APi" + JSON.stringify(data.first_name));
    });
  }
}
