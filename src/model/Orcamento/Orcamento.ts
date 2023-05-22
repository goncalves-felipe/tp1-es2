import { StatusOrcamentos } from "../../constantes/StatusOrcamentos";
import { StatusOrdemServico } from "../../constantes/StatusOrdemServico";
import { OrdemServico } from "../OrdemServico/OrdemServico";

export class Orcamento {
  private _id: number;
  private _valorOrcamento: number;
  private _horasPrevistas: number;
  private _status: StatusOrcamentos;
  private _ordemServico: OrdemServico;

  constructor(
    id?: number,
    valorOrcamento?: number,
    horasPrevistas?: number,
    ordemServico?: OrdemServico,
  ) {
    this._id = id ?? 0;
    this._valorOrcamento = valorOrcamento ?? 0;
    this._horasPrevistas = horasPrevistas ?? 0;
    this._status = StatusOrcamentos.AGUARDANDO_CLIENTE;
    this._ordemServico = ordemServico ?? new OrdemServico();
  }

  public get id(): number {
    return this._id;
  }

  public get valorOrcamento(): number {
    return this._valorOrcamento;
  }

  public get horasPrevistas(): number {
    return this._horasPrevistas;
  }

  public get status(): StatusOrcamentos {
    return this._status;
  }

  public get ordemServico(): OrdemServico {
    return this._ordemServico;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set valorOrcamento(value: number) {
    this._valorOrcamento = value;
  }

  public set horasPrevistas(value: number) {
    this._horasPrevistas = value;
  }

  public set status(value: StatusOrcamentos) {
    this._status = value;
  }

  public set ordemServico(value: OrdemServico) {
    this._ordemServico = value;
  }

  public aprovarOrdemServico(): void {
    this._ordemServico.valorFinal = this._valorOrcamento;
    this._ordemServico.status = StatusOrdemServico.APROVADO;
    this.status = StatusOrcamentos.APROVADO;
  }

}