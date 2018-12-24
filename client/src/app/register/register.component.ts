import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerUserData: {email: string, password: string} = {email: null, password: null}

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() { }

  registerUser() {
    this.auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/special'])
      },
      err => console.log(err)
    )
  }

}
