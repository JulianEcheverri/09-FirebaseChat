import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // componente de autenticacion google o twiter. Mediante firebase
  // se hace mediante firebase en la pestaña Authentication --> metodos de acceso y seleccionamos google y guardamos
  constructor(public chatService: ChatService ) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    this.chatService.login(proveedor);
  }

}
