import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<boolean>();

  messages: any = [];
  username = '';

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    // // Obtém as mensagens com base no papel do usuário.
    // const userId = '123'; // Substitua pelo ID real do usuário após implementar a autenticação.
    // this.chatService.getMessagesByUserRole(userId).subscribe(
    //   (data) => {
    //     this.messages = data;
    //   },
    //   (error) => {
    //     console.error('Erro ao carregar mensagens:', error);
    //   }
    // );


    // this.chatService.getMessagesWithUsernames().subscribe(
    //   (data) => {
    //     this.messages = data;
    //   },
    //   (error) => {
    //     console.error('Erro ao carregar mensagens:', error);
    //   }
    // );
  }

  respondToMessage(message: any): void {
    // Adicione lógica para responder à mensagem aqui.
    console.log(`Respondendo à mensagem de ${message.username}: ${message.text}`);
  }

  interactWithChat(): void {
    this.router.navigateByUrl("chat");
  }

  interactWithAdmin(): void {
    this.router.navigateByUrl("admin");
  }
}
