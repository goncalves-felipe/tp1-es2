import {describe, expect, test} from '@jest/globals';
import { OrdemServico } from '../../src/model/OrdemServico/OrdemServico';
import { Cliente } from '../../src/model/Cliente/Cliente';

describe('OrdemServiço Model', () => {
    let clienteJoao = new Cliente(1, "João", "joao@gmail.com", "9999999999", "Rua 1");

    test('Pagar valor total da ordem de serviço', () => {
        let o = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
        o.valorFinal = 100;
        o.pagar(100);
        expect(o.valorPago).toBe(100);
    });

    test('Multiplos pagamentos para ordem de serviço', () => {
        let o = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
        o.valorFinal = 100;
        o.pagar(40);
        o.pagar(60);
        expect(o.valorPago).toBe(100);
    });

    test('Pagar valor superior ao valor total da ordem de serviço', () => {
        let o = new OrdemServico(1, "Geladeira", "Geladeira quebrada", clienteJoao);
        o.valorFinal = 100;
        o.pagar(100);
        try {
            o.pagar(20);
        } catch (e : any) {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toBe("Erro: valor pago maior que valor total");
        }
    });

});