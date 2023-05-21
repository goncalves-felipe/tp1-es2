import { Pessoa } from "../Pessoa/Pessoa";
import readline from 'readline';

export class Cliente extends Pessoa {
  private _endereco: string;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    nroTelefone?: string,
    endereco?: string
  ) {
    super(id, nome, email, nroTelefone);
    this._endereco = endereco ? endereco : '';
  }

  get endereco(): string {
    return this._endereco;
  }

  set endereco(_endereco: string) {
    this._endereco = _endereco;
  }

  public interacaoCliente() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    reader.question('Ola cliente! O que deseja? \n[1] Solicitar Serviço \n[2] Consultar serviço\n', (opcao) => {
        if (opcao.toUpperCase() === '1') {
            console.log('Opção escolhida: Solicitar Serviço');
        } else if (opcao.toUpperCase() === '2') {
            console.log('Opção escolhida: Consultar serviço');
        } else {
            console.log('Opção inválida');
        }

        reader.close();
    });
  }
}
