import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  constructor(private afs: AngularFirestore) { }

  // no se realiza en el constructor pues se inyectara el servicio cuando sea necesario
  cargarMensajes() {
    // se obtienen los datos y se subscriben a un observable para tomar desiciones
    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    // devuelvo el observable al cual me subscribire en donde lo llame
    return this.itemsCollection.valueChanges().pipe(
        map((mensajes: Mensaje[]) =>{
          console.log(mensajes);
          this.chats = mensajes;
        })
      );
  }

  agregarMensaje(texto: string){
    // creamos un objeto del tipo de nuestra interface
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()      
    }
   // lo añadimos a nuestra coleccion de firebase la cual regresa un promise
   // si se inserta hace el metodo then, sino el catch
    return this.itemsCollection.add(mensaje);
  }
}
