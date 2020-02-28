import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import "firebase/firestore";
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "FireChat";
  public chats: Observable<any[]>;

  // importar el servicio del chat para determinar cuando el usuario esta loggeado

  constructor(firestore: AngularFirestore, public chatService: ChatService) {


  }
}
