import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  mensaje = '';
  // inyectamos el proveedor - servicio
  constructor(public chatService: ChatService) {
    // nos susbscribimos al observable que nos devuelve la funcion de cargar mensajes
    // chatService.cargarMensajes().subscribe((mensajes: any[]) => {
    //   console.log(mensajes);
    // });
    chatService.cargarMensajes().subscribe();
  }


  enviar_mensaje() {
    if (this.mensaje.length === 0) return;
    this.chatService.agregarMensaje(this.mensaje)
    .then(() => this.mensaje = "")
    .catch((err) => console.error('Error al enviar', err)); // recibo el error de firebase
    // console.log(this.mensaje);
  }
}
