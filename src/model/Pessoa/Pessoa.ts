export class Pessoa {
  private _id: number;
  private _nome: string;
  private _email: string;
  private _nroTelefone: string;

  constructor(
    id?: number,
    nome?: string,
    email?: string,
    nroTelefone?: string
  ) {
    this._id = id ?? 0;
    this._nome = nome ?? "";
    this._email = email ?? "";
    this._nroTelefone = nroTelefone ?? "";
  }

  get id(): number {
    return this._id;
  }

  set id(_id: number) {
    this._id = _id;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(_nome: string) {
    this._nome = _nome;
  }

  get email(): string {
    return this._email;
  }

  set email(_email: string) {
    this._email = _email;
  }

  get nroTelefone(): string {
    return this._nroTelefone;
  }

  set nroTelefone(_nroTelefone: string) {
    this._nroTelefone = _nroTelefone;
  }
}
