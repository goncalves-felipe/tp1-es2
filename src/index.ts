import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import input from '@inquirer/input';
import readline from 'readline';
import { clientes, funcionarios, ordensServico } from "./dados";

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
                    return interacaoAcoesCliente(cliente);
                } else {
                    console.log("Opção inválida");
                }
            } catch (error){
                console.log("Opção inválida");
            }
        }
    } else {
        console.log("\nVocê não possui nenhuma ordem de serviço\n");
        return interacaoAcoesCliente(cliente);
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
                await interacaoAndamentoServico(cliente);
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
                await interacaoAcoesCliente(clienteSelecionado);
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
                await interacaoAcaoFuncionario(funcionarioSelecionado);
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
