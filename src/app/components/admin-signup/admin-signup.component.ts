import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css'],
  providers: [AuthService]
})
export class AdminSignupComponent implements OnInit {
  register: any;

  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.register= {username:'',email:'',password:'', password2:''};
  }
  goLogin() {
    this.router.navigate(['/', 'login']);
  }
  registerUser(){
    this.authService.registerAdmin(this.register).subscribe(
      response=> {
        alert('Admin has been registered successfully!')
        this.goLogin()
      },
      error=> console.log (error)
    );
  }

}
