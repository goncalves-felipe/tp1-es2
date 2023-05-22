import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import input from '@inquirer/input';
import { clientes, funcionarios, ordensServico } from "./dados";
import { StatusOrdemServico } from "./constantes/StatusOrdemServico";
import { OrdemServico } from "./model/OrdemServico/OrdemServico";


function main(): void {
    interacaoUsuario();
}

async function interacaoUsuario() {
    let interacaoValidaUsuario = false;
    while (!interacaoValidaUsuario) {

        const respostaTipoUsuario = await input({ message: 'O que você é\n1 - Cliente\n2 - Funcionario\n3 - Sair\n' });
        switch (respostaTipoUsuario) {

            case "1":
                await interacaoCliente()
                interacaoValidaUsuario = true;
                break;
            case "2":
                await interacaoFuncionario()
                interacaoValidaUsuario = true;
                break;
            case "3":
                console.log("Saindo...");
                interacaoValidaUsuario = true;
                break;
            default:
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
        }
    };

}

async function interacaoSolicitarServico(cliente: Cliente) {

    let interacaoValidaAndamentoServico = false;
    while (!interacaoValidaAndamentoServico) {
        console.log("\n")
        const produto = await input({ message: "Qual o produto que deseja consertar?" });
        const descricao = await input({ message: "Descreva o serviço que deseja contratar" });
        // FIX product number
        const novaOrdem: OrdemServico = new OrdemServico(ordensServico.length + 1)
        if (novaOrdem) {
            novaOrdem.criarOrdemServico(produto, descricao, cliente);
            console.log(`A ordem de serviço '${novaOrdem.descricao}', foi criada com sucesso!`)
            interacaoValidaAndamentoServico = true;
            return interacaoAcoesCliente(cliente);
        } else {
            console.log("Opção inválida");
        }
    }
}

async function interacaoAprovarOrcamento(cliente: Cliente) {
    console.log("\nBuscanco orçamentos pendentes de aprovação ...")
    let ordensServicoCliente = ordensServico.filter(
        (ordemServico) => (ordemServico.cliente.id == cliente.id
            && (ordemServico.status == StatusOrdemServico.APROVADO
                || ordemServico.status == StatusOrdemServico.EM_ANALISE))
    );
    if (ordensServicoCliente.length > 0) {
        let interacaoValidaAndamentoServico = false;
        while (!interacaoValidaAndamentoServico) {
            let questaoAndamentoServico = "Selecione o orçamento que deseja aprovar\n"
            ordensServicoCliente.forEach((ordemServico) => {
                questaoAndamentoServico += `${ordemServico.id} - ${ordemServico.descricao} R$${ordemServico.valorOrcamento}\n`
            });
            let respostaAndamentoServico = await input({ message: questaoAndamentoServico });
            try {
                let ordemServicoSelecionada = ordensServicoCliente.find((ordemServico) => ordemServico.id == Number(respostaAndamentoServico));
                if (ordemServicoSelecionada) {
                    ordemServicoSelecionada.aprovarOrdemServico();
                    console.log(`O orçamento relacionado a ordem de serviço ${ordemServicoSelecionada.id}, de ${ordemServicoSelecionada.valorOrcamento} reias, foi aprovado com sucesso!`)
                    interacaoValidaAndamentoServico = true;
                    return interacaoAcoesCliente(cliente);
                } else {
                    console.log("Opção inválida");
                }
            } catch (error) {
                console.log("Opção inválida");
            }
        }
    } else {
        setTimeout(() => {
            console.log("\x1b[31m%s\x1b[0m", "\nVocê não possui nenhum orçamento pendente");
            return interacaoAcoesCliente(cliente);
        }, 1000);
    }

}

async function interacaoAndamentoServico(cliente: Cliente) {
    let ordensServicoCliente = ordensServico.filter((ordemServico) => ordemServico.cliente.id == cliente.id);
    if (ordensServicoCliente.length > 0) {
        let interacaoValidaAndamentoServico = false;
        while (!interacaoValidaAndamentoServico) {
            let questaoAndamentoServico = "Qual ordem de serviço você deseja visualizar?\n"
            ordensServicoCliente.forEach((ordemServico) => {
                questaoAndamentoServico += `${ordemServico.id} - ${ordemServico.descricao}\n`
            });
            console.log("\n");
            let respostaAndamentoServico = await input({ message: questaoAndamentoServico });
            try {
                let ordemServicoSelecionada = ordensServicoCliente.find((ordemServico) => ordemServico.id == Number(respostaAndamentoServico));
                if (ordemServicoSelecionada) {
                    let descricaoStatus = "";

                    switch (ordemServicoSelecionada.status) {
                        case StatusOrdemServico.CRIADO:
                            descricaoStatus = "criado";
                            break;
                        case StatusOrdemServico.RECUSADO:
                            descricaoStatus = "recusado";
                            break;
                        case StatusOrdemServico.APROVADO:
                            descricaoStatus = "aprovado";
                            break;
                        case StatusOrdemServico.EM_ANALISE:
                            descricaoStatus = "em análise";
                            break;
                        case StatusOrdemServico.EM_ANDAMENTO:
                            descricaoStatus = "em andamento";
                            break;
                        case StatusOrdemServico.FINALIZADO_SUCESSO:
                            descricaoStatus = "finalizado com sucesso";
                            break;
                        case StatusOrdemServico.FINALIZADO_FALHA:
                            descricaoStatus = "finalizado com falha";
                            break;

                    }

                    console.log("\nConsultando ordem de serviço ...")
                    console.log("\x1b[32m%s\x1b[0m", `\nA ordem de serviço ${ordemServicoSelecionada.id} está ${descricaoStatus} e possui o valor de R$${ordemServicoSelecionada.valorFinal}.`)
                    interacaoValidaAndamentoServico = true;
                    return interacaoAcoesCliente(cliente);

                } else {
                    console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
                }
            } catch (error) {
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
            }
        }
    } else {
        console.log("\x1b[31m%s\x1b[0m", "\nVocê não possui nenhuma ordem de serviço\n");
        return interacaoAcoesCliente(cliente);
    }

}

async function interacaoAcoesCliente(cliente: Cliente) {
    let interacaoValidaAcoesCliente = false;
    while (!interacaoValidaAcoesCliente) {
        let questaoAcoesCliente = "O que você deseja fazer?\n"
        questaoAcoesCliente += "1 - Solicitar serviço\n"
        questaoAcoesCliente += "2 - Aprovar orçamento\n"
        questaoAcoesCliente += "3 - Visualizar andamento do serviço\n"
        questaoAcoesCliente += "4 - Voltar\n"
        console.log("\n")
        const respostaAcoesCliente = await input({ message: questaoAcoesCliente });
        switch (respostaAcoesCliente) {
            case "1":
                await interacaoSolicitarServico(cliente);
                interacaoValidaAcoesCliente = true;
                break;
            case "2":
                await interacaoAprovarOrcamento(cliente);
                interacaoValidaAcoesCliente = true;
                break;
            case "3":
                await interacaoAndamentoServico(cliente);
                interacaoValidaAcoesCliente = true;
                break;
            case "4":
                interacaoValidaAcoesCliente = true;
                interacaoCliente();
                return
            default:
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
        }
    }
}

async function interacaoCliente() {
    let interacaoValidaUsuario = false;
    console.log("\n")
    let questaoCliente = "Quem é você?\n"
    clientes.forEach((cliente) => {
        questaoCliente += `${cliente.id} - ${cliente.nome}\n`
    });
    questaoCliente += `${clientes.length + 1} - Voltar\n`

    while (!interacaoValidaUsuario) {

        const respostaCliente = await input({ message: questaoCliente });
        try {
            let resposta = parseInt(respostaCliente);
            if (resposta > 0 && resposta <= clientes.length) {
                interacaoValidaUsuario = true;
                let clienteSelecionado = clientes[resposta - 1];
                await interacaoAcoesCliente(clienteSelecionado);
            } else if (resposta == clientes.length + 1) {
                interacaoValidaUsuario = true;
                interacaoUsuario();
            } else {
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
                break;
            }
        } catch (error) {
            console.log("\n", "\x1b[31m%s\x1b[0m", "Opção inválida")
        }

    }
}
const opcoesFuncionario = [
    { id: 1, descricao: "Criar Orcamento" },
    { id: 2, descricao: "Finalizar Serviço" },
    { id: 3, descricao: "Voltar" }
]

async function criarOrcamento(funcionario: Funcionario) {
    let questao = "Para qual ordem de serviço você deseja criar um orçamento?\n";
    let interacaoValida = false;
    ordensServico.filter((ordens) => ordens.status == StatusOrdemServico.CRIADO).forEach((ordens) => {
        questao += `${ordens.id} - ${ordens.descricao}\n`
    });
    questao += `${ordensServico.length + 1} - Voltar\n`

    while (!interacaoValida) {
        console.log("\n")
        const respostaOrcamento = await input({ message: questao });
        try {
            let resposta = parseInt(respostaOrcamento);
            if (resposta > 0 && resposta <= ordensServico.length) {
                interacaoValida = true;
                console.log("\n")
                const horasPrevistas = await input({ message: 'Horas previstas: ' });
                const valorOrcamento = await input({ message: 'Valor Orcamento: ' });
                ordensServico.find((ordem) => ordem.id == resposta)?.criarOrcamento(parseFloat(horasPrevistas), parseFloat(valorOrcamento));
                console.log("\nAguarde enquanto estamos gerando o orçamento");
                setTimeout(() => {
                    console.log("\x1b[32m%s\x1b[0m", "\nOrçamento gerado com sucesso");
                    interacaoAcaoFuncionario(funcionario);
                }, 1000);
            } else if (resposta == ordensServico.length + 1) {
                interacaoValida = true;
                interacaoAcaoFuncionario(funcionario);
            } else {
                console.log("Opção inválida");
                break;
            }
        } catch (error) {
            console.log("Opção inválida")
        }
    }
}
async function finalizarServico(funcionario: Funcionario) {

    console.log("\nBuscando ordens de serviço ...\n");
    let questao = "Qual ordem de serviço você deseja finalizar??\n";
    let interacaoValida = false;
    let ordensAbertas = ordensServico.filter((ordens) => ordens.status == StatusOrdemServico.EM_ANDAMENTO);
    ordensAbertas.forEach((ordens) => {
        questao += `${ordens.id} - ${ordens.descricao}\n`
    });
    if (ordensAbertas.length == 0) {
        setTimeout(() => {
            console.log("\x1b[31m%s\x1b[0m", "Não existem ordens em andamento");
            interacaoAcaoFuncionario(funcionario);
        }, 1000);
        return
    }
    while (!interacaoValida) {
        const respostaOrcamento = await input({ message: questao });
        try {
            let resposta = parseInt(respostaOrcamento);
            let ordemASerFinalizada = ordensAbertas.find((ordem) => ordem.id == resposta);
            if (ordemASerFinalizada != null) {
                interacaoValida = true;
                ordemASerFinalizada.finalizarComSucesso();

                console.log("\nAguarde enquanto estamos finalizando o serviço\n");
                setTimeout(() => {
                    console.log("\x1b[32m%s\x1b[0m", "\nServiço finalizado com sucesso\n");
                    interacaoAcaoFuncionario(funcionario);
                }, 1000);
            } else {
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
                break;
            }
        } catch (error) {
            console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
        }
    }
}
async function interacaoAcaoFuncionario(funcionario: Funcionario) {

    let questao = "Olá, " + funcionario.nome + " o que você deseja?\n";
    let interacaoValida = false;
    opcoesFuncionario.forEach((opcoes) => {
        questao += `${opcoes.id} - ${opcoes.descricao}\n`
    })

    while (!interacaoValida) {
        console.log("\n")
        const respostaFuncionario = await input({ message: questao });
        try {
            let resposta = parseInt(respostaFuncionario);
            if (resposta > 0 && resposta <= opcoesFuncionario.length) {
                interacaoValida = true;
                if (resposta == 1) {
                    criarOrcamento(funcionario);
                } else if (resposta == 2) {
                    finalizarServico(funcionario);
                } else if (resposta == 3) {
                    interacaoValida = true;
                    return interacaoFuncionario();
                }
            } else {
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
                break;
            }
        } catch (error) {
            console.log("Opção inválida")
        }
    }

}

async function interacaoFuncionario() {
    let interacaoValidaFuncionario = false;
    console.log("\n")
    let questaoFuncionario = "Quem é você?\n"
    funcionarios.forEach((funcionario) => {
        questaoFuncionario += `${funcionario.id} - ${funcionario.nome}\n`
    });
    questaoFuncionario += `${funcionarios.length + 1} - Voltar\n`

    while (!interacaoValidaFuncionario) {

        const respostaFuncionario = await input({ message: questaoFuncionario });
        try {
            let resposta = parseInt(respostaFuncionario);
            if (resposta > 0 && resposta <= funcionarios.length) {
                interacaoValidaFuncionario = true;
                let funcionarioSelecionado = funcionarios[resposta - 1];
                await interacaoAcaoFuncionario(funcionarioSelecionado);
            } else if (resposta == funcionarios.length + 1) {
                interacaoValidaFuncionario = true;
                return interacaoUsuario();
            } else {
                console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
                break;
            }
        } catch (error) {
            console.log("Opção inválida")
        }
    }
}

main();
