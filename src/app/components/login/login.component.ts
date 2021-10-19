import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  data!: any
  
  constructor(
    private formBuilder: FormBuilder, 
    private httpClient: HttpClient, 
    private router: Router,
    private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }

  showError(msg: String): void {
    const divError: any = document.querySelector('.error')
    divError.innerHTML = msg
    divError.style.opacity = 1;
    setTimeout(() => divError.style.opacity = 0, 2000)
  }

  showSuccess(msg: String): void {
    const divSuccess: any = document.querySelector('.success')
    divSuccess.innerHTML = msg
    divSuccess.style.opacity = 1;
    setTimeout(() => divSuccess.style.opacity = 0, 2000)
  }

  submit() {
    let email = this.form.value.email
    let password = this.form.value.password
    
    if(this.form.valid) {
      let response = this.loginService.login(email, password).subscribe(
        () => {
          this.showSuccess('Successfully loged in')
        },
        (error: any) => {
          console.log(error.status)
          if(error.status == 403) {
            this.showError('Bad credentials')
          }
        }
      )
    } else {
      this.showError('Invalid credentials')
    }
    
  }

  getUsers() {
    const token = localStorage.getItem('token')
    const divUsuarios = document.querySelector('.usuarios')

    this.loginService.getUsers(token)?.subscribe(res => {
      this.data = res
      if(divUsuarios) this.data.forEach((element: any) => {
        let htmlEl = document.createElement('p')
        htmlEl.innerHTML = element.name.toString()
        divUsuarios.appendChild(htmlEl)
      });
    },
    (error: any) => {
      this.showError(error)
    })
  }

  logout() {
    this.loginService.logout()
  }

}
