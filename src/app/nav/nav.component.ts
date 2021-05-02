import { Component, OnInit } from '@angular/core';
import { AcccountServiceService } from '../_services/acccount-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AcccountServiceService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    this.accountService.logout();
  }

}
