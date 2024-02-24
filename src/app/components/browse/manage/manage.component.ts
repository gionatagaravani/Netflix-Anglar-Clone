import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { DB } from '../../../shared/config';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(
    private readonly profileService: ProfileService,
    private readonly route: Router
  ) {}

    ngOnInit(): void {
      this.loadProfiles();
    }

    private loadProfiles(): void {
      this.profileService.profiles$.subscribe((profiles) => {
        if (profiles) {
          profiles.forEach((profile) => {
            this.profiles.push({
              id: profile.id,
              isChild: profile.data.isChild,
              name: profile.data.name,
              image: profile.data.image ?? DB.imgDefault,
              language: profile.data.language,
            });
          });
        }
      })
    }
}
