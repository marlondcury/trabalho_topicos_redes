const {isValidTitle} = require('./titleValidator')

describe('Validação do tamanho do título', () => {

    test('Deve aceitar títulos válidos',() =>{
        expect(isValidTitle('churrasco dos calouros')).toBe(true);
    });

    test('Deve rejeitar títulos pequenos', () => {
        expect(isValidTitle("oi")).toBe(false);
    });

    test('Deve rejeitar título vazio', () => {
        expect(isValidTitle(" ")).toBe(false);
    });

});