
const mysql = require('mysql2');

//  variáveis de ambiente para facilitar a troca entre Local e AWS RDS
const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'casi_dev',
    password: process.env.DB_PASSWORD || 'casi123', 
    database: process.env.DB_NAME || 'casi_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection.promise(); // promise para poder usar async/await