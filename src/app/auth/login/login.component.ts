import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public loginForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  dato: any;
  durationInSeconds = 5*1000;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    
  }


  openSnackBar(err:string) {
    this._snackBar.open(err,'',{duration:this.durationInSeconds});
  }
  

  onSubmit() {
    const emailV = this.loginForm.get('email')?.value;
    const passwordV = this.loginForm.get('password')?.value;
    
    this.authService.login(emailV,passwordV).then(response => {
      switch(response){
        case "auth/user-not-found":
            this.openSnackBar("Usuario no encontrado");
          break;
        case "auth/wrong-password":
            this.openSnackBar("Contraseña incorrecta");
          break;
        default:
          console.log(response);
          localStorage.setItem('logged', 'true');
          this.router.navigate(['/list']);
          break;
        }
    });
    
  }
}
