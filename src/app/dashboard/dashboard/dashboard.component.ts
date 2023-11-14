import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  messages: any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Obtém as mensagens com base no papel do usuário.
    const userId = '123'; // Substitua pelo ID real do usuário após implementar a autenticação.
    this.chatService.getMessagesByUserRole(userId).subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Erro ao carregar mensagens:', error);
      }
    );


    this.chatService.getMessagesWithUsernames().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Erro ao carregar mensagens:', error);
      }
    );
  }

  respondToMessage(message: any): void {
    // Adicione lógica para responder à mensagem aqui.
    console.log(`Respondendo à mensagem de ${message.username}: ${message.text}`);
  }

  interactWithUser(username: string): void {
    // Adicione lógica para interagir com um usuário específico aqui.
    console.log(`Interagindo com o usuário: ${username}`);
  }
}
