import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  footer = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Ad Choices',
  ];
  user = { email: '', password: '' };
  loading = false;
  constructor(private titleService: Title, private auth: AuthService, private readonly route: Router) {
    this.titleService.setTitle('Netflix');
  }

  ngOnInit(): void {
    if(this.auth.isLoggedIn) {
      this.route.navigate(['/browse']);
    }
  }

  onSubmit(user: any) {
    this.loading = true;
    this.auth.Login(user).then(() => this.loading = false);
  }
}
