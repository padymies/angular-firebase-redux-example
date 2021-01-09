import { Component, OnInit } from '@angular/core';
import { faLinkedinIn, faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  faLinkedinIn = faLinkedinIn;
  faFacebook = faFacebook;
  faInstagram = faInstagramSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
