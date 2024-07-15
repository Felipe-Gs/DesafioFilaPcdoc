import { Component } from '@angular/core';

interface Client {
  nome: string;
  contato: string;
  tipoAtendimento: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  novoCliente: Client = {
    nome: '',
    contato: '',
    tipoAtendimento: 'Normal',
  };

  filaClientes: Client[] = [];

  adicionarCliente() {
    this.filaClientes.push({ ...this.novoCliente });
    this.ordenarFila();
    this.novoCliente = {
      nome: '',
      contato: '',
      tipoAtendimento: 'Normal',
    };
  }

  ordenarFila() {
    this.filaClientes.sort((a, b) => {
      if (
        a.tipoAtendimento === 'Prioritário' &&
        b.tipoAtendimento === 'Normal'
      ) {
        return -1;
      } else if (
        a.tipoAtendimento === 'Normal' &&
        b.tipoAtendimento === 'Prioritário'
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
