import { Funcionario } from "../Funcionario/Funcionario";

export class ServicoFuncionario {
  private _funcionario: Funcionario;
  private _horasAlocadas: number;

  constructor(funcionario?: Funcionario, horasAlocadas?: number) {
    this._funcionario = funcionario ?? new Funcionario();
    this._horasAlocadas = horasAlocadas ?? 0;
  }

  public get funcionario(): Funcionario {
    return this._funcionario;
  }

  public get horasAlocadas(): number {
    return this._horasAlocadas;
  }

  public set funcionario(funcionario: Funcionario) {
    this._funcionario = funcionario;
  }

  public set horasAlocadas(horasAlocadas: number) {
    this._horasAlocadas = horasAlocadas;
  }

  public alocarHoras(horas: number): void {
    this._horasAlocadas += horas;
  }
}
