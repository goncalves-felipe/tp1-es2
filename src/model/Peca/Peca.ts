import { Fornecedor } from "../Fornecedor/Fornecedor";

export class Peca {
  private _id: number;
  private _nome: string;
  private _preco: number;
  private _altura: number;
  private _largura: number;
  private _comprimento: number;
  private _estoque: number;
  private _fornecedor: Fornecedor;
  private _quantidadeUtilizada: number;

  constructor(
    id?: number,
    nome?: string,
    preco?: number,
    altura?: number,
    largura?: number,
    comprimento?: number,
    estoque?: number,
    quantidadeUtilizada?: number,
    fornecedor?: Fornecedor
  ) {
    this._id = id ?? 0;
    this._nome = nome ?? "";
    this._preco = preco ?? 0;
    this._altura = altura ?? 0;
    this._largura = largura ?? 0;
    this._comprimento = comprimento ?? 0;
    this._estoque = estoque ?? 0;
    this._fornecedor = fornecedor ?? new Fornecedor();
    this._quantidadeUtilizada = quantidadeUtilizada ?? 0;
  }

  public get id(): number {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get preco(): number {
    return this._preco;
  }

  public get altura(): number {
    return this._altura;
  }

  public get largura(): number {
    return this._largura;
  }

  public get comprimento(): number {
    return this._comprimento;
  }

  public get estoque(): number {
    return this._estoque;
  }

  public get fornecedor(): Fornecedor {
    return this._fornecedor;
  }

  public get quantidadeUtilizada(): number {
    return this._quantidadeUtilizada;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public set preco(preco: number) {
    this._preco = preco;
  }

  public set altura(altura: number) {
    this._altura = altura;
  }

  public set largura(largura: number) {
    this._largura = largura;
  }

  public set comprimento(comprimento: number) {
    this._comprimento = comprimento;
  }

  public set estoque(estoque: number) {
    this._estoque = estoque;
  }

  public set fornecedor(fornecedor: Fornecedor) {
    this._fornecedor = fornecedor;
  }

  public set quantidadeUtilizada(quantidadeUtilizada: number) {
    this._quantidadeUtilizada = quantidadeUtilizada;
  }
}
