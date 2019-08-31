import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(private api: ApiService) {}
  emp: string[];
  date: Date;
  ngOnInit() {
    this.empDetails();
  }
  empDetails() {
    this.api.fetchEmployee().subscribe(data => {
      this.emp = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.emp = data.slice(0, 5);
      //this.emp.toString();
      //this.emp = data;
    });
  }
}
