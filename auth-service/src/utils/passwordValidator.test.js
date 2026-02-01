const {isPassword} = require('./passwordValidator')

describe('Validação de senha', () => {

    test('Deve retornar true para senha com 3 caracteres ou mais', () => {
        expect(isPassword("123")).toBe(true);
    });

    test('Deve reprovar com senha menor que 3', () => {
        expect(isPassword("12")).toBe(false);
    });

    test('Deve reprovar com senha vazia', () => {
        expect(isPassword(" ")).toBe(false);
    });
});