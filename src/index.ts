import { Peca } from "./model/Peca/Peca";
import { Fornecedor } from "./model/Fornecedor/Fornecedor";
import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import { ServicoFuncionario } from "./model/ServicoFuncionario/ServicoAlocado";
import select, { Separator } from '@inquirer/select';
import input from '@inquirer/input';
import readline from 'readline';
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
    new Funcionario(1, "Lucas Henrique", "lucashenrique@email.teste", "+99(99)99999-9999", 11, new Date()),
];

const clientes: Cliente[] = [
    new Cliente(1, "Lucas Henrique", "+99(99)99999-9999", "Rua 1 nro 2, bairro 3, cidade 4"),
    new Cliente(2, "Antônio", "+99(99)99999-9999", "Rua 10 nro 20, bairro 30, cidade 40")
];

const servicosFuncionario : ServicoFuncionario[] = [
    new ServicoFuncionario(funcionarios[0], 10),
];


const ordensServico: OrdemServico[] = [
    new OrdemServico(1, "Motor de Geladeira", "Troca do motor de geladeira", [servicosFuncionario[0]], clientes[0], 1, [pecas[0]], [], 100, 0, 0, 0, false),
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

async function interacaoAndamentoServico(cliente: Cliente) {
    let ordensServicoCliente = ordensServico.filter((ordemServico) => ordemServico.cliente.id == cliente.id);
    if(ordensServicoCliente.length > 0){
        let interacaoValidaAndamentoServico = false;
        while(!interacaoValidaAndamentoServico){
            let questaoAndamentoServico = "Qual ordem de serviço você deseja visualizar?\n"
            ordensServicoCliente.forEach((ordemServico) => {
                questaoAndamentoServico += `${ordemServico.id} - ${ordemServico.descricao}\n`
            });
            let respostaAndamentoServico = await input({ message: questaoAndamentoServico });
            try {
                let ordemServicoSelecionada = ordensServicoCliente.find((ordemServico) => ordemServico.id == Number(respostaAndamentoServico));
                if(ordemServicoSelecionada){
                    console.log(`A ordem de serviço ${ordemServicoSelecionada.id} está ${ordemServicoSelecionada.status} e possui o valor de R$${ordemServicoSelecionada.valorFinal}. ${ordemServicoSelecionada.funcionariosAlocados.length > 0 ? "Os funcionários alocados são: \n" + ordemServicoSelecionada.funcionariosAlocados.map((servicoFuncionario) => servicoFuncionario.funcionario.nome).join(", ")  + "\n": "\n"}`)
                    interacaoValidaAndamentoServico = true;
                    interacaoAcoesCliente(cliente);
                } else {
                    console.log("Opção inválida");
                }
            } catch (error){
                console.log("Opção inválida");
            }
        }
    } else {
        console.log("Você não possui nenhuma ordem de serviço");
        interacaoAcoesCliente(cliente);
    }

} 

async function interacaoAcoesCliente(cliente: Cliente) {
    let interacaoValidaAcoesCliente = false;
    while(!interacaoValidaAcoesCliente){
        let questaoAcoesCliente = "O que você deseja fazer?\n"
        questaoAcoesCliente += "1 - Solicitar orçamento\n"
        questaoAcoesCliente += "2 - Aprovar orçamento\n"
        questaoAcoesCliente += "3 - Visualizar andamento do serviço\n"
        const respostaAcoesCliente = await input({ message: questaoAcoesCliente });
        switch (respostaAcoesCliente) {
            case "1":
                console.log("Solicitar orçamento");
                interacaoValidaAcoesCliente = true;
                break;
            case "2":
                console.log("Aprovar orçamento");
                interacaoValidaAcoesCliente = true;
                break;
            case "3":
                console.log("Visualizar andamento do serviço");
                interacaoAndamentoServico(cliente);
                interacaoValidaAcoesCliente = true;
                break;
            default:
                console.log("Opção inválida");
        }
    }
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
