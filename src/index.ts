import { Fornecedor } from "./model/Fornecedor/Fornecedor";
function main(): void {
    let fornecedores = new Array<Fornecedor>();
    fornecedores.push(new Fornecedor(1, "João da Silva", "joaodasilva@email.teste", "+99(99)99999-9999", "11.111.111/0001-11"));
    console.log(fornecedores)
}

main();
