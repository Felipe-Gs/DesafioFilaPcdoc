import { Component } from '@angular/core';

interface Client {
  nome: string;
  contato: string;
  tipoAtendimento: string;
  atendido: boolean;
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
    tipoAtendimento: '',
    atendido: false,
  };

  filaClientes: Client[] = [
    {
      nome: 'Marcos goes',
      contato: 'marcos@gmail.com',
      tipoAtendimento: 'PCD',
      atendido: false,
    },
    {
      nome: 'Felipe Silva',
      contato: 'contatofleipe@gmail.com',
      tipoAtendimento: 'gerais',
      atendido: false,
    },
    {
      nome: 'Silva Pedro',
      contato: 'Silva@gmail.com',
      tipoAtendimento: 'Gestantes',
      atendido: false,
    },
    {
      nome: 'Lucas sabino',
      contato: 'sabino@gmail.com',
      tipoAtendimento: 'Idosos',
      atendido: false,
    },
    {
      nome: 'Ana Souza',
      contato: 'ana@gmail.com',
      tipoAtendimento: 'PCD',
      atendido: false,
    },
    {
      nome: 'Carlos Lima',
      contato: 'carlos@gmail.com',
      tipoAtendimento: 'Encaminhados pelo médico',
      atendido: false,
    },
  ];

  adicionarCliente() {
    this.filaClientes.push({ ...this.novoCliente });
    this.ordenarFila();
    this.novoCliente = {
      nome: '',
      contato: '',
      tipoAtendimento: '',
      atendido: false,
    };
  }

  // Exemplo: Se alguém do tipo Encaminhados pelo médico(nível
  // dois) for inserido na fila ele será prioridade e estará acima na
  // listagem sobre todos do tipo Casos gerais (nível 3).
  ordenarFila() {
    const prioridades: { [key: string]: number } = {
      Gestantes: 3,
      Idosos: 3,
      PCD: 3,
      Encaminhados: 2,
      gerais: 1,
    };

    this.filaClientes.sort((a, b) => {
      const prioridadeA = prioridades[a.tipoAtendimento];
      const prioridadeB = prioridades[b.tipoAtendimento];

      if (prioridadeA === undefined) return 1;
      if (prioridadeB === undefined) return -1;

      return prioridadeB - prioridadeA;
    });
  }

  // Somente o próximo cliente a ser atendido recebe ao lado do seu
  // nome na lista um botão (ATENDIDO), que o remove da
  // listagem(fila).Seria interessante conseguir visualizar as pessoas
  // que já foram atendidas

  visualizarAtendidos() {}
}
