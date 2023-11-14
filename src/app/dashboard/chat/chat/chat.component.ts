import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isValid: boolean = true;
  userId = 2; // ID do usuário (por exemplo, Alice)
  messages: any[] = [];
  newMessage = "";
  constructor(private chatService: ChatService) { }


  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages(this.userId).subscribe(
      (data) => {
        this.messages = data;
        console.log(this.messages)
      },
      (error) => {
        console.error('Erro ao carregar mensagens:', error);
      }
    );
  }

  sendMessage(text: string): void {
    this.chatService.sendMessage(this.userId, text).subscribe(
      () => {
        this.loadMessages();
      },
      (error) => {
        console.error('Erro ao enviar mensagem:', error);
      }
    );
  }
}
