import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// interface que almacena los datos que me devuelve firebase
import { map } from 'rxjs/operators';
import { Mensaje } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // para leer cualquier collection de angular, es un observable
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  // creamos una variable array que recibe los chats
  public chats: Mensaje[] = [];
  // creamos un usuario para obtener los datos de autenticacion
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afuth: AngularFireAuth) { 
    // nos subscribimos al estado de la autenticacion
    this.afuth.authState.subscribe(user => {
      console.log('Estado del usuario', user);
      if (!user) return;
      this.usuario.uid = user.uid;
      this.usuario.nombre = user.displayName;
    });


  }

  login(proveedor: string) {
    this.afuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afuth.signOut();
    this.usuario = {};
  }

  // no se realiza en el constructor pues se inyectara el servicio cuando sea necesario
  cargarMensajes() {
    // se obtienen los datos y se subscriben a un observable para tomar desiciones
    // importante: la insercion a firebase chat se mostrara en desorden. para ordenarla se debe realizar una query a firbase
    // se manda una query, collection recibe otro parametro que es la referencia, query function
    // forma de aplicar query a la collecion de firebase ---> ref => ref.orderBy('fecha', 'asc')
    // con limit le digo que solo me devuelta 5
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc'));//.limit(5));

    // devuelvo el observable al cual me subscribire en donde lo llame
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        // this.chats = mensajes;
        this.chats = [];
        // se realizo nuevamente el array para mostrarlo en orden
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      })
    );
  }

  agregarMensaje(texto: string) {
    // creamos un objeto del tipo de nuestra interface
    let mensaje: Mensaje = {
      userid: this.usuario.uid,
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
    }
    // lo añadimos a nuestra coleccion de firebase la cual regresa un promise
    // si se inserta hace el metodo then, sino el catch
    return this.itemsCollection.add(mensaje);
  }
}
