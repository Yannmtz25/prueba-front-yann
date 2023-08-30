import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  
  constructor(
    private authService: AuthService,
    private router: Router
    ){
  }


  logoutButton(){
    this.authService.logout()
    .then(()=>{
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }
  
  public readLocalStorageValue(key:string) {
    return localStorage.getItem(key);

  }

  getUrl(){
    return this.router.url;
  }
}
