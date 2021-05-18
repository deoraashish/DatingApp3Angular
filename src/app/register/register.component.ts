import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcccountServiceService } from '../_services/acccount-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private acccountService: AcccountServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.acccountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, err => {
      this.toastr.error(err.error);
      console.log(err)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
