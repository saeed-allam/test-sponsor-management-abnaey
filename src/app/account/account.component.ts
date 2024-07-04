import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FixedService } from '../core/service/fixed.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
    `
      .pointer {
        cursor: pointer;
      }
      .login-card{
        box-shadow: 2px 3px 10px #eee;
        border-radius: 5%;
      }
    `,
  ],
})
export class AccountComponent {
  loginForm: FormGroup;
  submitted = false;
  error: any;
  showErr: boolean = false;
  sendReq:boolean=true;
  constructor(
    public fixed: FixedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.accountService.obtainAccessToken(this.loginForm.value).subscribe({
      next: (response) => {
        this.accountService.saveToken(response);
        this.sendReq = true;
        this.router.navigate(['/']);
      },
      error: (err) => {debugger;
        this.error = err;
        this.showErr = true;
        this.sendReq = true;
        setTimeout(() => {
          this.showErr = false;
        }, 5000);
      },
    });
  }
  loginAnyWay() {
    this.accountService.loginAnyWay();
  }
}
