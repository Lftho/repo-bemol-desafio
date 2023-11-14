import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set, ref, update, getDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userData: any;

  constructor() {
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.isAuthenticated = true;
    }
  }

  get Authenticated(): boolean {
    return this.isAuthenticated;
  }

  get user(): any {
    return this.userData;
  }

  get userRole(): string {
    return this.isAuthenticated ? this.userData.role : '';
  }
}
