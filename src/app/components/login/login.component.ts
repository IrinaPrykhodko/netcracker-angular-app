import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public user: Login = new Login();
	public loginForm: FormGroup;

	public title: string = 'Login';

  constructor(private formBilder: FormBuilder) { }

  ngOnInit() {
  	this.loginForm = this.formBilder.group({
  		'login': [this.user.login, [Validators.required]],
  		'password': [this.user.password, [Validators.required]]

  	});
  }

}
