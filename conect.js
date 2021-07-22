const mysql = require('mysql2');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
require('dotenv').config();
if (process.env.host == 'null'){
    localStorage.setItem('host',document.getElementById('host').value);
    localStorage.setItem('user',document.getElementById('user').value);
    localStorage.setItem('password',document.getElementById('password').value);
    localStorage.setItem('database',document.getElementById('database').value);
    localStorage.setItem('port',document.getElementById('port').value);
}
const host = process.env.host //document.getElementById('host').value;
const user = process.env.user //document.getElementById('user').value;
const password = process.env.password //document.getElementById('password').value;
const database = process.env.database //document.getElementById('database').value;
const port = process.env.port //document.getElementById('port').value;
console.log(host);
const connection = mysql.createConnection({
    host:host,
    user:user,
    password:password,
    database:database,
    port:port
});
connection.connect(function(err){
    if(err){
        document.getElementById('txtData').value = err.code+'\n'+err.fatal+'\nerror';
        // console.log(err.code);
        // console.log(err.fatal);
        // console.log('error');
    }else{
        if(window.location.pathname==='database/vista2.html'){
            setTimeout( function(){location.href='./vista3.html'}, 3000);
        }
        //document.getElementById('txtData').value = `host: ${host} user: ${user} password: ${password} database: ${database} port: ${port}\nConexión exitosa`;
    }
});

module.exports = connection