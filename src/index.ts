import { Funcionario } from "./model/Funcionario/Funcionario";
import { Cliente } from "./model/Cliente/Cliente";
import input from "@inquirer/input";
import { clientes, funcionarios, ordensServico, orcamentos } from "./dados";
import { StatusOrdemServico } from "./constantes/StatusOrdemServico";
import { StatusOrcamentos } from "./constantes/StatusOrcamentos";
import { OrdemServico } from "./model/OrdemServico/OrdemServico";
import { Orcamento } from "./model/Orcamento/Orcamento";

function main(): void {
  interacaoUsuario();
}

async function interacaoUsuario() {
  let interacaoValidaUsuario = false;
  while (!interacaoValidaUsuario) {
    const respostaTipoUsuario = await input({
      message: "O que você é\n1 - Cliente\n2 - Funcionario\n3 - Sair\n",
    });
    switch (respostaTipoUsuario) {
      case "1":
        await interacaoCliente();
        interacaoValidaUsuario = true;
        break;
      case "2":
        await interacaoFuncionario();
        interacaoValidaUsuario = true;
        break;
      case "3":
        console.log("Saindo...");
        process.exit();
      default:
        console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
    }
  }
}

async function interacaoSolicitarServico(cliente: Cliente) {
  let interacaoValidaAndamentoServico = false;
  while (!interacaoValidaAndamentoServico) {
    console.log("\n");
    const produto = await input({
      message: "Qual o produto que deseja consertar?",
    });

    const descricao = await input({
      message: "Descreva o serviço que deseja contratar",
    });

    const novaOrdem: OrdemServico = new OrdemServico(
      ordensServico.length + 1,
      produto,
      descricao,
      cliente
    );

    if (novaOrdem) {
      ordensServico.push(novaOrdem);
      console.log(
        `A ordem de serviço '${novaOrdem.descricao}', foi criada com sucesso!`
      );

      interacaoValidaAndamentoServico = true;
      await interacaoAcoesCliente(cliente);
      return;
    } else {
      opcaoInvalida();
    }
  }
}

async function interacaoAprovarOrcamento(cliente: Cliente) {
  console.log("\nBuscanco orçamentos pendentes de aprovação ...");
  let orcamentosServicoCliente = orcamentos.filter(
    (orcamento) =>
      orcamento.ordemServico.cliente.id == cliente.id &&
      orcamento.status == StatusOrcamentos.AGUARDANDO_CLIENTE
  );

  if (orcamentosServicoCliente.length > 0) {
    let interacaoValidaAndamentoServico = false;

    while (!interacaoValidaAndamentoServico) {
      let questaoOrcamento = "Selecione o orçamento que deseja aprovar\n";
      orcamentosServicoCliente.forEach((orcamento) => {
        questaoOrcamento += `${orcamento.id} - ${orcamento.ordemServico.descricao} - Previsão de horas gastas: ${orcamento.horasPrevistas} - R$${orcamento.valorOrcamento}\n`;
      });

      let respostaOrcamento = await input({ message: questaoOrcamento });

      try {
        let orcamentoSelecionada = orcamentosServicoCliente.find(
          (orcamento) => orcamento.id == Number(respostaOrcamento)
        );

        if (orcamentoSelecionada) {
          orcamentoSelecionada.aprovarOrcamento();
          console.log(
            `O orçamento relacionado a ordem de serviço ${orcamentoSelecionada.id}, de ${orcamentoSelecionada.valorOrcamento} reais, foi aprovado com sucesso!`
          );
          interacaoValidaAndamentoServico = true;

          await interacaoAcoesCliente(cliente);
          return;
        } else {
          opcaoInvalida();
        }
      } catch (error) {
        opcaoInvalida();
      }
    }
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "\nVocê não possui nenhum orçamento pendente"
    );
    await interacaoAcoesCliente(cliente);
    return;
  }
}

function constroiInteracaoParaArray(mensagemBase: string, elementos: any[]) {
  let interacao = mensagemBase;
  elementos.forEach((elemento: any) => {
    interacao += `${elemento.id} - ${elemento.nome}\n`;
  });
  return interacao;
}

async function interacaoAndamentoServico(
  cliente: Cliente,
  ordensServicoCliente: OrdemServico[]
) {
  let interacaoValidaAndamentoServico = false;

  while (!interacaoValidaAndamentoServico) {
    let questaoAndamentoServico = constroiInteracaoParaArray(
      "Qual ordem de serviço você deseja visualizar?\n",
      ordensServicoCliente
    );

    console.log("\n");

    let respostaAndamentoServico = await input({
      message: questaoAndamentoServico,
    });

    if (Number.isNaN(Number(respostaAndamentoServico))) {
      opcaoInvalida();
      continue;
    }

    let ordemServicoSelecionada = ordensServicoCliente.find(
      (ordemServico) => ordemServico.id == Number(respostaAndamentoServico)
    );

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
        case StatusOrdemServico.FINALIZADO_SUCESSO:
          descricaoStatus = "finalizado com sucesso";
          break;
        case StatusOrdemServico.FINALIZADO_FALHA:
          descricaoStatus = "finalizado com falha";
          break;
      }

      console.log("\nConsultando ordem de serviço ...");
      console.log(
        "\x1b[32m%s\x1b[0m",
        `\nA ordem de serviço ${ordemServicoSelecionada.id} está ${descricaoStatus}`
      );
      interacaoValidaAndamentoServico = true;
      await interacaoAcoesCliente(cliente);
      return;
    } else {
      console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
    }
  }
}

function buscaOrdensCliente(cliente: Cliente) {
  return ordensServico.filter(
    (ordemServico) => ordemServico.cliente.id == cliente.id
  );
}

async function interacaoAcoesCliente(cliente: Cliente) {
  let interacaoValidaAcoesCliente = false;
  let ordensCliente = buscaOrdensCliente(cliente);

  while (!interacaoValidaAcoesCliente) {
    let questaoAcoesCliente = "O que você deseja fazer?\n";
    questaoAcoesCliente += "1 - Solicitar serviço\n";
    questaoAcoesCliente += "2 - Aprovar orçamento\n";
    questaoAcoesCliente += "3 - Visualizar andamento do serviço\n";
    questaoAcoesCliente += "4 - Voltar\n";
    console.log("\n");

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
        if (ordensCliente.length == 0) {
          console.log(
            "\x1b[31m%s\x1b[0m",
            "\nVocê não possui nenhuma ordem de serviço\n"
          );
          await interacaoAcoesCliente(cliente);
        } else {
          await interacaoAndamentoServico(cliente, ordensCliente);
          interacaoValidaAcoesCliente = true;
        }
        break;
      case "4":
        interacaoValidaAcoesCliente = true;
        await interacaoCliente();
        return;
      default:
        console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
    }
  }
}

async function interacaoCliente() {
  let interacaoValidaUsuario = false;
  console.log("\n");

  let questaoCliente = "Quem é você?\n";

  clientes.forEach((cliente) => {
    questaoCliente += `${cliente.id} - ${cliente.nome}\n`;
  });

  questaoCliente += `${clientes.length + 1} - Voltar\n`;

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
        await interacaoUsuario();
      } else {
        console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
      }
    } catch (error) {
      console.log("\n", "\x1b[31m%s\x1b[0m", "Opção inválida");
    }
  }
}
const opcoesFuncionario = [
  { id: 1, descricao: "Criar Orcamento" },
  { id: 2, descricao: "Finalizar Serviço" },
  { id: 3, descricao: "Voltar" },
];

async function criarOrcamento(funcionario: Funcionario) {
  let questao = "Para qual ordem de serviço você deseja criar um orçamento?\n";
  let interacaoValida = false;
  ordensServico
    .filter((ordens) => ordens.status == StatusOrdemServico.CRIADO)
    .forEach((ordens) => {
      questao += `${ordens.id} - ${ordens.descricao}\n`;
    });
  questao += `${ordensServico.length + 1} - Voltar\n`;

  while (!interacaoValida) {
    console.log("\n");
    const respostaOrcamento = await input({ message: questao });

    try {
      let resposta = parseInt(respostaOrcamento);
      if (resposta > 0 && resposta <= ordensServico.length) {
        interacaoValida = true;
        console.log("\n");

        const horasPrevistas: number = +(await input({
          message: "Horas previstas: ",
        }));
        const valorOrcamento: number = +(await input({
          message: "Valor Orcamento: ",
        }));
        const orcamento: Orcamento = new Orcamento(
          orcamentos.length + 1,
          valorOrcamento,
          horasPrevistas,
          ordensServico.find((ordem) => ordem.id == resposta)
        );

        console.log("\nAguarde enquanto estamos gerando o orçamento");
        orcamentos.push(orcamento);

        console.log("\x1b[32m%s\x1b[0m", "\nOrçamento gerado com sucesso");
        await interacaoAcaoFuncionario(funcionario);
      } else if (resposta == ordensServico.length + 1) {
        interacaoValida = true;
        await interacaoAcaoFuncionario(funcionario);
      } else {
        opcaoInvalida();
        break;
      }
    } catch (error) {
      console.log("Opção inválida");
    }
  }
}
async function finalizarServico(funcionario: Funcionario) {
  console.log("\nBuscando ordens de serviço ...\n");
  let questao = "Qual ordem de serviço você deseja finalizar??\n";
  let interacaoValida = false;
  let ordensAbertas = ordensServico.filter(
    (ordens) => ordens.status == StatusOrdemServico.APROVADO
  );
  ordensAbertas.forEach((ordens) => {
    questao += `${ordens.id} - ${ordens.descricao}\n`;
  });

  if (ordensAbertas.length == 0) {
    console.log("\x1b[31m%s\x1b[0m", "Não existem ordens em andamento");
    await interacaoAcaoFuncionario(funcionario);
    return;
  }

  while (!interacaoValida) {
    const respostaOrcamento = await input({ message: questao });

    try {
      let resposta = parseInt(respostaOrcamento);
      let ordemASerFinalizada = ordensAbertas.find(
        (ordem) => ordem.id == resposta
      );

      if (ordemASerFinalizada) {
        interacaoValida = true;
        ordemASerFinalizada.finalizarComSucesso();

        console.log("\nAguarde enquanto estamos finalizando o serviço\n");
        console.log("\x1b[32m%s\x1b[0m", "\nServiço finalizado com sucesso\n");
        await interacaoAcaoFuncionario(funcionario);
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
  let questao = `Olá, ${funcionario.nome}, o que você deseja?\n`;
  opcoesFuncionario.forEach((opcao) => {
    questao += `${opcao.id} - ${opcao.descricao}\n`;
  });

  while (true) {
    console.log("\n");
    const respostaFuncionario = await input({ message: questao });

    try {
      const resposta = parseInt(respostaFuncionario);
      if (resposta === 1) {
        await criarOrcamento(funcionario);
      } else if (resposta === 2) {
        await finalizarServico(funcionario);
      } else if (resposta === 3) {
        await interacaoFuncionario();
        return;
      } else {
        opcaoInvalida();
        break;
      }
    } catch (error) {
      opcaoInvalida();
    }
  }
}

async function interacaoFuncionario() {
  let interacaoValidaFuncionario = false;
  console.log("\n");
  let questaoFuncionario = "Quem é você?\n";
  funcionarios.forEach((funcionario) => {
    questaoFuncionario += `${funcionario.id} - ${funcionario.nome}\n`;
  });
  questaoFuncionario += `${funcionarios.length + 1} - Voltar\n`;

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
        return await interacaoUsuario();
      } else {
        console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida", "\n");
        break;
      }
    } catch (error) {
      console.log("Opção inválida");
    }
  }
}

function opcaoInvalida() {
  console.log("\x1b[31m%s\x1b[0m", "\nOpção inválida\n");
}

main();
