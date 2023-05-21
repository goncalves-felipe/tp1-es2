import { Pessoa } from "../Pessoa/Pessoa";

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
}
