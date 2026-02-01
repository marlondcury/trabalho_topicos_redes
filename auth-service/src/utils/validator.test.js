const { isValidEmail } = require('./validator');

describe('Testes Unitários de Validação', () => {
    
    test('Deve retornar TRUE para um email válido da UFES', () => {
        const email = "presidente@casi.ufes.br";
        expect(isValidEmail(email)).toBe(true);
    });

    test('Deve retornar FALSE para um email sem arroba', () => {
        const email = "marlon_sem_arroba.com";
        expect(isValidEmail(email)).toBe(false);
    });

    test('Deve retornar FALSE para um email vazio', () => {
        expect(isValidEmail("")).toBe(false);
    });

});