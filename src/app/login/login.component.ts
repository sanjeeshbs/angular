import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../models/login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [],
      password: [],
      rememberLogin: []
    });
  }

  signIn(credentials: Login){
    this.authService.login(credentials)
    .subscribe(token => {
      if (token){
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        this.router.navigate([returnUrl || '/employees' ]);
        // if (returnUrl)
        //   this.router.navigate([returnUrl]);
        // else
        //   this.router.navigate(['/employees']);
      }
      else {
        this.invalidLogin = true;
      }
    },
    error => {console.log(error); });
  }

}
