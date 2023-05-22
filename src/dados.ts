import { Peca } from "./model/Peca/Peca";
import { Fornecedor } from "./model/Fornecedor/Fornecedor";
import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import { ServicoFuncionario } from "./model/ServicoFuncionario/ServicoAlocado";
import { OrdemServico } from "./model/OrdemServico/OrdemServico";

const fornecedores: Fornecedor[] = [
    new Fornecedor(1, "João da Silva", "joaodasilva@email.teste", "+99(99)99999-9999", "11.111.111/0001-11"),
    new Fornecedor(2, "José Carlos", "josecalors@email.teste", "+99(99)99999-9999", "11.111.111/0001-11")
];

const pecas: Peca[] = [
    new Peca(1, "Motor de geladeira", 100, 20, 20, 20, 3, 0, fornecedores[1]),
    new Peca(2, "Tira de vedação", 10, 100, 4, 1, 20, 0, fornecedores[0]),
    new Peca(3, "Fio de cobre", 5, 1000, 0.1, 0.1, 50, 0, fornecedores[0]),
    new Peca(4, "Cano de cobre", 8, 100, 2, 2, 30, 0, fornecedores[1])
];

const funcionarios: Funcionario[] = [
    new Funcionario(1, "Pedro Silva", "pedrosilva@email.teste", "+99(99)99999-9999", 10, new Date()),
    new Funcionario(2, "Lucas Henrique", "lucashenrique@email.teste", "+99(99)99999-9999", 11, new Date()),
];

const clientes: Cliente[] = [
    new Cliente(1, "Lucas Henrique", "+99(99)99999-9999", "Rua 1 nro 2, bairro 3, cidade 4"),
    new Cliente(2, "Antônio", "+99(99)99999-9999", "Rua 10 nro 20, bairro 30, cidade 40")
];

const servicosFuncionario: ServicoFuncionario[] = [
    new ServicoFuncionario(funcionarios[0], 10),
];


const ordensServico: OrdemServico[] = [
    new OrdemServico(1, "Reparo de geladeira", "Reparo no motor da geladeira", [], clientes[0]),
    new OrdemServico(2, "Troca de borracha", "Troca da borracha da geladeira", [], clientes[1])
];

export { fornecedores, pecas, funcionarios, clientes, servicosFuncionario, ordensServico };