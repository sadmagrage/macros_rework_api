const returnUsername = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded.username);
            }
        });
    });
};

module.exports = { returnUsername }