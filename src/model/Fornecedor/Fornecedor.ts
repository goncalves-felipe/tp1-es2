import { Pessoa } from "../Pessoa/Pessoa";

export class Fornecedor extends Pessoa {
  private _cnpj: string;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    nroTelefone?: string,
    cnpj?: string
  ) {
    super(id, nome, email, nroTelefone);
    this._cnpj = cnpj ? cnpj : "";
  }

  public get cnpj(): string {
    return this._cnpj;
  }

  public set cnpj(cnpj: string) {
    this._cnpj = cnpj;
  }
}
