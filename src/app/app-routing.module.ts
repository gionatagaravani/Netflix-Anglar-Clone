import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { BrowseComponent } from './components/browse/browse.component';
import { authGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'browse'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
