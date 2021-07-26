const mysql = require('mysql2');
require('dotenv').config();

if (document.title == 'registro Mysql'){
    localStorage.setItem('host',document.getElementById('host').value);
    localStorage.setItem('user',document.getElementById('user').value);
    localStorage.setItem('password',document.getElementById('password').value);
    localStorage.setItem('database',document.getElementById('database').value);
    localStorage.setItem('port',document.getElementById('port').value)
}

process.env.host = localStorage.getItem('host');
process.env.user = localStorage.getItem('user');
process.env.password = localStorage.getItem('password');
process.env.database = localStorage.getItem('database');
process.env.port = localStorage.getItem('port');

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;
const port = process.env.port;
const connection = mysql.createConnection({
    host:host,
    user:user,
    password:password,
    database:database,
    port:port
});
connection.connect(function(err){
    var name = document.title;
    if(err){
        document.getElementById('txtData').value = err.code+'\n'+err.fatal+'\nerror\nReiniciando intento';
        localStorage.removeItem('host');
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        localStorage.removeItem('database');
        localStorage.removeItem('port');
        setTimeout( function(){
            location.href='./vista2.html'
        }, 3000);
    }else{
        if(name == 'registro Mysql'){
            document.getElementById('txtData').value = `host: ${host} user: ${user} password: ${password} database: ${database} port: ${port}\nConexión exitosa`;
            setTimeout( function(){
                location.href='./vista3.html';
            }, 3000);
        }
    }
});

module.exports = connection