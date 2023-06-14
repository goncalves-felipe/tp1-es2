import {describe, expect, test} from '@jest/globals';
import { Orcamento } from '../../src/model/Orcamento/Orcamento';
import { OrdemServico } from '../../src/model/OrdemServico/OrdemServico';
import { StatusOrcamentos } from '../../src/constantes/StatusOrcamentos';
import { StatusOrdemServico } from '../../src/constantes/StatusOrdemServico';

describe('Orcamento Model', () => {
    let orcamento: Orcamento;


    beforeEach(() => {
        orcamento = new Orcamento(1, 10, 10);
    });

    describe('Criar Orçamento', () => {
        test('Orçamento é criado com status de aguardando o cliente', () => {
            expect(orcamento.status).toBe(StatusOrcamentos.AGUARDANDO_CLIENTE);
        });

        test('Geração de ordem de serviço para novo orçamento', () => {
            expect(orcamento.ordemServico).not.toBeUndefined();
            expect(orcamento.ordemServico).toBeInstanceOf(OrdemServico);
        });
    });

    describe('Aprovar Orçamento', () => {

        test('Aprovação do orçamento', () => {
            let orcamento = new Orcamento();
            orcamento.aprovarOrcamento();
            expect(orcamento.status).toBe(StatusOrcamentos.APROVADO);
            expect(orcamento.ordemServico.valorFinal).toBe(orcamento.valorOrcamento);
            expect(orcamento.ordemServico.status).toBe(StatusOrdemServico.APROVADO);
        });

        test('Aprovar orçamento que não está aguardando o cliente', () => {
            let orcamento = new Orcamento();
            orcamento.aprovarOrcamento();
            expect(() => {
                orcamento.aprovarOrcamento();
            }).toThrowError("O orçamento não está aguardando o cliente");
        });
    });
});