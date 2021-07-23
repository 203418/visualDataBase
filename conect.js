const mysql = require('mysql2');
require('dotenv').config();

    process.env.host = localStorage.getItem('host');
    process.env.user = localStorage.getItem('user');
    process.env.password = localStorage.getItem('password');
    process.env.database = localStorage.getItem('database');
    process.env.port = localStorage.getItem('port');

const host = process.env.host //document.getElementById('host').value;
const user = process.env.user //document.getElementById('user').value;
const password = process.env.password //document.getElementById('password').value;
const database = process.env.database //document.getElementById('database').value;
const port = process.env.port //document.getElementById('port').value;
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
        document.getElementById('txtData').value = err.code+'\n'+err.fatal+'\nerror';
        // console.log(err.code);
        // console.log(err.fatal);
        // console.log('error');
    }else{
        if(name == 'registroMysql'){
            document.getElementById('txtData').value = `host: ${host} user: ${user} password: ${password} database: ${database} port: ${port}\nConexión exitosa`;
            setTimeout( function(){
                location.href='./vista3.html';
            }, 3000);
        }
    }
});

module.exports = connection