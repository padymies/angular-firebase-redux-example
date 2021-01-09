import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDumbbell, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  faDumbbell = faDumbbell;
  faPowerOff = faPowerOff;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
