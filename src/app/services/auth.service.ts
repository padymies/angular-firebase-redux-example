import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { setUser, unSetUser } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  private _user: User;

  public get user() { return this._user; }

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore,
    private store: Store<AppState>) { }


  initAuthListener() {
    this.auth.authState.subscribe(fuser => {

      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges().subscribe((firestoreUser: any) => {
          console.log('suscription');
          
          const user = User.firestoreUser(firestoreUser);
          this._user = user;
          this.store.dispatch(setUser({ user }));
        });
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
      }
    });
  }

  registrarUsuario(name: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new User(name, user.email, user.uid);
      return this.firestore.doc(`${user.uid}/user`).set({ ...newUser });
    });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(fUser => fUser != null));
  }
}
