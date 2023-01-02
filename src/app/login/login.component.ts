import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.username, this.password);
    this._authService.authenticate(this.username, this.password).subscribe({
      next: (data) => {
        this._authService.setLocalStorage(data);
        this._router.navigate([this._authService.redirectUrl]);
      },
      error: (err) => {
        localStorage.removeItem('token');
      },
      complete: () => {},
    });
  }
}
