import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, ref, update, set } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  hide = true;
  isValid = true;
  disabled = true;

  constructor(
    private formBuilder: FormBuilder,
    public auth: Auth,
    public database: Database,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    })
  }

  onSubmit() {
    signInWithEmailAndPassword(
      this.auth,
      this.formulario.value.email,
      this.formulario.value.password
    )
      .then((userCredential: any) => {
        const user = userCredential.user;
        const date = new Date();

        update(ref(this.database, 'users/' + user.uid), {
          last_login: date,
        });

        console.log('navivate', user);
        sessionStorage.setItem('user', JSON.stringify(user));

        this.router.navigateByUrl('dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const messageCode = error.message;
        alert(messageCode);
      })


  }
}
