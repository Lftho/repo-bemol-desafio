import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.endPoint; //Chat fake

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMessages(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/messages`);
  }

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`);
  }

  sendMessage(userId: number, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, { userId, text });
  }

  sendMessageAdmin(message: any): Observable<any> {
    // Envia a mensagem para o servidor.
    return this.http.post(`${this.apiUrl}/messages`, message);
  }

  getMessagesWithUsernames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`);
  }


  //Regra para identificação de acesso
  getMessagesByUserRole(userId: string): Observable<any> {
    if (this.authService.userRole === 'admin') {
      // Se o usuário for um administrador, retorna todas as mensagens.
      return this.http.get(`${this.apiUrl}/messages`);
    } else {
      // Se o usuário for um usuário comum, retorna apenas as mensagens do próprio usuário.
      return this.http.get(`${this.apiUrl}/user/${userId}/messages`);
    }
  }

}
