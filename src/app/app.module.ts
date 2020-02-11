import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from "../environments/environment";
import { ChatComponent } from "./components/chat/chat.component";
import { FormsModule } from "@angular/forms";
import { ChatService } from "./providers/chat.service";

@NgModule({
  declarations: [AppComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // se importa el modulo de firebase para toda la app
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
    // AngularFireAnalyticsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
