import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./dashboard/footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./dashboard/header/header.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AuthorizationGuard } from "./authorization.guard";
import { AlertComponent } from "./alert/alert.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { ErrorComponent } from "./error/error.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeProfileComponent } from "./employee-profile/employee-profile.component";
import { EmpUpdateComponent } from "./emp-update/emp-update.component";
import { EmpProfileViewComponent } from "./emp-profile-view/emp-profile-view.component";
import { UserguardGuard } from "./userguard.guard";

const routes: Routes = [
  {
    path: "admin/dashboard",
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: "userlist",
        //Employeelist is USERLIST On ADMIN
        component: EmployeeListComponent,
        canActivate: [AuthorizationGuard]
      },
      {
        path: "addUser",
        component: AlertComponent,
        canActivate: [AuthorizationGuard]
      }
    ]
  },

  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  {
    path: "user/dashboard/empdetails/emp/view/:id",
    component: EmpProfileViewComponent,
    canActivate: [UserguardGuard]
  },
  {
    path: "user/dashboard/empdetails/emp/update/:id",
    component: EmpUpdateComponent,
    canActivate: [UserguardGuard]
  },

  {
    path: "user/dashboard",
    component: UserDashboardComponent,
    canActivate: [UserguardGuard],
    children: [
      {
        path: "employee",
        component: EmployeeComponent,
        canActivate: [UserguardGuard]
      },

      {
        path: "empdetails",
        component: EmployeeDetailComponent,
        canActivate: [UserguardGuard]
      },
      {
        path: "newempadd",
        component: EmployeeProfileComponent,
        canActivate: [UserguardGuard]
      }
    ]
  }
  // { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
