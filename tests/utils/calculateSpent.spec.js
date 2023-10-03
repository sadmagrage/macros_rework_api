const calculateSpent = require("../../utils/calculateSpent");
const User = require("../../models/UserModel");

test("Deve retornar o basal calculado por Tinsley", async () => {
    const userWithBf = { peso: 85, bodyfat: 13, fator_atividade: 1.3 };
    const userWithoutBf = { peso: 85, fator_atividade: 1.3 };
    const testingUser = await User.findOne({ where: { username: 'teste_tinsley_mlg'} });
    
    expect(calculateSpent(userWithoutBf).gasto).toBe(((24.8 * userWithoutBf.peso + 10) * userWithBf.fator_atividade).toFixed(2));
    expect(calculateSpent(userWithBf).gasto).toBe(((25.9 * userWithBf.peso * (1 - userWithBf.bodyfat/100) + 284) * userWithBf.fator_atividade).toFixed(2));
    expect(calculateSpent(testingUser)).toStrictEqual({
        "gasto": (2119.703).toFixed(2),
        "metaProth":  (137.025).toFixed(2),
        "metaProtl": (15.23).toFixed(2),
        "metaCarb": (240.65).toFixed(2),
        "metaFat": (60.9).toFixed(2)
    });
});