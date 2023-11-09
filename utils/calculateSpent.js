const calculateSpent = (user) => {

    const usingTinsley = (user) => {
        if (user.bodyfat == undefined) return tinsleyWeight(user);
        return tinsleyMLG(user);
    }

    const tinsleyWeight = user => {
        const gKgProtein = user.estado == 'cutting' ? 3 : 2;

        let gasto = (24.8 * user.peso + 10) * user.fator_atividade + user.adicional;

        if (user.estado == 'cutting') {
            gasto -= user.deficit;
        }
        else if (user.estado == 'bulking') {
            gasto *= (1 + user.superavit / 100);
        }

        const metaProth = user.peso * gKgProtein * 0.9;
        const metaProtl = user.peso * gKgProtein * 0.1;
        const metaFat = user.peso;
        const metaCarb = parseFloat(((gasto - (metaProth + metaProtl) * 4 - metaFat * 9)/4));

        return {
            "gasto": gasto.toFixed(2),
            "metaProth": metaProth.toFixed(2),
            "metaProtl": metaProtl.toFixed(2),
            "metaFat": metaFat.toFixed(2),
            "metaCarb": metaCarb.toFixed(2)
        };
    }

    const tinsleyMLG = user => {
        const gKgProtein = user.estado == 'cutting' ? 3 : 2;
        const pesoMagro = user.peso * (100 - user.bodyfat)/100;

        let gasto = (25.9 * pesoMagro + 284) * user.fator_atividade + user.adicional;

        if (user.estado == 'cutting') {
            gasto -= user.deficit;
        }
        else if (user.estado == 'bulking') {
            gasto *= (1 + user.superavit / 100);
        }

        const metaProth = pesoMagro * gKgProtein * 0.9;
        const metaProtl = pesoMagro * gKgProtein * 0.1;
        const metaFat = pesoMagro;
        const metaCarb = parseFloat(((gasto - (metaProth + metaProtl) * 4 - metaFat * 9)/4));

        return {
            "gasto": gasto.toFixed(2),
            "metaProth": metaProth.toFixed(2),
            "metaProtl": metaProtl.toFixed(2),
            "metaFat": metaFat.toFixed(2),
            "metaCarb": metaCarb.toFixed(2)
        };
    }
    return usingTinsley(user);
}

module.exports = calculateSpent;