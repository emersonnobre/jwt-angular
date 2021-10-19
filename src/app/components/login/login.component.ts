import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: '',
    password: ''
  })
  
  constructor(
    private formBuilder: FormBuilder, 
    private httpClient: HttpClient, 
    private router: Router,
    private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }

  submit() {
    let email = this.form.value.email
    let password = this.form.value.password
    return this.httpClient.post<any>(`http://localhost:8080/login`, { email, password }).subscribe(res => {
      console.log(res)
    },
    error => {
      console.log(error)
    })
  }

}
