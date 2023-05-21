import { Peca } from "./model/Peca/Peca";
import { Fornecedor } from "./model/Fornecedor/Fornecedor";
import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import select, { Separator } from '@inquirer/select';
import input from '@inquirer/input';
import readline from 'readline';

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
    new Funcionario(1, "Lucas Henrique", "lucashenrique@email.teste", "+99(99)99999-9999", 11, new Date()),
];

const clientes: Cliente[] = [
    new Cliente(1, "Lucas Henrique", "+99(99)99999-9999", "Rua 1 nro 2, bairro 3, cidade 4"),
    new Cliente(2, "Antônio", "+99(99)99999-9999", "Rua 10 nro 20, bairro 30, cidade 40")
];

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main(): void {


    interacaoUsuario();
}

async function interacaoUsuario() { 
    let interacaoValidaUsuario = false;
    while(!interacaoValidaUsuario){

        const respostaTipoUsuario = await input({ message: 'O que você é\n1 - Cliente\n2 - Funcionario\n' });
        switch (respostaTipoUsuario) {
            case "1":
                await interacaoCliente()  
                interacaoValidaUsuario = true;
                break;
            case "2":
                await interacaoFuncionario()
                interacaoValidaUsuario = true;
                break;
            default:
                console.log("Opção inválida");
        }
    };
   
}

async function interacaoAcoesCliente(cliente: Cliente) {
    console.log("Olá, " + cliente.nome);
}

async function interacaoCliente() {
    let interacaoValidaUsuario = false;
    let questaoCliente = "Quem é você?\n"
    clientes.forEach((cliente) => {
        questaoCliente += `${cliente.id} - ${cliente.nome}\n`
    });

    while(!interacaoValidaUsuario){
        
        const respostaCliente = await input({ message: questaoCliente });
        try {
            let resposta = parseInt(respostaCliente);
            if(resposta > 0 && resposta <= clientes.length){ 
                interacaoValidaUsuario = true;
                let clienteSelecionado = clientes[resposta - 1];
                interacaoAcoesCliente(clienteSelecionado);
            } else {
                console.log("Opção inválida");
                break;
            }
        } catch(error) {
            console.log("Opção inválida")
        }

    }
}

async function interacaoAcaoFuncionario(funcionario: Funcionario) {
    console.log("Olá, " + funcionario.nome);
}

async function interacaoFuncionario() {
    let interacaoValidaFuncionario = false;
    let questaoFuncionario = "Quem é você?\n"
    funcionarios.forEach((funcionario) => {
        questaoFuncionario += `${funcionario.id} - ${funcionario.nome}\n`
    });

    while(!interacaoValidaFuncionario){
        
        const respostaFuncionario = await input({ message: questaoFuncionario });
        try {
            let resposta = parseInt(respostaFuncionario);
            if(resposta > 0 && resposta <= funcionarios.length){ 
                interacaoValidaFuncionario = true;
                let funcionarioSelecionado = funcionarios[resposta - 1];
                interacaoAcaoFuncionario(funcionarioSelecionado);
            } else {
                console.log("Opção inválida");
                break;
            }
        } catch(error) {
            console.log("Opção inválida")
        }
    }
}

main();
