import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  footer = ['FAQ', 'Help Center', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Ad Choices']
  user = { email: '', password: '' };

  constructor(private titleService: Title) {
    this.titleService.setTitle('Netflix');
  }

  onSubmit(user: any) {
    console.log(user);
  }
}
