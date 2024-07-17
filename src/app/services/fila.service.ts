import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilaService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  adicionarDadosMockados(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add`, {});
  }

  testeDeConexao(): Observable<string> {
    return this.http.get(`${this.baseUrl}/test`, { responseType: 'text' });
  }

  adicionarUsuario(user: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addDados`, user);
  }

  buscarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/naoAtendidos`);
  }

  buscarAtendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/atendidos`);
  }

  mudarAtendido(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/MudarAtendido/${id}`, {});
  }
}
