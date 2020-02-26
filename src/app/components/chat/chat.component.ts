import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';
  // se crea una variable elemento para realizar el focus cuando se agrega un mensaje
  elemento: any;
  // inyectamos el proveedor - servicio
  constructor(public chatService: ChatService) {
    // nos susbscribimos al observable que nos devuelve la funcion de cargar mensajes
    // chatService.cargarMensajes().subscribe((mensajes: any[]) => {
    //   console.log(mensajes);
    // });

    // apenas sean cargados los mensajes, se realiza la accion del focus
    chatService.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById("app-mensajes");
  }

  enviar_mensaje() {
    if (this.mensaje.length === 0) return;
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = "")
      .catch((err) => console.error('Error al enviar', err)); // recibo el error de firebase
    // console.log(this.mensaje);
  }
}
