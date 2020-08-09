const config = {
    mysql : {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    },
    secretKey: process.env.JWT_SECRET,
    refreshKey: process.env.JWT_SECRET_REFRESH,
    email: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
}

module.exports = config