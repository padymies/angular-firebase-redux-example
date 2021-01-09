import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/store/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  faSpinner = faSpinner;
  faCheck = faCheckCircle;
  loginForm: FormGroup;

  isLoading: boolean;

  loginSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);

  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  login() {

    if (this.loginForm.invalid) { return; }

    const { email, password } = this.loginForm.value;

    this.store.dispatch(isLoading());

    this.authService.loginUser(email, password).then(result => {
      this.router.navigate(['/']);
      this.store.dispatch(stopLoading());
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
    });
    this.store.dispatch(stopLoading());
  });
}
}
