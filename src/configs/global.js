const config = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'team_project'
    },
    secretKey: process.env.JWT_SECRET,
    refreshKey: process.env.JWT_SECRET_REFRESH
}

module.exports = config