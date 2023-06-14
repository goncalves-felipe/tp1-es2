import { StatusOrdemServico } from "../../constantes/StatusOrdemServico";
import { Cliente } from "../Cliente/Cliente";

export class OrdemServico {
  private _id: number;
  private _produto: string;
  private _descricao: string;
  private _cliente: Cliente;
  private _valorFinal: number = 0;
  private _valorPago: number = 0;
  private _status: StatusOrdemServico;

  constructor(
    id?: number,
    produto?: string,
    descricao?: string,
    cliente?: Cliente,
  ) {
    this._id = id ?? 0;
    this._produto = produto ?? "";
    this._descricao = descricao ?? "";
    this._cliente = cliente ?? new Cliente();
    this._status = StatusOrdemServico.CRIADO;
  }

  public get id(): number {
    return this._id;
  }

  public get produto(): string {
    return this._produto;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public get cliente(): Cliente {
    return this._cliente;
  }

  public get valorFinal(): number {
    return this._valorFinal;
  }

  public get valorPago(): number {
    return this._valorPago;
  }

  public get status(): StatusOrdemServico {
    return this._status;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set produto(value: string) {
    this._produto = value;
  }

  public set descricao(value: string) {
    this._descricao = value;
  }


  public set cliente(value: Cliente) {
    this._cliente = value;
  }

  public set valorFinal(value: number) {
    this._valorFinal = value;
  }

  public set valorPago(value: number) {
    this._valorPago = value;
  }

  public set status(value: StatusOrdemServico) {
    this._status = value;
  }

  public recusarOrdemServico(): void {
    if(this._status === StatusOrdemServico.FINALIZADO_SUCESSO || this._status === StatusOrdemServico.FINALIZADO_FALHA) {
      throw Error("Erro: Ordem de Serviço já finalizada");
    }
    this.status = StatusOrdemServico.RECUSADO;
  }

  public finalizarComSucesso(): void {
    if(this._status === StatusOrdemServico.FINALIZADO_SUCESSO || this._status === StatusOrdemServico.FINALIZADO_FALHA) {
      throw Error("Erro: Ordem de Serviço já finalizada");
    }
    this._status = StatusOrdemServico.FINALIZADO_SUCESSO;
  }

  public finalizarComFalha(): void {
    if(this._status === StatusOrdemServico.FINALIZADO_SUCESSO || this._status === StatusOrdemServico.FINALIZADO_FALHA) {
      throw Error("Erro: Ordem de Serviço já finalizada");
    }
    this._status = StatusOrdemServico.FINALIZADO_FALHA;
  }

  public pagar(valor: number): void {
    if(valor < 0) {
      throw Error("Erro: valor pago não pode ser negativo");
    }

    if (this._valorPago + valor > this._valorFinal)
      throw Error("Erro: valor pago maior que valor total");

    this._valorPago += valor;
  }
}
