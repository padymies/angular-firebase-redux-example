import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/store/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  uiSubscription: Subscription;

  isLoading: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }
    );

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  register() {

    if (this.registerForm.invalid) { return; }

    this.store.dispatch(isLoading());

    const { name, email, password } = this.registerForm.value;
    this.authService.registrarUsuario(name, email, password)
      .then(credencials => {
        console.log(credencials);
        this.router.navigate(["/"]);
        this.store.dispatch(stopLoading());

      }
      ).catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });

  }

}
