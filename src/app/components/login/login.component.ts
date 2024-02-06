import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  footer = ['FAQ', 'Help Center', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Ad Choices']
  user = { email: '', password: '' };

  constructor(private titleService: Title, private auth: AuthService) {
    this.titleService.setTitle('Netflix');
    
  }

  onSubmit(user: any) {
    this.auth.Login(user);
  }
}
