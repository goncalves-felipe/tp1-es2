import input from '@inquirer/input';
import { interacaoUsuario } from '../../src/index';
import { clientes, funcionarios, ordensServico, orcamentos } from "../../src/dados";

jest.mock('@inquirer/input', () => {
    return jest.fn().mockResolvedValueOnce('3');
});

describe('Testes para a interação de cliente', () => {
    let mockedInputHandler: jest.MockedFunction<typeof input>;

    beforeEach(() => {
        (input as jest.MockedFunction<typeof input>).mockClear();
        mockedInputHandler = input as jest.MockedFunction<typeof input>;
    });

    it('Usuario escolhe a opção de sair', async () => {
        mockedInputHandler.mockResolvedValueOnce('3');

        await interacaoUsuario();

        expect(mockedInputHandler).toHaveBeenCalledTimes(1);
    });


    it('Solicita novo servico', async () => {
        const quantidadeOrdensDeServico = ordensServico.length;
        mockedInputHandler.mockResolvedValueOnce('1');
        mockedInputHandler.mockResolvedValueOnce('1');
        mockedInputHandler.mockResolvedValueOnce('1');
        mockedInputHandler.mockResolvedValueOnce("geladeira");
        mockedInputHandler.mockResolvedValueOnce("trocar porta");
        mockedInputHandler.mockResolvedValueOnce('4');
        mockedInputHandler.mockResolvedValueOnce('3');
        mockedInputHandler.mockResolvedValueOnce('3');

        await interacaoUsuario();

        expect(mockedInputHandler).toHaveBeenCalledTimes(8);
        expect(ordensServico.length).toEqual(quantidadeOrdensDeServico + 1);
    });

    it('Visualizar o andamento do serviço', async () => {
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona cliente
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona usuario
        mockedInputHandler.mockResolvedValueOnce('3'); //visualizar andamento
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona ordem de servico
        mockedInputHandler.mockResolvedValueOnce('4'); //volta
        mockedInputHandler.mockResolvedValueOnce('3'); //volta
        mockedInputHandler.mockResolvedValueOnce('3'); //sair

        await interacaoUsuario();

        expect(mockedInputHandler).toHaveBeenCalledTimes(7);
    });

    it('Aprovar orçamento', async () => {
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona cliente
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona usuario
        mockedInputHandler.mockResolvedValueOnce('2'); //visualizar andamento
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona ordem de servico
        mockedInputHandler.mockResolvedValueOnce('4'); //volta
        mockedInputHandler.mockResolvedValueOnce('3'); //volta
        mockedInputHandler.mockResolvedValueOnce('3'); //sair

        await interacaoUsuario();


        expect(mockedInputHandler).toHaveBeenCalledTimes(7);
    });

    it('Usuario é um funcionario e deseja criar um orçamento', async () => {
        mockedInputHandler.mockResolvedValueOnce('2'); //seleciona funcionario
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona usuario
        mockedInputHandler.mockResolvedValueOnce('1'); //criar orcamento
        mockedInputHandler.mockResolvedValueOnce('1'); //seleciona ordem de serviço
        mockedInputHandler.mockResolvedValueOnce("22"); //horas previstas
        mockedInputHandler.mockResolvedValueOnce("150"); //preço
        mockedInputHandler.mockResolvedValueOnce('3'); //voltar
        mockedInputHandler.mockResolvedValueOnce('3');
        mockedInputHandler.mockResolvedValueOnce('3');
        await interacaoUsuario();
        expect(mockedInputHandler).toHaveBeenCalledTimes(9);
    });
});
