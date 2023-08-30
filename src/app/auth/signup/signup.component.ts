import { Component, inject } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public loginForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  telPattern = "^[0-9]{10,15}$";
  private auth: Auth = inject(Auth);
  durationInSeconds = 5*1000;

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ){
    this.loginForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern(this.telPattern)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }
  openSnackBar(err:string) {
    this._snackBar.open(err,'',{duration:this.durationInSeconds});
  }
  onSubmit(){

    const nameV = this.loginForm.get('name')?.value;
    const dateV = this.loginForm.get('date')?.value;
    const telV = this.loginForm.get('tel')?.value;
    const emailV = this.loginForm.get('email')?.value;
    const passwordV = this.loginForm.get('password')?.value;
    
    
    this.authService.createUser(nameV, dateV, telV, emailV,passwordV).then(response => {
      switch(response){
        case "auth/email-already-in-use":
            this.openSnackBar("El correo ya está registrado.");
          break;
        default:
          this.router.navigate(['/']);
          break;
        }
    });
  }
}
