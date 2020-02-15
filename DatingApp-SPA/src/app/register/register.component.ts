import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private aurhtService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  
  register() {
    this.aurhtService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertify.warning('cancelled');
  }
}
