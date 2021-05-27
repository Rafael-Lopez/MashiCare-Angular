import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  check = faCheck;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectHome = () => {
    this.router.navigate(['/shop']);
  }

}
