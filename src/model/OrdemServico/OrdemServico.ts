import { StatusOrdemServico } from "../../constantes/StatusOrdemServico";
import { Cliente } from "../Cliente/Cliente";
import { Peca } from "../Peca/Peca";
import { ServicoFuncionario } from "../ServicoFuncionario/ServicoAlocado";

export class OrdemServico {
  private _id: number;
  private _produto: string;
  private _descricao: string;
  private _funcionariosAlocados: ServicoFuncionario[];
  private _cliente: Cliente;
  private _horasPrevistas: number;
  private _pecasPrevistas: Peca[];
  private _pecasUtilizadas: Peca[];
  private _valorOrcamento: number;
  private _valorFinal: number;
  private _valorPago: number;
  private _status: StatusOrdemServico;
  private _entregue: boolean;

  constructor(
    id?: number,
    produto?: string,
    descricao?: string,
    funcionariosAlocados?: ServicoFuncionario[],
    cliente?: Cliente,
    horasPrevistas?: number,
    pecasPrevistas?: Peca[],
    pecasUtilizadas?: Peca[],
    valorOrcamento?: number,
    valorFinal?: number,
    valorPago?: number,
    status?: StatusOrdemServico,
    entregue?: boolean
  ) {
    this._id = id ?? 0;
    this._produto = produto ?? "";
    this._descricao = descricao ?? "";
    this._funcionariosAlocados = funcionariosAlocados ?? [];
    this._cliente = cliente ?? new Cliente();
    this._horasPrevistas = horasPrevistas ?? 0;
    this._pecasPrevistas = pecasPrevistas ?? [];
    this._pecasUtilizadas = pecasUtilizadas ?? [];
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

  public get funcionariosAlocados(): ServicoFuncionario[] {
    return this._funcionariosAlocados;
  }

  public get cliente(): Cliente {
    return this._cliente;
  }

  public get horasPrevistas(): number {
    return this._horasPrevistas;
  }

  public get pecasPrevistas(): Peca[] {
    return this._pecasPrevistas;
  }

  public get pecasUtilizadas(): Peca[] {
    return this._pecasUtilizadas;
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

  public set funcionariosAlocados(value: ServicoFuncionario[]) {
    this._funcionariosAlocados = value;
  }

  public set cliente(value: Cliente) {
    this._cliente = value;
  }

  public set horasPrevistas(value: number) {
    this._horasPrevistas = value;
  }

  public set pecasPrevistas(value: Peca[]) {
    this._pecasPrevistas = value;
  }

  public set pecasUtilizadas(value: Peca[]) {
    this._pecasUtilizadas = value;
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
    this._status = StatusOrdemServico.CRIADO;
  }

  public recusarOrdemServico(): void {
    this.status = StatusOrdemServico.RECUSADO;
  }

  public aprovarOrdemServico(): void {
    this._valorFinal = this._valorOrcamento;
    this.status = StatusOrdemServico.APROVADO;
  }

  public criarOrcamento(
    horasPrevistas: number,
    valorOrcamento: number
  ): void {
    this._horasPrevistas = horasPrevistas;
    this._valorOrcamento = valorOrcamento;
    this.status = StatusOrdemServico.EM_ANALISE;
  }

  public usarPeca(peca: Peca): void {
    const index = this._pecasUtilizadas.findIndex((p) => p.id === peca.id);

    if (index === -1) {
      peca.quantidadeUtilizada = 1;
      this._pecasUtilizadas.push(peca);
    } else {
      const pecaUtilizada = this._pecasUtilizadas[index];
      pecaUtilizada.quantidadeUtilizada += 1;
      this.pecasUtilizadas[index] = pecaUtilizada;
    }
  }

  public alocarFuncionario(
    funcionario: ServicoFuncionario,
    horas: number
  ): void {
    const index = this._funcionariosAlocados.findIndex(
      (f) => f.funcionario.id === funcionario.funcionario.id
    );

    if (index === -1) {
      funcionario.alocarHoras(horas);
      this._funcionariosAlocados.push(funcionario);
    } else {
      const funcionarioAlocado = this._funcionariosAlocados[index];
      funcionarioAlocado.alocarHoras(horas);
      this._funcionariosAlocados[index] = funcionarioAlocado;
    }
  }

  public calcularValorGasto(): number {
    const valorPecas = this._pecasUtilizadas.reduce(
      (sum, peca) => peca.quantidadeUtilizada * peca.preco + sum,
      0
    );

    const valorMaoDeObra = this._funcionariosAlocados.reduce(
      (sum, funcionario) =>
        funcionario.horasAlocadas * funcionario.funcionario.custoHora + sum,
      0
    );

    return valorMaoDeObra + valorPecas;
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
