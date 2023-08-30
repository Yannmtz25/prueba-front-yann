import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, addDoc, doc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { setDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  constructor(
    private router: Router,
  ) { }


  public createUser(name:string, date:Date, tel:string,email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.createUserFirestore(user.uid,name,date,tel);
        return signOut(this.auth);
      })
      .catch((error) => {
        return error.code;
      });
  }
  
  public async createUserFirestore(uid:string, nameUser:string, dateUser:Date, telUser:string){
   
    const docRef = await setDoc(doc(this.firestore, "users", uid), {
      name: nameUser,
      birthdate: dateUser,
      tel: telUser,
    });

  }

  public login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password).catch((error)=>{
      console.log(error.code);
      return error.code;
    });
  }

  public logout(){
    return signOut(this.auth);
  }

}

