import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { 
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.httpClient.post('http://localhost:8080/api/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/']))
  }

}
