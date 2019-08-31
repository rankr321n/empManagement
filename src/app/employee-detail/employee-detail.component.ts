import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.css"]
})
export class EmployeeDetailComponent implements OnInit {
  constructor(private api: ApiService) {}
  emp: any = [];

  empdata: string = "";

  ngOnInit() {
    this.empDetails();
  }

  empDetails() {
    this.api.fetchEmployee().subscribe(data => {
      this.emp = data;
    });
  }
}
