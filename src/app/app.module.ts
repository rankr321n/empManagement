import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { HeaderComponent } from "./dashboard/header/header.component";
import { FooterComponent } from "./dashboard/footer/footer.component";
import { ApiService } from "./api.service";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AuthorizeService } from "./authorize.service";
import { AuthorizationGuard } from "./authorization.guard";
import { EmployeeComponent } from "./employee/employee.component";

import { AlertComponent } from "./alert/alert.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { ErrorComponent } from "./error/error.component";
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmpUpdateComponent } from './emp-update/emp-update.component';
import { EmpProfileViewComponent } from './emp-profile-view/emp-profile-view.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmployeeListComponent,
    HeaderComponent,
    FooterComponent,
    UserDashboardComponent,
    EmployeeComponent,

    AlertComponent,
    EmployeeDetailComponent,
    ErrorComponent,
    EmployeeProfileComponent,
    EmpUpdateComponent,
    EmpProfileViewComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [ApiService, AuthorizeService, AuthorizationGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
