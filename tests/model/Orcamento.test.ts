import {describe, expect, test} from '@jest/globals';
import { Orcamento } from '../../src/model/Orcamento/Orcamento';
import { StatusOrcamentos } from '../../src/constantes/StatusOrcamentos';
import { StatusOrdemServico } from '../../src/constantes/StatusOrdemServico';

describe('Orcamento Model', () => {
    test('Orçamento é criado com status de aguardando o cliente', () => {
        let o = new Orcamento();
        expect(o.status).toBe(StatusOrcamentos.AGUARDANDO_CLIENTE);
    });

    test('Aprovação da ordem de serviço', () => {
        let o = new Orcamento();
        o.aprovarOrdemServico();
        expect(o.status).toBe(StatusOrcamentos.APROVADO);
        expect(o.ordemServico.valorFinal).toBe(o.valorOrcamento);
        expect(o.ordemServico.status).toBe(StatusOrdemServico.APROVADO);
    });

});