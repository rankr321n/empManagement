import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  emp: string[];

  
  private isUserAdd = false;
  constructor(
    private api: ApiService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.empDetails();
    
  }
  empDetails() {
    this.api.fetchEmp().subscribe(data => {
      this.emp = data;

      //console.log(data);
    });
  }
}
