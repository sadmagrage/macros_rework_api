const calculateSpent = (user) => {
    const pesoMagro = user.peso * (100 - user.bodyfat) / 100;
    const harrisBenedictMale = 66.5 + (13.75 * pesoMagro) + (5.003 * user.altura) - (6.755 * user.idade);
    const basal = harrisBenedictMale * 1.3;
    const indice = pesoMagro * 90 * 0.1;

    const treino = {
        "domingo": user.treino.domingo,
        "segunda": user.treino.segunda,
        "terca": user.treino.terca,
        "quarta": user.treino.quarta,
        "quinta": user.treino.quinta,
        "sexta": user.treino.sexta,
        "sabado": user.treino.sabado
    };

    let gasto = 0;

    Object.keys(treino).map((diaDaSemana, index) => {
        if (index === new Date().getDay()) {
            const supino = treino[diaDaSemana].filter(item => item.treino === "supino").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "supino")[0].serie : 0;
            const terra = treino[diaDaSemana].filter(item => item.treino === "terra").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "terra")[0].serie : 0;
            const agacho = treino[diaDaSemana].filter(item => item.treino === "agacho").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "agacho")[0].serie : 0;
            const stiff = treino[diaDaSemana].filter(item => item.treino === "stiff").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "stiff")[0].serie : 0;
            const restante = treino[diaDaSemana].filter(item => item.treino === "restante").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "restante")[0].serie : 0;
            const velocidade = treino[diaDaSemana].filter(item => item.treino === "velocidade").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "velocidade")[0].serie : 0;
            const minuto = treino[diaDaSemana].filter(item => item.treino === "minuto").length > 0 ? treino[diaDaSemana].filter(item => item.treino === "minuto")[0].serie : 0;

            const treinoGasto = (1.25 * supino * indice / 34) + (1.5 * terra * indice / 34) + (2 * agacho * indice / 34) + (1.5 * indice * stiff / 34) + (indice * restante / 34);
            const cardio = 0.0175 * pesoMagro * velocidade * minuto;

            if (user.estado === "bulking") {
                gasto = (basal + treinoGasto + cardio + user.adicional ) * (100 + user.superavit)/100
            }
            else if (user.estado === "cutting") {
                gasto = basal + treinoGasto + cardio + user.adicional - user.deficit
            }
            else if (user.estado === "manutencao") {
                gasto = basal + treinoGasto + cardio + user.adicional;
            }
        }
    });

    gasto = parseFloat(gasto.toFixed(2));
    const metaProth = parseFloat((pesoMagro * 2 * 0.9).toFixed(2));
    const metaProtl = parseFloat((pesoMagro * 2 * 0.1).toFixed(2));
    const metaFat = parseFloat((pesoMagro).toFixed(2));
    const metaCarb = parseFloat(((gasto - (metaProth + metaProtl) * 4 - metaFat * 9)/4).toFixed(2))

    return {
        "gasto": gasto,
        "metaProth": metaProth,
        "metaProtl": metaProtl,
        "metaFat": metaFat,
        "metaCarb": metaCarb
    };
}

module.exports = calculateSpent;
