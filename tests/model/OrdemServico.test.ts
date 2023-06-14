import {describe, expect, test} from '@jest/globals';
import { OrdemServico } from '../../src/model/OrdemServico/OrdemServico';
import { StatusOrdemServico } from '../../src/constantes/StatusOrdemServico';
import { Cliente } from '../../src/model/Cliente/Cliente';
import { ordensServico } from 'dados';

describe('OrdemServiço Model', () => {
   
    let clienteJoao = new Cliente(1, "João", "joao@gmail.com", "9999999999", "Rua 1");
    let ordemServico : OrdemServico;
    
    beforeEach(() => {
        ordemServico = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
    })

    describe('Criar Ordem de Serviço', () => {
        test('Ordem de serviço é criada com status de "criado"', () => {
            expect(ordemServico.status).toBe(StatusOrdemServico.CRIADO);
        });
        
    });

    describe('Pagamento ordem de serviço', () => {
        test('Pagar valor total da ordem de serviço', () => {
            ordemServico.valorFinal = 100;
            ordemServico.pagar(100);
            expect(ordemServico.valorPago).toBe(100);
        });

        test('Multiplos pagamentos para ordem de serviço', () => {
            ordemServico.valorFinal = 100;
            ordemServico.pagar(40);
            ordemServico.pagar(60);
            expect(ordemServico.valorPago).toBe(100);
        });

        test('Pagar valor superior ao valor total da ordem de serviço', () => {
            ordemServico.valorFinal = 100;
            ordemServico.pagar(100);
            expect(() => {
                ordemServico.pagar(20);
            }).toThrowError("Erro: valor pago maior que valor total");
        });

        test('Pagamento de valor negativo', () => {
            expect(() => {
                ordemServico.pagar(-20);
            }).toThrowError("Erro: valor pago não pode ser negativo");
        });
    });

    describe('Finalizar ordem de serviço', () => {
        test("Finalizar ordem de serviço com sucesso", () => {
            ordemServico.finalizarComSucesso();
            expect(ordemServico.status).toBe(StatusOrdemServico.FINALIZADO_SUCESSO);
        });
    
        test("Finalizar ordem de serviço com falha", () => {
            ordemServico.finalizarComFalha();
            expect(ordemServico.status).toBe(StatusOrdemServico.FINALIZADO_FALHA);
        });
    
        test("Finalizar com sucesso de ordem de serviço já finalizada", () => {
            ordemServico.finalizarComSucesso();
            expect(() => {
                ordemServico.finalizarComSucesso();
            }).toThrowError("Erro: Ordem de Serviço já finalizada");
        });
    
        test("Finalizar com falha de ordem de serviço já finalizada", () => {
            ordemServico.finalizarComFalha();
            expect(() => {
                ordemServico.finalizarComFalha();
            }).toThrowError("Erro: Ordem de Serviço já finalizada");
        });
    });

    describe('Recusar ordem de serviço', () => {
        test("Recusar ordem de serviço", () => {
            let o = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
            o.recusarOrdemServico();
            expect(o.status).toBe(StatusOrdemServico.RECUSADO);
        });
    
        test("Recusar ordem de serviço já finalizada", () => {
            let o = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
            o.finalizarComSucesso();
            expect(() => {
                o.recusarOrdemServico();
            }).toThrowError("Erro: Ordem de Serviço já finalizada");
        });
    });

});