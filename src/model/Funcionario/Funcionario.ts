import { Pessoa } from "../Pessoa/Pessoa";

export class Funcionario extends Pessoa {
  private _custoHora: number;
  private _dataContratacao: Date;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    nroTelefone?: string,
    custoHora?: number,
    dataContratacao?: Date | string
  ) {
    super(id, nome, email, nroTelefone);
    this._custoHora = custoHora ? custoHora : 0;
    this._dataContratacao = dataContratacao
      ? new Date(dataContratacao)
      : new Date();
  }

  get custoHora(): number {
    return this._custoHora;
  }

  set custoHora(_custoHora: number) {
    this._custoHora = _custoHora;
  }

  get dataContratacao(): Date {
    return this._dataContratacao;
  }

  set dataContratacao(_dataContratacao: Date | string) {
    this._dataContratacao = new Date(_dataContratacao);
  }
}
