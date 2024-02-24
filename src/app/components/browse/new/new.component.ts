import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  loading = false;
  valid = true;
  profile: Profile = { name: '', isChild: false };

  constructor(
    private readonly profileService: ProfileService,
    private readonly route: Router
  ) {}

  onSubmit(profile: NgForm) {
    if (profile.valid) {
      this.valid = true;
      this.loading = true;
      this.profileService.createProfile(profile.value).subscribe(
        () => {
          this.route.navigate(['/browse']);
        },
        (err) => window.alert(err)
      );
    } else {
      this.valid = false;
    }
  }
}
