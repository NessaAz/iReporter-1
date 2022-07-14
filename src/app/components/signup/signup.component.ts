import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AuthService]
})
export class SignupComponent implements OnInit {
  register: any;

  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.register= {username:'',email:'',password:'', password2:''};
  }
  goLogin() {
    this.router.navigate(['/', 'login']);
  }
  registerUser(){
    this.authService.registerUser(this.register).subscribe(
      response=> {
        alert('User has been registered successfully!')
        this.goLogin()
      },
      error=> console.log (error)
    );
  }
}

