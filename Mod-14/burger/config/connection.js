let mysql = require('mysql');
let connection;
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '2020',
        database: 'burgers_db'
    });    
}


connection.connect(function(err){
    if (err) {
        console.err('error connecting ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;