if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  require('dotenv').config();
var con;
function validarLogin(){
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    process.env.host=localStorage.getItem('host');
    if(user=='admin' && password=='123'){
        if (process.env.host != 'null'){
            location.href='./vista3.html';
        } else{
            location.href='./vista2.html';
        }
    }
    else{
        alert('Datos erroneos');
    }
}
function sendParams(){
    localStorage.setItem('host',document.getElementById('host').value);
    localStorage.setItem('user',document.getElementById('user').value);
    localStorage.setItem('password',document.getElementById('password').value);
    localStorage.setItem('database',document.getElementById('database').value);
    localStorage.setItem('port',document.getElementById('port').value);
    con = require('./conect');
}
function addData(){
    // con = localStorage.getItem('con');
    con = require('./conect');
    // Crear query para INSERT, SELECT, UPDATE O DELETE
    const nombre =  document.getElementById('nombre').value;
    const ap_pat = document.getElementById('ap_pat').value;
    const ap_mat = document.getElementById('ap_mat').value;
    const edad = document.getElementById('edad').value;

    $query = `INSERT INTO persona (nombre,ap_pat,ap_mat,edad) VALUES ("${nombre}","${ap_pat}","${ap_mat}","${edad}")`;

    con.query($query, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        console.log("Query exitoso", rows.length);
    });
    selectData();
    // con.end();
    // Input data conection database
}
function selectData(){
    $query = `select * from persona`;
    con.query($query, function (err, rows, fields) {
        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        let html='';
        // html="<tr><td>"+rows[rows.length-1].id+"</td> <td>"+rows[rows.length-1].nombre+"</td> <td>"+rows[rows.length-1].ap_pat+"</td> <td>"+rows[rows.length-1].ap_mat+"</td> <td>"+rows[rows.length-1].edad+"</td></tr>"; 
        rows.forEach(function(element){
            html+="<tr><td>"+element.id+"</td> <td>"+element.nombre+"</td> <td>"+element.ap_pat+"</td> <td>"+element.ap_mat+"</td> <td>"+element.edad+"</td></tr>"; 
        });
        document.getElementById('table').innerHTML=html;
    });
}
function borrarCon(){
    localStorage.removeItem('host');
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('database');
    localStorage.removeItem('port');
    location.href='./vista2.html';
}