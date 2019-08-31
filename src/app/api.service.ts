import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService implements OnInit {
  username: any;
  id: any;
  userNameChanged = new BehaviorSubject<String>(null);
  isIdChanged = new BehaviorSubject<String>(null);
  currentRole: any;

  //username: any;
  constructor(public http: HttpClient, private router: Router) {}
  url = "http://localhost:3000/";

  ngOnInit() {}

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  //Check Admin credentials at login
  fetchLogin(): Observable<any> {
    return this.http.get(this.url + "adminlogin");
  }

  //logout method
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  //GET LOGGED IN USERNAME (ADMIN/USER)

  getLoggedInUser(getuser: any, id: any): any {
    this.username = getuser;
    this.id = id;

    this.LoggedUserbyRole();
  }

  User() {
    return this.username;
  }

  userId() {
    return this.id;
  }

  //Distinguish ADMIN AND USER

  LoggedUserbyRole() {
    if (localStorage.getItem("Admin")) {
      this.http
        .get<{ username: string; id: string; email: string }>(
          this.url + "adminlogin/" + this.id
        )
        .subscribe(res => {
          this.username = res.username;
          this.userNameChanged.next(this.username);
        });
    } else {
      const loc = localStorage.getItem("User");
      if (loc) {
        this.http
          .get<{ username: string; id: string; email: string }>(
            this.url + "userlogin/" + this.id
          )
          .subscribe(res => {
            this.username = res.username;
            this.userNameChanged.next(this.username);
          });
      }
    }
  }

  /*  */

  //fetch User data for admin
  fetchEmp(): Observable<any> {
    return this.http.get(this.url + "userdetails");
  }
  //fetch Employee data for User
  fetchEmployee(): Observable<any> {
    return this.http.get(this.url + "empDetails");
  }

  //Admin adding user to db
  addUserDb(user: any): Observable<any> {
    return this.http.post(this.url + "userdetails", user);
  }

  //User adding Employee to db

  addEmpDb(userdata: any): Observable<any> {
    //console.log("Fetching Admin");

    return this.http.post(this.url + "empDetails", userdata);
  }

  //fetch user login data
  fetchUserLogin(): Observable<any> {
    return this.http.get(this.url + "userlogin");
  }

  //Fetch One Employee
  fetchOneEmployee(id: any): Observable<any> {
    return this.http.get(this.url + "empDetails/" + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //Login automatically on Login redirect
  autoLogin() {
    const admin = localStorage.getItem("Admin");
    const user = localStorage.getItem("User");
    if (admin) {
      this.LoggedUserbyRole();
      localStorage.removeItem("User");
      this.router.navigate(["/admin/dashboard"]);
    }

    if (user) {
      this.LoggedUserbyRole();
      localStorage.removeItem("Admin");
      this.router.navigate(["/user/dashboard"]);
    }
  }

  // API put() method => Update employee
  updateEmployee(id: any, employee: any): Observable<any> {
    return this.http
      .patch(
        this.url + "empdetails/" + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  //
}
