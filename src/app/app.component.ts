import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilaService } from './services/fila.service';

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
export class AppComponent implements OnInit {
  // guardar os dados que vem
  clientesAtendidos: Client[] = [];
  clientes: any[] = [];
  mensagemTesteConexao: String = '';
  mensagemErro: String = '';

  constructor(private filaService: FilaService) {}

  ngOnInit(): void {
    this.buscarUsuarios();
    this.buscarAtendidos();
    this.ordenarFila();
  }

  adicionarDadosMockados(): void {
    this.filaService.adicionarDadosMockados().subscribe(
      (response) => {
        console.log('Dados mockados adicionados com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao adicionar dados mockados:', error);
      }
    );
  }

  testeConexao(): void {
    this.filaService.testeDeConexao().subscribe(
      (response) => {
        console.log('Teste de conexao funcionando', response);
        this.mensagemTesteConexao = response;
      },
      (error) => {
        console.error('Erro ao conectar com o banco:', error);
      }
    );
  }

  adicionarUsuario(): void {
    if (
      this.novoCliente.nome.length == 0 ||
      this.novoCliente.tipoAtendimento.length == 0
    ) {
      this.mensagemErro = 'Preencha os campos obrigatórios';
      return;
    }
    this.filaService.adicionarUsuario(this.novoCliente).subscribe(
      (response) => {
        this.ordenarFila();
        this.buscarUsuarios();
        console.log('Dados adicionados com sucesso:', response);
        this.novoCliente = {
          nome: '',
          contato: '',
          tipoAtendimento: '',
          atendido: false,
        };
        this.mensagemErro = '';
      },
      (error) => {
        console.error('Erro ao adicionar cliente:', error);
        this.novoCliente = {
          nome: '',
          contato: '',
          tipoAtendimento: '',
          atendido: false,
        };
        this.mensagemErro = 'Erro ao adicioanar cliente';
        this.buscarUsuarios();
      }
    );
  }

  buscarUsuarios(): void {
    this.filaService.buscarUsuarios().subscribe(
      (response) => {
        this.clientes = response;
        console.log('Clientes carregados com sucesso:', response);
        this.ordenarFila();
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.ordenarFila();
      }
    );
  }

  buscarAtendidos() {
    this.filaService.buscarAtendidos().subscribe(
      (response) => {
        this.clientesAtendidos = response;
        console.log('Clientes carregados com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  // carregarClientesAtendidos(): void {
  //   this.http.get<Client[]>('http://localhost:8080/users/test').subscribe(
  //     (response) => {
  //       this.clientesAtendidos = response;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar clientes atendidos:', error);
  //     }
  //   );
  // }

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

    this.clientes.sort((a, b) => {
      const prioridadeA = prioridades[a.tipoAtendimento];
      const prioridadeB = prioridades[b.tipoAtendimento];

      if (prioridadeA === undefined) return 1;
      if (prioridadeB === undefined) return -1;

      return prioridadeB - prioridadeA;
    });
  }

  mudarAtendido(id: number): void {
    this.filaService.mudarAtendido(id).subscribe(
      (response) => {
        console.log(response);
        this.buscarUsuarios();
      },
      (error) => {
        console.error('Erro ao atualizar status de atendimento:', error);
      }
    );
  }

  // Somente o próximo cliente a ser atendido recebe ao lado do seu
  // nome na lista um botão (ATENDIDO), que o remove da
  // listagem(fila).Seria interessante conseguir visualizar as pessoas
  // que já foram atendidas
}
