import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, set, ref } from '@angular/fire/database';

import { Observable, distinctUntilChanged, empty, switchMap, tap, timer } from 'rxjs';
import { ConsultaCepService } from 'src/app/shared/services/consult-cep/consulta-cep.service';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  isValid = true;
  disabled = true;
  formulario!: FormGroup;
  db!: Database;
  item$!: Observable<any[]>;

  endPoint = environment.endPoint;

  constructor(
    private formBuilder: FormBuilder,
    public auth: Auth,
    public database: Database,
    private cepService: ConsultaCepService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
    });

    this.formulario.get('endereco.cep')
      ?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap((data: any) => {
          data === 'VALID';
          this.isValid = false;
        }),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(t => t ? this.populaDadosForm(t) : {});



  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  onSubmit() {

    createUserWithEmailAndPassword(
      this.auth,
      this.formulario.value.email,
      this.formulario.value.password
    )
      .then((userCredential) => {
        const user = userCredential.user;

        const date = new Date();
        const dateResult = date.toLocaleString('en-GB', {
          hour12: false,
        });

        set(ref(this.database, 'users/' + user.uid), {
          email: this.formulario.value.email,
          username: this.formulario.value.username,
          last_login: date,
        });

        const UserProfile = {
          id: user.uid,
          email: user.email,
          dataHora: dateResult,
          username: this.formulario.value.username,
          cep: this.formulario.value.endereco.cep,
          rua: this.formulario.value.endereco.rua,
          cidade: this.formulario.value.endereco.cidade,
          estado: this.formulario.value.endereco.estado
        }

        if (this.formulario.status === 'VALID') {
          alert('Obrigado por preencher todos os campos acima!');
          let teste = this.httpClient.post(`${this.endPoint}/profile`, { UserProfile });

          // timer(200).subscribe(() => {
          //   this.router.navigateByUrl('/login');
          // });

          console.log(teste)

        } else if (this.formulario.status === 'INVALID') {
          alert('Por favor! Preencher todos os campos acima!!!');
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const messageCode = error.message;
        alert(messageCode);
      })


  }

  signOut() {
    signOut(this.auth).then(() => {
      console.log('sair', this.auth);
    })
  }

}
