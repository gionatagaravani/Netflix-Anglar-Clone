import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {

  constructor(private readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe((p) => console.log(p))
    // this.profileService.createProfile({name: 'weewe', isChild: true}).subscribe((p) => console.log(p))
  }
}
