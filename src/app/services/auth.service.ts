import { Injectable, NgZone } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData: any;
  constructor(private auth: Auth, private router: Router, public ngZone: NgZone) { }

  getAuthFire() {
    return this.auth.currentUser;
  }


  //get Authenticated user from Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user;
  }


  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }


  //Register Method
  Register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          /* Call the SendVerificaitonMail() function when new user sign
       up and returns promise */
          this.sendEmailVerification()
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  //Login Method
  Login(user: any) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result: any) => {
        console.log(result)
        this.UserData = result.user;
        // this.ngZone.run(() => {
        //   this.router.navigate(['/dashboard']);
        // });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser as User);
  }


  //Logout
  // Logout() {
  //   signOut(this.auth).then(()=>this.router.navigate(['/sign-in']))
  // }

}
