import { StatusOrdemServico } from "../../constantes/StatusOrdemServico";
import { Cliente } from "../Cliente/Cliente";
import { ServicoFuncionario } from "../ServicoFuncionario/ServicoAlocado";

export class OrdemServico {
  private _id: number;
  private _produto: string;
  private _descricao: string;
  private _cliente: Cliente;
  private _horasPrevistas: number;
  private _valorOrcamento: number;
  private _valorFinal: number;
  private _valorPago: number;
  private _status: StatusOrdemServico;
  private _entregue: boolean;

  constructor(
    id?: number,
    produto?: string,
    descricao?: string,
    cliente?: Cliente,
    horasPrevistas?: number,
    valorOrcamento?: number,
    valorFinal?: number,
    valorPago?: number,
    status?: StatusOrdemServico,
    entregue?: boolean
  ) {
    this._id = id ?? 0;
    this._produto = produto ?? "";
    this._descricao = descricao ?? "";
    this._cliente = cliente ?? new Cliente();
    this._horasPrevistas = horasPrevistas ?? 0;
    this._valorOrcamento = valorOrcamento ?? 0;
    this._valorFinal = valorFinal ?? 0;
    this._valorPago = valorPago ?? 0;
    this._status = status ?? StatusOrdemServico.CRIADO;
    this._entregue = !!entregue;
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

  public get horasPrevistas(): number {
    return this._horasPrevistas;
  }

  public get valorOrcamento(): number {
    return this._valorOrcamento;
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

  public get entregue(): boolean {
    return this._entregue;
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

  public set horasPrevistas(value: number) {
    this._horasPrevistas = value;
  }

  public set valorOrcamento(value: number) {
    this._valorOrcamento = value;
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

  public set entregue(value: boolean) {
    this._entregue = value;
  }

  public criarOrdemServico(
    produto: string,
    descricao: string,
    cliente: Cliente
  ): void {
    this._produto = produto;
    this._descricao = descricao;
    this._cliente = cliente;
    this._status = StatusOrdemServico.EM_ANALISE;
  }

  public recusarOrdemServico(): void {
    this.status = StatusOrdemServico.RECUSADO;
  }

  public aprovarOrdemServico(): void {
    this.status = StatusOrdemServico.APROVADO;
  }

  public criarOrcamento(
    horasPrevistas: number,
    valorOrcamento: number
  ): void {
    this._horasPrevistas = horasPrevistas;
    this._valorFinal = valorOrcamento;
    this.status = StatusOrdemServico.EM_ANALISE;
  }

  public finalizarComSucesso(): void {
    this._status = StatusOrdemServico.FINALIZADO_SUCESSO;
  }

  public finalizarComFalha(): void {
    this._status = StatusOrdemServico.FINALIZADO_FALHA;
  }

  public entregarProduto(): void {
    this._entregue = true;
  }

  public pagar(valor: number): void {
    if (this._valorPago + valor > this._valorFinal)
      throw Error("Erro: valor pago maior que valor total");

    this._valorPago += valor;
  }
}
