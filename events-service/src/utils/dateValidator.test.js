const {isFutureDate} = require('./dateValidator')

describe('Validação de data do evento', () => {
    test('Deve aceitar data futura', () => {
        const anoQueVem = new Date().getFullYear() + 1;
        expect(isFutureDate(`${anoQueVem}-01-01`)).toBe(true);
    });

    test('Deve rejeitar data passada',() => {
        expect(isFutureDate('2025-01-01')).toBe(false);
    });
});