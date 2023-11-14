import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  messages: any[] = [];
  responseText: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadAllMessages();

    this.chatService.getMessagesWithUsernames().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Erro ao carregar mensagens:', error);
      }
    );
  }

  loadAllMessages(): void {
    this.chatService.getAllMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Erro ao carregar todas as mensagens:', error);
      }
    );
  }

  respondToMessage(message: any): void {
    // Exemplo: Enviar uma resposta para a mensagem selecionada.
    const adminUsername = 'admin'; // Substitua pelo nome real do administrador.

    // Construir a mensagem de resposta.
    const responseMessage = {
      username: adminUsername,
      text: this.responseText, // Utiliza o texto inserido pelo administrador.
      timestamp: Date.now(),
    };

    // Adiciona a mensagem de resposta à lista local para atualização imediata da interface.
    this.messages.push(responseMessage);

    // Envia a mensagem de resposta para o servidor.
    this.chatService.sendMessageAdmin(responseMessage).subscribe(
      (response) => {
        console.log('Mensagem de resposta enviada com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao enviar mensagem de resposta:', error);
      }
    );

    // Limpa o campo de resposta após enviar.
    this.responseText = '';
  }
}
